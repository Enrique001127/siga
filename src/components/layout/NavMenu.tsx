import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, UserCog, Truck, CalendarCheck, Share2, UserSquare, Receipt, FileText, Package, Warehouse, ClipboardList, ShoppingCart, Users, Calendar, CreditCard, FileSpreadsheet, BarChart, FileText as FileText2, Cog, Boxes, FolderTree, List, Shield, UsersRound, User, HandPlatter } from 'lucide-react';

const adminSubmenu = [
  { id: 'sistemas', label: 'Sistemas', path: '/dashboard/admin/sistemas', icon: <Cog size={20} /> },
  { id: 'modulos', label: 'Módulos', path: '/dashboard/admin/modulos', icon: <Boxes size={20} /> },
  { id: 'agrupacion', label: 'Agrupación Funcional', path: '/dashboard/admin/agrupacion', icon: <FolderTree size={20} /> },
  { id: 'funcionalidades', label: 'Funcionalidades', path: '/dashboard/admin/funcionalidades', icon: <List size={20} /> },
  { id: 'roles', label: 'Roles', path: '/dashboard/admin/roles', icon: <Shield size={20} /> },
  { id: 'grupos-roles', label: 'Grupos de Roles', path: '/dashboard/admin/grupos-roles', icon: <UsersRound size={20} /> },
  { id: 'usuarios', label: 'Usuarios', path: '/dashboard/admin/usuarios', icon: <User size={20} /> },
];

const menuItems = [
  { 
    id: 'abastecimiento',
    label: 'Abastecimiento',
    path: '/dashboard/abastecimiento',
    icon: <Truck size={20} />,
    submenu: [
      { id: 'proveedores', label: 'Proveedores', path: '/dashboard/abastecimiento/proveedores', icon: <HandPlatter size={20} /> },
      { id: 'compras', label: 'Compras', path: '/dashboard/abastecimiento/compras', icon: <ShoppingCart size={20} /> },
      { id: 'inventario', label: 'Inventario', path: '/dashboard/abastecimiento/inventario', icon: <Package size={20} /> }
    ]
  },
  { 
    id: 'reservacion',
    label: 'Reservación',
    path: '/dashboard/reservacion',
    icon: <CalendarCheck size={20} />,
    submenu: [
      { id: 'nueva-reserva', label: 'Nueva Reserva', path: '/dashboard/reservacion/nueva', icon: <Calendar size={20} /> },
      { id: 'lista-reservas', label: 'Lista de Reservas', path: '/dashboard/reservacion/lista', icon: <ClipboardList size={20} /> }
    ]
  },
  { 
    id: 'distribucion',
    label: 'Distribución',
    path: '/dashboard/distribucion',
    icon: <Share2 size={20} />,
    submenu: [
      { id: 'almacenes', label: 'Almacenes', path: '/dashboard/distribucion/almacenes', icon: <Warehouse size={20} /> },
      { id: 'pedidos', label: 'Pedidos', path: '/dashboard/distribucion/pedidos', icon: <ClipboardList size={20} /> },
      { id: 'entregas', label: 'Entregas', path: '/dashboard/distribucion/entregas', icon: <Truck size={20} /> }
    ]
  },
  { 
    id: 'cajero',
    label: 'Cajero',
    path: '/dashboard/cajero',
    icon: <UserSquare size={20} />,
    submenu: [
      { id: 'ventas', label: 'Ventas', path: '/dashboard/cajero/ventas', icon: <CreditCard size={20} /> },
      { id: 'cierres', label: 'Cierres de Caja', path: '/dashboard/cajero/cierres', icon: <FileSpreadsheet size={20} /> }
    ]
  },
  { 
    id: 'facturacion',
    label: 'Facturación',
    path: '/dashboard/facturacion',
    icon: <Receipt size={20} />,
    submenu: [
      { id: 'facturas', label: 'Facturas', path: '/dashboard/facturacion/facturas', icon: <FileText size={20} /> },
      { id: 'pagos', label: 'Pagos', path: '/dashboard/facturacion/pagos', icon: <CreditCard size={20} /> },
      { id: 'historial', label: 'Historial', path: '/dashboard/facturacion/historial', icon: <FileText2 size={20} /> }
    ]
  },
  { 
    id: 'reportes',
    label: 'Reportes',
    path: '/dashboard/reportes',
    icon: <FileText size={20} />,
    submenu: [
      { id: 'ventas', label: 'Reporte de Ventas', path: '/dashboard/reportes/ventas', icon: <BarChart size={20} /> },
      { id: 'inventario', label: 'Reporte de Inventario', path: '/dashboard/reportes/inventario', icon: <FileSpreadsheet size={20} /> },
      { id: 'financiero', label: 'Reporte Financiero', path: '/dashboard/reportes/financiero', icon: <FileText2 size={20} /> }
    ]
  }
];

const NavMenu: React.FC = () => {
  const location = useLocation();
  const [showAdminMenu, setShowAdminMenu] = React.useState(false);
  
  return (
    <nav className="mt-4">
      <div className="flex items-center justify-between border-b border-t border-gray-300">
        <ul className="flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.id} className="group relative">
              <Link
                to={item.path}
                className={`flex items-center px-2 py-1 text-sm font-medium transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>

              {/* Submenu */}
              <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <ul className="py-2">
                  {item.submenu.map((subitem) => (
                    <li key={subitem.id}>
                      <Link
                        to={subitem.path}
                        className={`flex items-center px-4 py-2 text-sm ${
                          location.pathname === subitem.path
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {subitem.icon}
                        <span className="ml-2">{subitem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-4">
          {/* <div className="group relative">
            <Link to="/dashboard/settings" className="text-gray-600 hover:text-blue-600">
              <Settings size={20} />
              <span className="sr-only">Configuración</span>
            </Link>
            <span className="absolute right-0 top-full mt-1 w-24 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Configuración
            </span>
          </div> */}
          
          <div className="group relative">
            <button
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              className={`text-gray-600 flex items-center hover:text-blue-600 ${showAdminMenu ? 'text-blue-600' : ''}`}
            >
              <Settings size={20} />
              <span className="sr-only">Configuración</span>
            </button>
            <span className="absolute right-0 top-full mt-1 w-24 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Configuración
            </span>
            
            {/* Admin Submenu */}
            <div className={`absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg transition-all z-50 ${
              showAdminMenu ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
              <ul className="py-2">
                {adminSubmenu.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-2 text-sm ${
                        location.pathname === item.path
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;