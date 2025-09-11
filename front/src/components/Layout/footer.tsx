import React from "react";
import { Link } from "react-router-dom";
import { useResponsive } from "../../hooks";
import { Facebook, Instagram, Linkedin, Youtube } from "react-feather";

/**
 * Variantes del footer
 */
export type FooterVariant = "dark" | "light";

/**
 * Props del componente Footer
 */
export interface FooterProps {
  /** Variante del footer (dark o light) */
  variant?: FooterVariant;
}

/**
 * Footer con logo, redes sociales, enlaces de navegación y copyright
 */
export const Footer: React.FC<FooterProps> = ({ variant = "dark" }) => {
  const responsive = useResponsive();

  // Configuración de colores según la variante
  const isDark = variant === "dark";
  const logo = isDark ? "/img/Logo3.png" : "/img/LogoScala2.png";
  const logoSize = isDark ? "h-24" : "h-20";
  
  const footerClasses = isDark 
    ? "bg-black text-white" 
    : "bg-white text-gray-900";
  
  const headerClasses = isDark 
    ? "text-white" 
    : "text-blue-900";
  
  const linkClasses = isDark 
    ? "text-gray-400 hover:text-white" 
    : "text-gray-600 hover:text-blue-900";
  
  const iconClasses = isDark 
    ? "bg-gray-700 hover:bg-gray-600" 
    : "bg-gray-200 hover:bg-gray-300";
  
  const iconColorClasses = isDark 
    ? "text-white" 
    : "text-gray-700";
  
  const borderClasses = isDark 
    ? "border-gray-600" 
    : "border-gray-300";
  
  const copyrightClasses = isDark 
    ? "text-gray-400" 
    : "text-gray-600";

  return (
    <footer className={footerClasses}>
      <div className={`${responsive.container} py-16`}>
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo y Redes Sociales */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img 
                src={logo} 
                alt="Scala Learning" 
                className={`${logoSize} w-auto`}
              />
            </Link>
            
            {/* Redes Sociales */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={`w-9 h-9 ${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                aria-label="Facebook"
              >
                <Facebook className={`w-5 h-5 ${iconColorClasses}`} />
              </a>
              
              <a 
                href="#" 
                className={`w-9 h-9 ${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                aria-label="Instagram"
              >
                <Instagram className={`w-5 h-5 ${iconColorClasses}`} />
              </a>
              
              <a 
                href="#" 
                className={`w-9 h-9 ${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                aria-label="LinkedIn"
              >
                <Linkedin className={`w-5 h-5 ${iconColorClasses}`} />
              </a>
              
              <a 
                href="#" 
                className={`w-9 h-9 ${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                aria-label="YouTube"
              >
                <Youtube className={`w-5 h-5 ${iconColorClasses}`} />
              </a>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div className="space-y-6">
            <h3 className={`${headerClasses} font-medium text-lg`}>Acerca de</h3>
            <div className="space-y-3">
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className={`${headerClasses} font-medium text-lg`}>Recursos</h3>
            <div className="space-y-3">
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className={`${headerClasses} font-medium text-lg`}>Contacto</h3>
            <div className="space-y-3">
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Lorem ipsum</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Separador y Copyright */}
      <div className={`border-t ${borderClasses}`}>
        <div className={`${responsive.container} py-8`}>
          <p className={`text-center ${copyrightClasses} text-base`}>
            Copyright © 2005 Scala Learning | Terms and Conditions | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};
