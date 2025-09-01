import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../Button";
import { useResponsive } from "../../hooks/useResponsive";



/**
 * Componente Logo personalizado
 */
const CustomLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    width="60" 
    height="40" 
    viewBox="0 0 60 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Purple "S" shape */}
    <path 
      d="M15 8C15 8 20 6 25 8C30 10 32 15 30 20C28 25 20 28 15 26C10 24 8 20 10 16C12 12 18 10 22 12C26 14 28 18 26 22C24 26 18 28 14 26C10 24 8 20 10 16C12 12 18 10 22 12" 
      stroke="#585D8A" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Orange curved shape */}
    <path 
      d="M35 15C35 15 40 12 45 15C50 18 52 22 50 26C48 30 43 32 38 30C33 28 31 24 33 20C35 16 40 14 45 16" 
      stroke="#F86E15" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/**
 * Componente Header con botones integrados
 * 
 * @example
 * ```tsx
 * // Header básico
 * <Header title="Mi Aplicación" />
 * 
 * // Header con botón de navegación
 * <Header 
 *   title="Dashboard" 
 *   subtitle="Bienvenido de vuelta"
 *   showNavButton 
 *   onNavClick={handleNavClick}
 * />
 * 
 * // Header con clases personalizadas
 * <Header 
 *   title="Perfil" 
 *   className="bg-gradient-to-r from-blue-500 to-purple-600"
 * />
 * ```
 */
export const Navbar: React.FC<NabvarProps> = ({
  title = "scala",
  subtitle = "Learning",
  showNavButton = false,
  onNavClick,
  className = "",
}) => {
  const responsive = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-[#585D8A] shadow-lg ${className}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className={responsive.container}>
        <div className={`${responsive.flex.between} ${responsive.spacing.py.small}`}>
          {/* Logo y título */}
          <div className={`${responsive.flex.start} space-x-4`}>
            {showNavButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onNavClick || handleMenuToggle}
                className="lg:hidden text-white border-white hover:bg-white hover:text-[#585D8A]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            )}
            
            <Link to="/" className={`${responsive.flex.start} space-x-3 hover:opacity-80 transition-opacity`}>
              <CustomLogo className="w-12 h-8" />
              <div>
                <h1 className={`${responsive.text.h4} text-white font-bold`}>
                  {title}
                </h1>
                {subtitle && (
                  <p className={`${responsive.text.small} text-[#F86E15] font-semibold`}>
                    {subtitle}
                  </p>
                )}
              </div>
            </Link>
          </div>

          {/* Campo de búsqueda */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <div className="bg-white rounded-full px-4 py-2 flex items-center space-x-2 min-w-[200px] shadow-sm">
                <div className="w-3 h-3 bg-[#CDC9EF] rounded-full"></div>
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="flex-1 text-gray-700 font-medium outline-none border-none bg-transparent placeholder-gray-500"
                />
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/gobernanza" className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors font-bold`}>
              GOBERNANZA
            </Link>
            <Link to="/planeacion" className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors font-bold`}>
              PLANEACIÓN
            </Link>
            <Link to="/chat" className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors font-bold`}>
              CHAT IA
            </Link>
            <Link to="/galeria" className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors font-bold`}>
              GALERÍA
            </Link>
            <Link to="/alianza" className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors font-bold`}>
              NUESTRA ALIANZA
            </Link>
          </nav>
        </div>
        
        {/* Menú móvil, matar esto, por favor. */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-[#4a4f7a] py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/gobernanza" 
                className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors px-4 py-2 rounded-md hover:bg-[#4a4f7a] font-bold`}
                onClick={() => setIsMenuOpen(false)}
              >
                GOBERNANZA
              </Link>
              <Link 
                to="/planeacion" 
                className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors px-4 py-2 rounded-md hover:bg-[#4a4f7a] font-bold`}
                onClick={() => setIsMenuOpen(false)}
              >
                PLANEACIÓN
              </Link>
              <Link 
                to="/chat" 
                className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors px-4 py-2 rounded-md hover:bg-[#4a4f7a] font-bold`}
                onClick={() => setIsMenuOpen(false)}
              >
                CHAT IA
              </Link>
              <Link 
                to="/galeria" 
                className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors px-4 py-2 rounded-md hover:bg-[#4a4f7a] font-bold`}
                onClick={() => setIsMenuOpen(false)}
              >
                GALERÍA
              </Link>
              <Link 
                to="/alianza" 
                className={`${responsive.text.body} text-white hover:text-[#F86E15] transition-colors px-4 py-2 rounded-md hover:bg-[#4a4f7a] font-bold`}
                onClick={() => setIsMenuOpen(false)}
              >
                NUESTRA ALIANZA
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};