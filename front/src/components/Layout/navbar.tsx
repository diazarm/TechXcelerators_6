import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { useAuth, useNotification, useResponsive } from "../../hooks";
import { COLOR_CLASSES } from "../../constants";
import type { HeaderProps } from "./types";


export const Navbar: React.FC<HeaderProps> = ({
  className = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  const responsive = useResponsive();

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
      <div className={`w-full max-w-[1512px] mx-auto px-4 sm:px-6 py-3 sm:py-4 lg:py-6`}>
        <div className="flex items-center h-full">
          {/* Logo */}
          <div className="flex items-center ml-4 sm:ml-8 lg:ml-[50px]">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="/img/LogoScala.png" 
                alt="Scala Learning" 
                className="h-12 sm:h-14 lg:h-16 w-auto"
              />
            </Link>
          </div>

          {/* Navegación - más cerca de los botones */}
          <nav className="flex-1 flex justify-end pr-4 sm:pr-8">
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <Link 
                to="/" 
                className={`${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium ${responsive.text.small}`}
              >
                Inicio
              </Link>
              <Link 
                to="/acerca" 
                className={`${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium ${responsive.text.small}`}
              >
                Acerca de
              </Link>
              
              {/* Dropdown de Recursos */}
              <div className="relative">
                <div
                  onClick={handleDropdownToggle}
                  className={`flex items-center gap-1 ${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium ${responsive.text.small} cursor-pointer`}
                >
                  Recursos
                  <svg 
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-40 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <div className={`px-3 sm:px-4 py-2 text-gray-500 ${responsive.text.xsmall} sm:text-sm`}>
                        Contenido del dropdown
                      </div>
                      <div className={`px-3 sm:px-4 py-2 text-gray-500 ${responsive.text.xsmall} sm:text-sm`}>
                        (Placeholder)
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </nav>

          {/* Botones - a la derecha */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated && (
              <Button 
                variant="secondary" 
                size="xs"
                onClick={handleLogout}
                className="text-xs sm:text-sm"
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