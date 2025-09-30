import React from "react";
import { Link } from "react-router-dom";
import { useResponsive, useComponentDimensions } from "../../hooks";
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
  const dimensions = useComponentDimensions();

  // Configuración de colores según la variante
  const isDark = variant === "dark";
  const logo = isDark ? "/img/Logo3.png" : "/img/LogoScala2.png";
  // Ajuste específico para que el logo del footer se vea del mismo tamaño visual que el navbar
  // Los logos tienen diferentes proporciones, por eso necesitamos multiplicadores específicos
  const navbarLogoHeight = dimensions.spacing.xl; // 32px escalado
  const footerLogoMultiplier = isDark ? 2.5 : 2.8; // Multiplicador aumentado significativamente
  const logoHeight = `${parseFloat(navbarLogoHeight) * footerLogoMultiplier}px`;
  
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
      <div 
        className={`${responsive.container}`}
        style={{ paddingTop: dimensions.spacing.xl, paddingBottom: dimensions.spacing.xl }}
      >
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo y Redes Sociales */}
          <div className="space-y-8 md:space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-between md:justify-start">
              <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <img 
                  src={logo} 
                  alt="Scala Learning" 
                  className={`w-auto ${isDark ? '' : 'object-contain ml-6'}`}
                  style={{ height: logoHeight }}
                />
              </Link>
              
              {/* Redes Sociales - Solo en móvil al lado del logo */}
              <div className="flex space-x-2 md:hidden">
              <a 
                href="#" 
                className={`${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                style={{
                  width: dimensions.spacing.lg,
                  height: dimensions.spacing.lg
                }}
                aria-label="Facebook"
              >
                <Facebook 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md
                  }}
                />
              </a>
              
              <a 
                href="#" 
                className={`${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                style={{
                  width: dimensions.spacing.lg,
                  height: dimensions.spacing.lg
                }}
                aria-label="Instagram"
              >
                <Instagram 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md
                  }}
                />
              </a>
              
              <a 
                href="#" 
                className={`${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                style={{
                  width: dimensions.spacing.lg,
                  height: dimensions.spacing.lg
                }}
                aria-label="LinkedIn"
              >
                <Linkedin 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md
                  }}
                />
              </a>
              
              <a 
                href="#" 
                className={`${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                style={{
                  width: dimensions.spacing.lg,
                  height: dimensions.spacing.lg
                }}
                aria-label="YouTube"
              >
                <Youtube 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md
                  }}
                />
              </a>
              </div>
            </div>
            
            {/* Redes Sociales - Solo en desktop debajo del logo */}
            <div className="hidden md:flex space-x-4">
              <a 
                href="#" 
                className={`${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                style={{
                  width: dimensions.spacing.lg,
                  height: dimensions.spacing.lg
                }}
                aria-label="Facebook"
              >
                <Facebook 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md
                  }}
                />
              </a>
              
              <a 
                href="#" 
                className={`${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                style={{
                  width: dimensions.spacing.lg,
                  height: dimensions.spacing.lg
                }}
                aria-label="Instagram"
              >
                <Instagram 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md
                  }}
                />
              </a>
              
              <a 
                href="#" 
                className={`${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                style={{
                  width: dimensions.spacing.lg,
                  height: dimensions.spacing.lg
                }}
                aria-label="LinkedIn"
              >
                <Linkedin 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md
                  }}
                />
              </a>
              
              <a 
                href="#" 
                className={`${iconClasses} rounded-lg flex items-center justify-center transition-colors`}
                style={{
                  width: dimensions.spacing.lg,
                  height: dimensions.spacing.lg
                }}
                aria-label="YouTube"
              >
                <Youtube 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md
                  }}
                />
              </a>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div className="space-y-6">
            <h3 
              className={`${headerClasses} font-medium`}
              style={{ fontSize: dimensions.fontSize.lg }}
            >
              Acerca de
            </h3>
            <div className="space-y-3">
              <Link to="/alianza" className={`block ${linkClasses} transition-colors`}>Nuestra Alianza</Link>
              <Link to="/gobernanza" className={`block ${linkClasses} transition-colors`}>Gobernanza</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Planeación</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`} style={{ color: '#FF6E00' }}>Gestión</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Iniciativa</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 
              className={`${headerClasses} font-medium`}
              style={{ fontSize: dimensions.fontSize.lg }}
            >
              Recursos
            </h3>
            <div className="space-y-3">
              <Link to="#" className={`block ${linkClasses} transition-colors`} style={{ color: '#FF6E00' }}>Chat IA</Link>
              <Link to="#" className={`block ${linkClasses} transition-colors`}>Galería de Imágenes e Hitos de la Alianza</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 
              className={`${headerClasses} font-medium`}
              style={{ fontSize: dimensions.fontSize.lg }}
            >
              Contacto
            </h3>
            <div className="space-y-3">
              <div className={`block ${linkClasses}`}>
                Mariano Sánchez Fontecilla 310<br />
                Oficina 02-137, Las Condes.
              </div>
              <div className={`block ${linkClasses}`}>+56 22 594-0659</div>
            </div>
          </div>
        </div>
      </div>

      {/* Separador y Copyright */}
      <div className={`border-t ${borderClasses}`}>
        <div 
          className={`${responsive.container}`}
          style={{ paddingTop: dimensions.spacing.md, paddingBottom: dimensions.spacing.md }}
        >
          <p 
            className={`text-center ${copyrightClasses}`}
            style={{ fontSize: dimensions.fontSize.md }}
          >
            Copyright © 2005 Scala Learning | Terms and Conditions | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};
