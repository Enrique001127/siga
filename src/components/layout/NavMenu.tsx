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

// Type definitions for menu structure
type SubSubMenuItem = {
  id: string;
  label: string;
  path: string;
  items?: SubSubMenuItem[];
};

type SubMenuItem = {
  id: string;
  label: string;
  path: string;
  icon: React.ReactElement;
  subItems?: SubSubMenuItem[];
};

type MenuItem = {
  id: string;
  label: string;
  path: string;
  icon: React.ReactElement;
  submenu?: SubMenuItem[];
};

const menuItems: MenuItem[] = [
  { 
    id: 'abastecimiento',
    label: 'Abastecimiento',
    path: '/dashboard/abastecimiento',
    icon: <Truck size={20} />,
    submenu: [
      { id: 'productos', label: 'Productos disponibles', path: '/dashboard/abastecimiento/productos', icon: <Package size={20} /> },
      { id: 'platos', label: 'Platos', path: '/dashboard/abastecimiento/platos', icon: <HandPlatter size={20} /> },
      { id: 'menu', label: 'Menú', path: '/dashboard/abastecimiento/menu', icon: <FileText size={20} /> }
    ]
  },
  { 
    id: 'reservacion',
    label: 'Reservación',
    path: '/dashboard/reservacion',
    icon: <CalendarCheck size={20} />,
    submenu: [
      { 
        id: 'reservar',
        label: 'Reservación',
        path: '/dashboard/reservacion/reservar',
        icon: <Calendar size={20} />,
        subItems: [
          { id: 'personal', label: 'Reservar', path: '/dashboard/reservacion/reservar/personal' },
          { id: 'familiar', label: 'Reservar a familiar', path: '/dashboard/reservacion/reservar/familiar' },
          { id: 'asociados', label: 'Reservar a asociados', path: '/dashboard/reservacion/reservar/asociados' },
          { id: 'terceros', label: 'Reservar a terceros', path: '/dashboard/reservacion/reservar/terceros' },
          { id: 'categoria', label: 'Reservar por categoría', path: '/dashboard/reservacion/reservar/categoria' }
        ]
      },
      { 
        id: 'datos-usuarios',
        label: 'Datos de usuarios',
        path: '/dashboard/reservacion/datos-usuarios',
        icon: <Users size={20} />,
        subItems: [
          { id: 'reservaciones', label: 'Reservaciones', path: '/dashboard/reservacion/datos-usuarios/reservaciones' },
          { id: 'distribuciones', label: 'Distribuciones', path: '/dashboard/reservacion/datos-usuarios/distribuciones' },
          { id: 'facturaciones', label: 'Facturaciones', path: '/dashboard/reservacion/datos-usuarios/facturaciones' },
          { id: 'accesos', label: 'Accesos', path: '/dashboard/reservacion/datos-usuarios/accesos' },
          { id: 'tarjetas', label: 'Tarjetas', path: '/dashboard/reservacion/datos-usuarios/tarjetas' }
        ]
      },
      { 
        id: 'reportes',
        label: 'Reportes',
        path: '/dashboard/reservacion/reportes',
        icon: <FileText2 size={20} />,
        subItems: [
          { id: 'platos', label: 'Lista de platos', path: '/dashboard/reservacion/reportes/platos' },
          { id: 'menus', label: 'Lista de menús', path: '/dashboard/reservacion/reportes/menus' }
        ]
      }
    ]
  },
  { 
    id: 'distribucion',
    label: 'Distribución',
    path: '/dashboard/distribucion',
    icon: <Share2 size={20} />,
    submenu: [
      { id: 'distribucion', label: 'Distribución', path: '/dashboard/distribucion/distribucion', icon: <Share2 size={20} /> },
      { id: 'actualizar', label: 'Actualizar distribución a personas', path: '/dashboard/distribucion/actualizar', icon: <Users size={20} /> },
      { id: 'no-distribuidas', label: 'Personas no distribuidas', path: '/dashboard/distribucion/no-distribuidas', icon: <UserSquare size={20} /> }
    ]
  },
  { 
    id: 'cajero',
    label: 'Cajero',
    path: '/dashboard/cajero',
    icon: <CreditCard size={20} />,
    submenu: [
      { id: 'cajero', label: 'Cajero', path: '/dashboard/cajero/cajero', icon: <CreditCard size={20} /> }
    ]
  },
  { 
    id: 'facturacion',
    label: 'Facturación',
    path: '/dashboard/facturacion',
    icon: <Receipt size={20} />,
    submenu: [
      { id: 'importes', label: 'Importes', path: '/dashboard/facturacion/importes', icon: <Receipt size={20} /> }
    ]
  },
  { 
    id: 'reportes',
    label: 'Reportes',
    path: '/dashboard/reportes',
    icon: <FileSpreadsheet size={20} />,
    submenu: [
      { 
        id: 'generales',
        label: 'Generales',
        path: '/dashboard/reportes/generales',
        icon: <FileText size={20} />,
        subItems: [
          { id: 'parte-general', label: 'Parte general', path: '/dashboard/reportes/generales/parte-general' }
        ]
      },
      { 
        id: 'especificos',
        label: 'Específicos',
        path: '/dashboard/reportes/especificos',
        icon: <FileText2 size={20} />,
        subItems: [
          { id: 'comensales', label: 'Lista de comensales', path: '/dashboard/reportes/especificos/comensales' },
          { id: 'reservaciones', label: 'Lista de reservaciones', path: '/dashboard/reportes/especificos/reservaciones' },
          { id: 'distribuciones', label: 'Lista de distribuciones', path: '/dashboard/reportes/especificos/distribuciones' },
          { id: 'accesos', label: 'Lista de accesos', path: '/dashboard/reportes/especificos/accesos' },
          { id: 'errores', label: 'Lista de personas con error de acceso', path: '/dashboard/reportes/especificos/errores' },
          { id: 'tarjetas', label: 'Lista de personas con tarjetas', path: '/dashboard/reportes/especificos/tarjetas' },
          { id: 'estructuras', label: 'Lista de estructuras y reglas', path: '/dashboard/reportes/especificos/estructuras' },
          { id: 'movimientos', label: 'Movimiento de asignaciones', path: '/dashboard/reportes/especificos/movimientos' },
          { id: 'exportar', label: 'Reservaciones de usuario exportar', path: '/dashboard/reportes/especificos/exportar' },
          { id: 'trazas', label: 'Trazas', path: '/dashboard/reportes/especificos/trazas' }
        ]
      }
    ]
  },
];

