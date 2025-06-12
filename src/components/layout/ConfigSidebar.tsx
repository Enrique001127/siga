import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const configMenu = [
  {
    label: "Abastecimiento",
    path: "/dashboard/configuracion/abastecimiento",
    subItems: [
      {
        label: "Clasificacion de platos",
        path: "/dashboard/configuracion/abastecimiento/clasificacion-de-platos",
      },
      {
        label: "Unidades de medidas",
        path: "/dashboard/configuracion/abastecimiento/unidades-de-medidas",
      },
      {
        label: "Clasificacion de unidades de medidas",
        path: "/dashboard/configuracion/abastecimiento/clasificacion-de-unidades-de-medidas",
      },
      {
        label: "Tipos de productos",
        path: "/dashboard/configuracion/abastecimiento/tipos-de-productos",
      },
      {
        label: "Categorias de tipos de productos",
        path: "/dashboard/configuracion/abastecimiento/categorias-de-tipos-de-productos",
      },
      {
        label: "Productos en almacen",
        path: "/dashboard/configuracion/abastecimiento/productos-en-almacen",
      },
      {
        label: "Planificacion de menu",
        path: "/dashboard/configuracion/abastecimiento/planificacion-de-menu",
      },
    ],
  },
  { 
    label: "Cajero", 
    path: "/dashboard/configuracion/cajero",
    subItems: [
      {
        label: "Tipos de tarjetas",
        path: "/dashboard/configuracion/cajero/tipos-de-tarjetas"
      },
      {
        label: "Tarjetas",
        path: "/dashboard/configuracion/cajero/tarjetas"
      },
      {
        label: "Asignar IP a puertas",
        path: "/dashboard/configuracion/cajero/asignar-ip-a-puertas"
      },
      {
        label: "Configuraciones",
        path: "/dashboard/configuracion/cajero/configuraciones"
      },
      {
        label: "Torpedos",
        path: "/dashboard/configuracion/cajero/torpedos"
      },
      {
        label: "Solapin perdido",
        path: "/dashboard/configuracion/cajero/solapin-perdido"
      },
    ],
  },
  { 
    label: "Facturación", 
    path: "/dashboard/configuracion/facturacion", 
    subItems: [
      {
        label: "Reglas a excluir",
        path: "/dashboard/configuracion/facturacion/reglas-a-excluir"
      },
    ],
  },
  { 
    label: "Distribución", 
    path: "/dashboard/configuracion/distribucion",
    subItems: [
      {
        label: "Categorías",
        path: "/dashboard/configuracion/distribucion/categorias"
      },
      {
        label: "Estructuras",
        path: "/dashboard/configuracion/distribucion/estructuras"
      },
      {
        label: "Eventos",
        path: "/dashboard/configuracion/distribucion/eventos"
      },
      {
        label: "Horarios",
        path: "/dashboard/configuracion/distribucion/horarios"
      },
      {
        label: "Rangos de eventos",
        path: "/dashboard/configuracion/distribucion/rangos-de-eventos"
      },
      {
        label: "Configuracion de reglas",
        path: "/dashboard/configuracion/distribucion/configuracion-de-reglas"
      },
    ],
  },
  { 
    label: "Reservación", 
    path: "/dashboard/configuracion/reservacion",
    subItems: [
      {
        label: "Configuraciones",
        path: "/dashboard/configuracion/reservacion/configuraciones"
      },
      {
        label: "Asignar responsable de reservacion",
        path: "/dashboard/configuracion/reservacion/asignar-responsable-de-reservacion"
      },
    ],
  },
  { 
    label: "Configuración", 
    path: "/dashboard/configuracion/configuracion-general", 
    subItems: [
      {
        label: "Configuración de comensales",
        path: "/dashboard/configuracion/configuracion-general/configuracion-de-comensales"
      },
      {
        label: "Comensales",
        path: "/dashboard/configuracion/configuracion-general/comensales"
      },
      {
        label: "Configuración de personas por evento",
        path: "/dashboard/configuracion/configuracion-general/configuracion-de-personas-por-evento"
      },
      {
        label: "Configuración del proceso",
        path: "/dashboard/configuracion/configuracion-general/configuracion-del-proceso"
      },
      {
        label: "Configuración de cobro",
        path: "/dashboard/configuracion/configuracion-general/configuracion-de-cobro"
      },
      {
        label: "Tareas programadas",
        path: "/dashboard/configuracion/configuracion-general/tareas-programadas"
      },
      {
        label: "Configuración de elastic",
        path: "/dashboard/configuracion/configuracion-general/configuracion-de-elastic"
      },
      {
        label: "Configuración de rabbitmq",
        path: "/dashboard/configuracion/configuracion-general/configuracion-de-rabbitmq"
      },
      {
        label: "Avisos",
        path: "/dashboard/configuracion/configuracion-general/avisos"
      },
    ],
  },
  { 
    label: "Seguridad", 
    path: "/dashboard/configuracion/seguridad", 
    subItems: [
      {
        label: "Sistemas",
        path: "/dashboard/configuracion/seguridad/sistemas"
      },
      {
        label: "Módulos",
        path: "/dashboard/configuracion/seguridad/modulos"
      },
      {
        label: "Agrupación funcional",
        path: "/dashboard/configuracion/seguridad/agrupacion-funcional"
      },
      {
        label: "Funcionalidades",
        path: "/dashboard/configuracion/seguridad/funcionalidades"
      },
      {
        label: "Roles",
        path: "/dashboard/configuracion/seguridad/roles"
      },
      {
        label: "Grupos de roles",
        path: "/dashboard/configuracion/seguridad/grupos-roles"
      },
      {
        label: "Usuarios",
        path: "/dashboard/configuracion/seguridad/usuarios"
      },
    ],
  },
];

