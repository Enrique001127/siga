import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import ConfigSidebar from '../../components/layout/ConfigSidebar';
import { Search, Plus, ChevronRight, ChevronLeft, Trash2, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import * as Dialog from '@radix-ui/react-dialog';

interface SystemOption {
  id: string;
  label: string;
}

interface SystemForm {
  name: string;
  code: string;
  acronym: string;
  path: string;
  icon: string;
}

const SystemsPage: React.FC = () => {
  const [searchLeft, setSearchLeft] = useState('');
  const [searchRight, setSearchRight] = useState('');
  const [availableOptions, setAvailableOptions] = useState<SystemOption[]>([
    { id: '1', label: 'Abastecimiento' },
    { id: '2', label: 'Reservación' },
    { id: '3', label: 'Distribución' },
    { id: '4', label: 'Cajero' },
    { id: '5', label: 'Facturación' },
    { id: '6', label: 'Reportes' },
  ]);
  const [selectedOptions, setSelectedOptions] = useState<SystemOption[]>([]);
  const [selectedAvailable, setSelectedAvailable] = useState<string[]>([]);
  const [selectedChosen, setSelectedChosen] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<SystemForm>({
    name: '',
    code: '',
    acronym: '',
    path: '',
    icon: '',
  });

  const handleMoveRight = () => {
    const itemsToMove = availableOptions.filter(option => selectedAvailable.includes(option.id));
    setSelectedOptions([...selectedOptions, ...itemsToMove]);
    setAvailableOptions(availableOptions.filter(option => !selectedAvailable.includes(option.id)));
    setSelectedAvailable([]);
  };

  const handleMoveLeft = () => {
    const itemsToMove = selectedOptions.filter(option => selectedChosen.includes(option.id));
    setAvailableOptions([...availableOptions, ...itemsToMove]);
    setSelectedOptions(selectedOptions.filter(option => !selectedChosen.includes(option.id)));
    setSelectedChosen([]);
  };

  const handleDelete = () => {
    const updatedSelectedOptions = selectedOptions.filter(option => !selectedChosen.includes(option.id));
    setSelectedOptions(updatedSelectedOptions);
    setSelectedChosen([]);
  };

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Cambios guardados:', {
      selectedOptions,
      availableOptions
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSystem = (e: React.FormEvent) => {
    e.preventDefault();
    const newSystem: SystemOption = {
      id: String(Date.now()),
      label: formData.name
    };
    setAvailableOptions(prev => [...prev, newSystem]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      code: '',
      acronym: '',
      path: '',
      icon: ''
    });
  };

  const filteredAvailableOptions = availableOptions.filter(option =>
    option.label.toLowerCase().includes(searchLeft.toLowerCase())
  );

  const filteredSelectedOptions = selectedOptions.filter(option =>
    option.label.toLowerCase().includes(searchRight.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex h-full">
        <ConfigSidebar />
        <div className="flex-1 p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Configuración de Sistemas</h1>
            <div className="flex gap-2">
              <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Dialog.Trigger asChild>
                  <Button variant="primary" className="flex items-center gap-2">
                    <Plus size={20} />
                    Agregar Sistema
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-[400px]">
                    <div className="flex justify-between items-center mb-4">
                      <Dialog.Title className="text-xl font-bold">Agregar Nuevo Sistema</Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="text-gray-400 hover:text-gray-600">
                          <X size={24} />
                        </button>
                      </Dialog.Close>
                    </div>
                    <form onSubmit={handleAddSystem}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Código de sistema
                          </label>
                          <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Acrónimo
                          </label>
                          <input
                            type="text"
                            name="acronym"
                            value={formData.acronym}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ruta
                          </label>
                          <input
                            type="text"
                            name="path"
                            value={formData.path}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Icono
                          </label>
                          <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end gap-2">
                        <Dialog.Close asChild>
                          <Button variant="secondary">Cancelar</Button>
                        </Dialog.Close>
                        <Button type="submit" variant="primary">Guardar</Button>
                      </div>
                    </form>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <Button 
                variant="secondary" 
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
                onClick={handleDelete}
                disabled={selectedChosen.length === 0}
              >
                <Trash2 size={20} />
                Eliminar
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex gap-4">
              {/* Available Options */}
              <div className="flex-1">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar sistemas disponibles..."
                      className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchLeft}
                      onChange={(e) => setSearchLeft(e.target.value)}
                    />
                  </div>
                </div>
                <div className="border rounded-lg h-96 overflow-y-auto">
                  {filteredAvailableOptions.map(option => (
                    <div
                      key={option.id}
                      className={`p-3 cursor-pointer ${
                        selectedAvailable.includes(option.id)
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        if (selectedAvailable.includes(option.id)) {
                          setSelectedAvailable(selectedAvailable.filter(id => id !== option.id));
                        } else {
                          setSelectedAvailable([...selectedAvailable, option.id]);
                        }
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-col items-center justify-center gap-4">
                <Button
                  onClick={handleMoveRight}
                  disabled={selectedAvailable.length === 0}
                  variant="secondary"
                  className="p-2"
                >
                  <ChevronRight size={24} />
                </Button>
                <Button
                  onClick={handleMoveLeft}
                  disabled={selectedChosen.length === 0}
                  variant="secondary"
                  className="p-2"
                >
                  <ChevronLeft size={24} />
                </Button>
              </div>

              {/* Selected Options */}
              <div className="flex-1">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar sistemas seleccionados..."
                      className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchRight}
                      onChange={(e) => setSearchRight(e.target.value)}
                    />
                  </div>
                </div>
                <div className="border rounded-lg h-96 overflow-y-auto">
                  {filteredSelectedOptions.map(option => (
                    <div
                      key={option.id}
                      className={`p-3 cursor-pointer ${
                        selectedChosen.includes(option.id)
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        if (selectedChosen.includes(option.id)) {
                          setSelectedChosen(selectedChosen.filter(id => id !== option.id));
                        } else {
                          setSelectedChosen([...selectedChosen, option.id]);
                        }
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                variant="primary"
                onClick={handleSaveChanges}
                className="px-6"
              >
                Listo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SystemsPage;