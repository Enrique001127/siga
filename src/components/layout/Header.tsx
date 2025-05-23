import React from 'react';
import { Settings, User, Utensils } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/public/Imagenes/logo.png"
              alt="SIGA Logo"
              width={220}
              height={44}
              className="h-11 w-auto"
              loading="eager"              
            />
          </Link>

          {/* User Info */}
          {user && (
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <p className="font-medium text-gray-800">{user.name}</p>
                <button 
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  Cerrar sesión
                </button>
              </div>
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <NavMenu />
      </div>
    </header>
  );
};

export default Header;