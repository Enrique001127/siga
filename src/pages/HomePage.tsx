import React from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Utensils, Coffee, Users, ClipboardList, ChefHat, ShoppingCart } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Menús Activos', value: '12', icon: <Coffee className="h-6 w-6 text-orange-600" /> },
    { label: 'Usuarios', value: '1,234', icon: <Users className="h-6 w-6 text-blue-600" /> },
    { label: 'Pedidos Hoy', value: '156', icon: <ShoppingCart className="h-6 w-6 text-green-600" /> },
    { label: 'Recetas', value: '89', icon: <ChefHat className="h-6 w-6 text-purple-600" /> },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Bienvenido, {user?.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sistema de Gestión de Alimentación
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">{stat.icon}</div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.label}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Menú del Día</h3>
              <div className="mt-5 border-t border-gray-200 pt-5">
                <ul className="divide-y divide-gray-200">
                  <li className="py-4">
                    <div className="flex space-x-3">
                      <Utensils className="h-6 w-6 text-gray-400" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Almuerzo</h3>
                          <p className="text-sm text-gray-500">12:00 - 14:00</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Arroz, frijoles, pollo asado, ensalada de tomate
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="flex space-x-3">
                      <Utensils className="h-6 w-6 text-gray-400" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Cena</h3>
                          <p className="text-sm text-gray-500">18:00 - 20:00</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Espaguetis con salsa, pan, jugo natural
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Pedidos Pendientes</h3>
              <div className="mt-5 border-t border-gray-200 pt-5">
                <ul className="divide-y divide-gray-200">
                  <li className="py-4">
                    <div className="flex space-x-3">
                      <ClipboardList className="h-6 w-6 text-gray-400" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Pedido #2458</h3>
                          <p className="text-sm text-gray-500">10:30 AM</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          25 almuerzos - Facultad de Informática
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="flex space-x-3">
                      <ClipboardList className="h-6 w-6 text-gray-400" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Pedido #2459</h3>
                          <p className="text-sm text-gray-500">11:15 AM</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          15 cenas - Residencia Estudiantil
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;