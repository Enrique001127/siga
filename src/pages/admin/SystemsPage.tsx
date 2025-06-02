import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import ConfigSidebar from '../../components/layout/ConfigSidebar';
import { Search, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

interface SystemOption {
  id: string;
  label: string;
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
            <Button variant="primary" className="flex items-center gap-2">
              <Plus size={20} />
              Agregar Sistema
            </Button>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SystemsPage;