const NavMenu: React.FC = () => {
  const location = useLocation();
  const [showAdminMenu, setShowAdminMenu] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
  
  const handleSubmenuHover = (menuId: string) => {
    setActiveSubmenu(menuId);
  };

  return (
    <nav className="mt-4">
      <div className="flex items-center justify-between border-b border-t border-gray-300">
        <ul className="flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.id} 
                className="group relative"
                onMouseEnter={() => handleSubmenuHover(item.id)}
                onMouseLeave={() => handleSubmenuHover('')}>
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

              {/* Main Submenu */}
              {item.submenu && activeSubmenu === item.id && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.id} className="relative group/sub">
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
                          {subitem.subItems && (
                            <span className="ml-auto">›</span>
                          )}
                        </Link>

                        {/* Sub-submenu */}
                        {subitem.subItems && (
                          <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-md shadow-lg invisible group-hover/sub:visible">
                            <ul className="py-2">
                              {subitem.subItems.map((subSubItem) => (
                                <li key={subSubItem.id} className="relative group/subsub">
                                  <Link
                                    to={subSubItem.path}
                                    className={`flex items-center px-4 py-2 text-sm ${
                                      location.pathname === subSubItem.path
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                  >
                                    <span className="ml-2">{subSubItem.label}</span>
                                    {subSubItem.items && (
                                      <span className="ml-auto">›</span>
                                    )}
                                  </Link>

                                  {/* Deep submenu for specific items */}
                                  {subSubItem.items && (
                                    <div className="absolute left-full top-0 ml-1 w-72 bg-white rounded-md shadow-lg invisible group-hover/subsub:visible">
                                      <ul className="py-2">
                                        {subSubItem.items.map((deepItem) => (
                                          <li key={deepItem.id}>
                                            <Link
                                              to={deepItem.path}
                                              className={`flex items-center px-4 py-2 text-sm ${
                                                location.pathname === deepItem.path
                                                  ? 'text-blue-600 bg-blue-50'
                                                  : 'text-gray-700 hover:bg-gray-100'
                                              }`}
                                            >
                                              <span className="ml-2">{deepItem.label}</span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-4">
          <div className="group relative">
            <Link
              to="/dashboard/configuracion"
              className={`text-gray-600 flex items-center hover:text-blue-600 ${
                location.pathname.startsWith('/dashboard/configuracion') ? 'text-blue-600' : ''
              }`}
            >
              <Settings size={20} />
              <span className="sr-only">Configuración</span>
            </Link>
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