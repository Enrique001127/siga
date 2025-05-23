import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  groupRole: string;
  functionality: string;
  active: boolean;
  lastLogin: string;
}

// Mock data - replace with actual API call
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Enrique Martín',
    email: 'emartinm@uci.cu',
    role: 'Administrador',
    groupRole: 'Gestión',
    functionality: 'Todas',
    active: true,
    lastLogin: '2024-03-15 10:30'
  },
  {
    id: '2',
    name: 'María González',
    email: 'mgonzalez@uci.cu',
    role: 'Cajero',
    groupRole: 'Operaciones',
    functionality: 'Ventas',
    active: true,
    lastLogin: '2024-03-14 15:45'
  },
  // Add more mock users as needed
];

const UsersPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    groupRole: '',
    role: '',
    functionality: '',
    active: 'all'
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGroupRole = !filters.groupRole || user.groupRole === filters.groupRole;
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesFunctionality = !filters.functionality || user.functionality === filters.functionality;
    const matchesActive = filters.active === 'all' || 
                         (filters.active === 'yes' && user.active) || 
                         (filters.active === 'no' && !user.active);

    return matchesSearch && matchesGroupRole && matchesRole && matchesFunctionality && matchesActive;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre o correo electrónico..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow">
          <button
            className="w-full px-4 py-3 flex items-center justify-between text-left text-gray-900 font-medium"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filtros de búsqueda</span>
            {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showFilters && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grupo de rol
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar grupo de rol"
                  value={filters.groupRole}
                  onChange={(e) => handleFilterChange('groupRole', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar rol"
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funcionalidad
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar funcionalidad"
                  value={filters.functionality}
                  onChange={(e) => handleFilterChange('functionality', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activo
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="active"
                      value="all"
                      checked={filters.active === 'all'}
                      onChange={(e) => handleFilterChange('active', e.target.value)}
                    />
                    <span className="ml-2">Todos</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="active"
                      value="yes"
                      checked={filters.active === 'yes'}
                      onChange={(e) => handleFilterChange('active', e.target.value)}
                    />
                    <span className="ml-2">Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="active"
                      value="no"
                      checked={filters.active === 'no'}
                      onChange={(e) => handleFilterChange('active', e.target.value)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grupo de Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funcionalidad
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.groupRole}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.functionality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;