import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "react-feather";
import { Button, ResourceDropdown, OptimizedImage } from "../index"; // 👈 limpio desde barrel file
import { useAuth, useNotification } from "../../hooks";
import { useScreenSize } from "../../context";
import { COLOR_CLASSES } from "../../constants";
import type { HeaderProps } from "./types";

export const Navbar: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, isAuthenticated, user } = useAuth();
  const { addNotification } = useNotification();
  const { scale, dimensions, isMobile, getContainerForScreen } = useScreenSize();
  const location = useLocation();
  
  // Detectar páginas públicas
  const isPublicPage = location.pathname === "/" || location.pathname === "/manual-usuario";
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Determinar la ruta del logo según el estado de autenticación
  const getLogoDestination = () => {
    if (isAuthenticated && user) {
      // Si está autenticado, redirigir al dashboard
      return '/dashboard';
    }
    // Si no está autenticado, redirigir al home
    return '/';
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    // Si no está autenticado y está intentando ir al dashboard, mostrar notificación
    if (!isAuthenticated && getLogoDestination() === '/dashboard') {
      e.preventDefault();
      addNotification({
        type: "info",
        title: "Inicia sesión",
        message: "Para acceder al dashboard, inicia sesión primero",
        duration: 5000
      });
    }
    // Si está autenticado o va al home, permitir navegación normal
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    addNotification({
      type: "success",
      title: "Sesión cerrada",
      message: "Has cerrado sesión correctamente. ¡Hasta pronto!",
      duration: 5000,
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Cerrar menú móvil al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Cerrar menú móvil al cambiar de tamaño de pantalla
  useEffect(() => {
    if (!isMobile) {
      closeMobileMenu();
    }
  }, [isMobile]);

  return (
    <header
      className={`bg-white shadow-sm sticky top-0 z-50 ${className}`}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div 
        className={`${getContainerForScreen()}`}
        style={{
          paddingTop: dimensions.spacing.md,
          paddingBottom: dimensions.spacing.md
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to={getLogoDestination()}
              className="flex items-center hover:opacity-80 transition-opacity"
              style={{ gap: dimensions.spacing.xs }}
              onClick={handleLogoClick}
            >
              <OptimizedImage
                src="/img/LogoScala.png"
                alt="Scala Learning"
                className="w-auto"
                style={{ height: dimensions.spacing['2xl'] }}
                loading="eager"
              />
            </Link>
          </div>

          {/* Navegación Desktop */}
          {!isMobile && (
            <nav className="flex-1 flex justify-end">
              <div 
                className="flex items-center"
                style={{ 
                  gap: dimensions.spacing.lg,
                  marginRight: dimensions.spacing.lg
                }}
              >
                <a
                  href="#footer"
                  className={`${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium`}
                  style={{ fontSize: dimensions.fontSize.sm }}
                >
                  Acerca de
                </a>

                {/* Dropdown de Recursos */}
                <ResourceDropdown
                  isOpen={isDropdownOpen}
                  onToggle={handleDropdownToggle}
                />

                <a
                  href="https://scalalearning.com/contactanos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium`}
                  style={{ fontSize: dimensions.fontSize.sm }}
                >
                  Contacto
                </a>
              </div>
            </nav>
          )}

          {/* Botón Salir Desktop */}
          {!isMobile && isAuthenticated && (
            <div className="flex items-center">
              <Button
                variant="secondary"
                size="xs"
                onClick={handleLogout}
                className="text-xs sm:text-sm hover:!bg-[#FF6E00] hover:!text-white"
              >
                Salir
              </Button>
            </div>
          )}

          {/* Elementos móviles - Recursos + Hamburger pegados */}
          {isMobile && (
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs }}>
              {/* Dropdown de Recursos */}
              <ResourceDropdown
                isOpen={isDropdownOpen}
                onToggle={handleDropdownToggle}
              />

              {/* Botón Hamburger Mobile */}
              <button
                onClick={toggleMobileMenu}
                className="rounded-md hover:bg-gray-100 transition-colors"
                style={{
                  padding: dimensions.spacing.xs,
                  fontSize: dimensions.fontSize.sm,
                  color: '#5D5A88',
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X 
                    size={scale(20)} 
                    stroke="currentColor"
                    style={{ color: '#5D5A88' }}
                  />
                ) : (
                  <Menu 
                    size={scale(20)} 
                    stroke="currentColor"
                    style={{ color: '#5D5A88' }}
                  />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Overlay para menú móvil */}
        {isMobile && isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          />
        )}

        {/* Menú Móvil Lateral */}
        {isMobile && isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
            style={{
              paddingTop: dimensions.spacing.xl,
              paddingBottom: dimensions.spacing.md,
              paddingLeft: dimensions.spacing.md,
              paddingRight: dimensions.spacing.md
            }}
          >
            {/* Header del menú */}
            <div 
              className="flex items-center justify-between"
              style={{ marginBottom: dimensions.spacing.xl }}
            >
              <h2 
                className="font-semibold text-gray-900"
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Menú
              </h2>
              <button
                onClick={closeMobileMenu}
                className="rounded-md hover:bg-gray-100 transition-colors"
                style={{ 
                  padding: dimensions.spacing.xs,
                  color: '#5D5A88',
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
                aria-label="Cerrar menú"
              >
                <X 
                  size={scale(20)} 
                  stroke="currentColor"
                  style={{ color: '#5D5A88' }}
                />
              </button>
            </div>

            {/* Contenido del menú */}
            <div 
              className="space-y-6"
              style={{ gap: dimensions.spacing.md }}
            >
              {/* Enlace Inicio - inteligente según autenticación */}
              <Link
                to={isAuthenticated ? "/dashboard" : "/"}
                className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                style={{ fontSize: dimensions.fontSize.md }}
                onClick={closeMobileMenu}
              >
                Inicio
              </Link>

              {/* Enlaces públicos (siempre visibles) */}
              <a
                href="#footer"
                className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                style={{ fontSize: dimensions.fontSize.md }}
                onClick={closeMobileMenu}
              >
                Acerca de
              </a>

              <a
                href="https://scalalearning.com/contactanos/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                style={{ fontSize: dimensions.fontSize.md }}
                onClick={closeMobileMenu}
              >
                Contacto
              </a>

              {/* Enlaces privados (solo si NO estamos en páginas públicas) */}
              {!isPublicPage && (
                <>
                  <Link
                    to="/alianza"
                    className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                    style={{ fontSize: dimensions.fontSize.md }}
                    onClick={closeMobileMenu}
                  >
                    Nuestra Alianza
                  </Link>

                  <Link
                    to="/gobernanza"
                    className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                    style={{ fontSize: dimensions.fontSize.md }}
                    onClick={closeMobileMenu}
                  >
                    Gobernanza
                  </Link>

                  <Link
                    to="/planeacion"
                    className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                    style={{ fontSize: dimensions.fontSize.md }}
                    onClick={closeMobileMenu}
                  >
                    Planeación
                  </Link>

                  <Link
                    to="/gestion"
                    className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                    style={{ fontSize: dimensions.fontSize.md }}
                    onClick={closeMobileMenu}
                  >
                    Gestión
                  </Link>

                  <Link
                    to="/iniciativas"
                    className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                    style={{ fontSize: dimensions.fontSize.md }}
                    onClick={closeMobileMenu}
                  >
                    Iniciativas
                  </Link>

                  <Link
                    to="/galeria"
                    className="block text-gray-700 hover:text-[#4A476F] transition-colors font-medium py-2"
                    style={{ fontSize: dimensions.fontSize.md }}
                    onClick={closeMobileMenu}
                  >
                    Galería
                  </Link>
                </>
              )}

              {/* Botón Salir en móvil (solo si está autenticado y NO en páginas públicas) */}
              {isAuthenticated && !isPublicPage && (
                <div 
                  className="border-t border-gray-200 pt-6 mt-6"
                  style={{ 
                    paddingTop: dimensions.spacing.md,
                    marginTop: dimensions.spacing.md
                  }}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full"
                  >
                    Salir
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