const ConfigSidebar: React.FC = () => {
  const location = useLocation();
  const [activeMenus, setActiveMenus] = useState<string[]>([]);

  // Initialize active menus based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const menusToOpen: string[] = [];
    
    configMenu.forEach((item) => {
      // Check if current path matches this menu or any of its subitems
      const isCurrentMenuActive = currentPath === item.path || 
        (item.subItems && item.subItems.some(sub => currentPath === sub.path));
      
      if (isCurrentMenuActive) {
        menusToOpen.push(item.path);
      }
    });
    
    setActiveMenus(menusToOpen);
  }, [location.pathname]);

  const handleMenuClick = (path: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      // Toggle the submenu
      setActiveMenus(prev => {
        if (prev.includes(path)) {
          return prev.filter(p => p !== path);
        } else {
          return [...prev, path];
        }
      });
    }
    // If it doesn't have subitems, navigation will be handled by the Link component
  };

  const isMenuActive = (item: any) => {
    const currentPath = location.pathname;
    // Check if current path matches exactly or if we're on a subitem of this menu
    return currentPath === item.path || 
           (item.subItems && item.subItems.some((sub: any) => currentPath === sub.path));
  };

  const isSubItemActive = (subItem: any) => {
    return location.pathname === subItem.path;
  };

  return (
    <aside className="w-64 bg-white border-r h-full">
      <ul>
        {configMenu.map((item) => (
          <li key={item.path}>
            {item.subItems && item.subItems.length > 0 ? (
              // Menu item with subitems - use button for toggle functionality
              <button
                type="button"
                onClick={() => handleMenuClick(item.path, true)}
                className={`flex items-center w-full px-4 py-2 text-left transition-colors ${
                  isMenuActive(item)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="flex-1">{item.label}</span>
                {activeMenus.includes(item.path) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              // Menu item without subitems - use Link for navigation
              <Link
                to={item.path}
                className={`flex items-center w-full px-4 py-2 text-left transition-colors ${
                  isMenuActive(item)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="flex-1">{item.label}</span>
              </Link>
            )}
            
            {/* Render subitems if menu is active and has subitems */}
            {item.subItems && activeMenus.includes(item.path) && (
              <ul className="ml-4">
                {item.subItems.map((sub) => (
                  <li key={sub.path}>
                    <Link
                      to={sub.path}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isSubItemActive(sub)
                          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ConfigSidebar;