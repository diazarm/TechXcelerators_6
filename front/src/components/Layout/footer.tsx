import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer compacto y atractivo con relación al navbar
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#292727] text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo y navegación */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="/img/LogoScala2.png" 
                alt="Scala Learning" 
                className="h-8 w-auto"
              />
            </Link>

            {/* Navegación vertical */}
            <nav className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="text-white hover:text-[#FF6E00] transition-colors font-medium text-sm"
              >
                Inicio
              </Link>
              <Link 
                to="/acerca" 
                className="text-white hover:text-[#FF6E00] transition-colors font-medium text-sm"
              >
                Acerca de
              </Link>
            </nav>
          </div>

          {/* Información de contacto compacta */}
          <div className="text-center md:text-right">
            <p className="text-sm text-white/80 mb-1">
              support@scala.com
            </p>
            <p className="text-xs text-white/60">
              © 2024 Scala Learning
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
