import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Truck } from "lucide-react";

const configMenu = [
  {
    label: "Abastecimiento",
    path: "/dashboard/configuracion/abastecimiento",
    subItems: [
      {
        label: "Clasificacion de platos",
        path: "/dashboard/configuracion/abastecimiento/clasificacion de platos",
      },
      {
        label: "Unidades de medidas",
        path: "/dashboard/configuracion/abastecimiento/unidades de medidas",
      },
      {
        label: "Clasificacion de unidades de medidas",
        path: "/dashboard/configuracion/abastecimiento/clasificacion de unidades de medidas",
      },
      {
        label: "Tipos de productos",
        path: "/dashboard/configuracion/abastecimiento/tipos de productos",
      },
      {
        label: "Categorias de tipos de productos",
        path: "/dashboard/configuracion/abastecimiento/categorias de tipos de productos",
      },
      {
        label: "Productos en almacen",
        path: "/dashboard/configuracion/abastecimiento/productos en almacen",
      },
      {
        label: "Planificacion de menu",
        path: "/dashboard/configuracion/abastecimiento/planificacion de menu",
      },
    ],
  },
  { label: "Cajero", path: "/dashboard/configuracion/cajero",
    subItems: [
        {
          label: "Tipos de tarjetas",
          path: "/dashboard/configuracion/cajero/tipos de tarjetas"
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
  { label: "Facturación", path: "/dashboard/configuracion/facturacion", 
    subItems: [
      {
        label: "Reglas a excluir",
        path: "/dashboard/configuracion/facturacion/reglas-a-excluir"
      },
    ],
  },
  { label: "Distribución", path: "/dashboard/configuracion/distribucion",
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
  { label: "Reservación", path: "/dashboard/configuracion/reservacion",
    subItems: [
      {
        label: "Configuraciones",
        path: "/dashboard/configuracion/facturacion/configuraciones"
      },
      {
        label: "Asignar responsable de reservacion",
        path: "/dashboard/configuracion/facturacion/asignar-responsable-de-reservacion"
      },
    ],
  },
  { label: "Configuración", path: "/dashboard/configuracion", 
    subItems: [
      {
        label: "Configuración de comensales",
        path: "/dashboard/configuracion/facturacion/configuracion-de-comensales"
      },
      {
        label: "Comensales",
        path: "/dashboard/configuracion/facturacion/comensales"
      },
      {
        label: "Configuración de personas por evento",
        path: "/dashboard/configuracion/facturacion/configuracion-de-personas-por-evento"
      },
      {
        label: "Configuración del proceso",
        path: "/dashboard/configuracion/facturacion/configuracion-del-proceso"
      },
      {
        label: "Configuración de cobro",
        path: "/dashboard/configuracion/facturacion/configuracion-de-cobro"
      },
      {
        label: "Tareas programadas",
        path: "/dashboard/configuracion/facturacion/tareas-programadas"
      },
      {
        label: "Configuración de elastic",
        path: "/dashboard/configuracion/facturacion/configuracion-de-elastic"
      },
      {
        label: "Configuración de rabbitmq",
        path: "/dashboard/configuracion/facturacion/configuracion-de-rabbitmq"
      },
      {
        label: "Avisos",
        path: "/dashboard/configuracion/facturacion/avisos"
      },
    ],
  },
  { label: "Seguridad", path: "/dashboard/configuracion/seguridad", 
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
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (path: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <aside className="w-64 bg-white border-r h-full">
      <ul>
        {configMenu.map((item) => (
          <li key={item.path}>
            {item.subItems ? (
              <button
                type="button"
                onClick={() => handleToggle(item.path)}
                className={`flex items-center w-full px-4 py-2 text-left ${
                  location.pathname.startsWith(item.path)
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="flex-1">{item.label}</span>
                {openMenus[item.path] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <Link
                to={item.path}
                className={`block px-4 py-2 ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                } flex items-center gap-2`}
              >
                {item.label}
              </Link>
            )}
            {item.subItems && openMenus[item.path] && (
              <ul className="ml-4">
                {item.subItems.map((sub) => (
                  <li key={sub.path}>
                    <Link
                      to={sub.path}
                      className={`block px-4 py-2 text-sm ${
                        location.pathname === sub.path
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
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