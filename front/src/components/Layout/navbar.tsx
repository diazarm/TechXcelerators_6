import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ResourceDropdown } from "../../components"; // 👈 limpio desde barrel file
import { useAuth, useNotification, useResponsive, useResources } from "../../hooks";
import { COLOR_CLASSES } from "../../constants";
import type { HeaderProps } from "./types";

export const Navbar: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  const responsive = useResponsive();
  const { resources, loading } = useResources();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    addNotification({
      type: "success",
      title: "Sesión cerrada",
      message: "Has cerrado sesión correctamente. ¡Hasta pronto!",
      duration: 3000,
    });
  };

  return (
    <header
      className={`bg-white shadow-sm ${className}`}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="w-full max-w-[1512px] mx-auto px-4 sm:px-6 py-3 sm:py-4 lg:py-6">
        <div className="flex items-center h-full">
          {/* Logo */}
          <div className="flex items-center ml-4 sm:ml-8 lg:ml-[50px]">
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/img/LogoScala.png"
                alt="Scala Learning"
                className="h-12 sm:h-14 lg:h-16 w-auto"
              />
            </Link>
          </div>

          {/* Navegación */}
          <nav className="flex-1 flex justify-end pr-4 sm:pr-8">
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <Link
                to="/acerca"
                className={`${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium ${responsive.text.small}`}
              >
                Acerca de
              </Link>

              {/* Dropdown de Recursos */}
              <ResourceDropdown
                isOpen={isDropdownOpen}
                onToggle={handleDropdownToggle}
                responsive={responsive}
                resources={resources}
                loading={loading}
              />

              <Link
                to="/contacto"
                className={`${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium ${responsive.text.small}`}
              >
                Contacto
              </Link>
            </div>
          </nav>

          {/* Botones de la derecha */}
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
