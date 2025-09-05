import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { useAuth, useNotification } from "../../hooks";
import type { HeaderProps } from "./types";


export const Navbar: React.FC<HeaderProps> = ({
  className = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const { addNotification } = useNotification();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    addNotification({
      type: 'success',
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente. ¡Hasta pronto!',
      duration: 3000
    });
  };

  return (
    <header className={`bg-white shadow-sm ${className}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="w-full max-w-[1512px] h-[117.85px] mx-auto px-6">
        <div className="flex items-center h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="/img/LogoScala.png" 
                alt="Scala Learning" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navegación - más cerca de los botones */}
          <nav className="flex-1 flex justify-end pr-8">
            <div className="flex items-center gap-6">
              <Link 
                to="/" 
                className="text-[#5D5A88] hover:text-[#4A476F] transition-colors font-medium text-base"
              >
                Inicio
              </Link>
              <Link 
                to="/acerca" 
                className="text-[#5D5A88] hover:text-[#4A476F] transition-colors font-medium text-base"
              >
                Acerca de
              </Link>
              
              {/* Dropdown de Recursos */}
              <div className="relative">
                <div
                  onClick={handleDropdownToggle}
                  className="flex items-center gap-1 text-[#5D5A88] hover:text-[#4A476F] transition-colors font-medium text-base cursor-pointer"
                >
                  Recursos
                  <svg 
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        Contenido del dropdown
                      </div>
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        (Placeholder)
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </nav>

          {/* Botones - a la derecha */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Button 
                variant="primary" 
                size="md"
                onClick={handleLogout}
              >
                Salir
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};