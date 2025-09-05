import React from "react";
import { Link } from "react-router-dom";
import { useResponsive } from "../../hooks";

/**
 * Footer compacto y atractivo con relación al navbar
 */
export const Footer: React.FC = () => {
  const responsive = useResponsive();

  return (
    <footer className="bg-[#292727] text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className={`${responsive.container} py-4 sm:py-6 lg:py-8`}>
        {/* Contenido principal */}
        <div className="flex flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Logo y navegación juntos */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="/img/LogoScala2.png" 
                alt="Scala Learning" 
                className="h-6 sm:h-8 lg:h-10 w-auto"
              />
            </Link>

            {/* Navegación */}
            <nav className="flex flex-row gap-4 sm:gap-6">
              <Link 
                to="/" 
                className={`text-white hover:text-[#FF6E00] transition-colors font-medium ${responsive.text.small}`}
              >
                Inicio
              </Link>
              <Link 
                to="/acerca" 
                className={`text-white hover:text-[#FF6E00] transition-colors font-medium ${responsive.text.small}`}
              >
                Acerca de
              </Link>
            </nav>
          </div>

          {/* Información de contacto */}
          <div className="text-right">
            <p className={`${responsive.text.small} text-white/80 mb-1`}>
              support@scala.com
            </p>
            <p className={`${responsive.text.xsmall} text-white/60`}>
              © 2024 Scala Learning
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
