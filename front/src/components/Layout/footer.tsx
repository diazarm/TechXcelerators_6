import React from "react";
import { Link } from "react-router-dom";
import { useScreenSize } from "../../context";
import { useAuth, useNotification } from "../../hooks";
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
  const { getContainerForScreen, scale } = useScreenSize();
  const { isAuthenticated } = useAuth();
  const { addNotification } = useNotification();

  // Configuración de colores según la variante
  const isDark = variant === "dark";
  const logo = isDark ? "/img/Logo3.png" : "/img/LogoScala2.png";
  // Logo más grande para el footer
  const logoHeight = `${scale(140)}px`;
  
  const footerClasses = isDark 
    ? "bg-black text-white" 
    : "bg-white text-gray-900";
  
  const iconColorClasses = isDark 
    ? "text-white" 
    : "text-gray-700";
  
  const borderClasses = isDark 
    ? "border-gray-600" 
    : "border-gray-300";
  
  const copyrightClasses = isDark 
    ? "text-gray-400" 
    : "text-gray-600";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      addNotification({
        type: "info",
        title: "Inicia sesión",
        message: "Para acceder al dashboard, inicia sesión primero",
        duration: 5000
      });
    }
  };

  return (
    <footer id="footer" className={footerClasses}>
      <div 
        className={`${getContainerForScreen()}`}
        style={{ paddingTop: scale(48), paddingBottom: scale(32) }}
      >
        {/* Layout de dos columnas */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Columna 1: Logo, Redes Sociales y Botón de Contacto */}
          <div className="flex flex-col items-center" style={{ gap: scale(24) }}>
            {/* Logo */}
            <Link 
              to={isAuthenticated ? "/dashboard" : "/"} 
              className="flex items-center hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <img 
                src={logo} 
                alt="Scala Learning" 
                className="w-auto object-contain"
                style={{ height: logoHeight }}
              />
            </Link>
            
            {/* Redes Sociales */}
            <div className="flex" style={{ gap: scale(8) }}>
              <a 
                href="https://web.facebook.com/scalalearninglatam/?_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg flex items-center justify-center transition-colors"
                style={{
                  width: scale(28),
                  height: scale(28),
                  backgroundColor: '#232323'
                }}
                aria-label="Facebook"
              >
                <Facebook 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: scale(12),
                    height: scale(12)
                  }}
                />
              </a>
              
              <a 
                href="https://www.instagram.com/scalalearninglatam/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg flex items-center justify-center transition-colors"
                style={{
                  width: scale(28),
                  height: scale(28),
                  backgroundColor: '#232323'
                }}
                aria-label="Instagram"
              >
                <Instagram 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: scale(12),
                    height: scale(12)
                  }}
                />
              </a>
              
              <a 
                href="https://www.linkedin.com/company/scalalearninglatam/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg flex items-center justify-center transition-colors"
                style={{
                  width: scale(28),
                  height: scale(28),
                  backgroundColor: '#232323'
                }}
                aria-label="LinkedIn"
              >
                <Linkedin 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: scale(12),
                    height: scale(12)
                  }}
                />
              </a>
              
              <a 
                href="https://www.youtube.com/channel/UCTso-90g7wyYSj7suVKfghQ"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg flex items-center justify-center transition-colors"
                style={{
                  width: scale(28),
                  height: scale(28),
                  backgroundColor: '#232323'
                }}
                aria-label="YouTube"
              >
                <Youtube 
                  className={`${iconColorClasses}`} 
                  style={{
                    width: scale(12),
                    height: scale(12)
                  }}
                />
              </a>
            </div>
            
            {/* Botón de Contacto */}
            <a
              href="https://scalalearning.com/contactanos/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-opacity-10 hover:bg-orange-500 self-center"
              style={{
                borderColor: '#FF6E00',
                color: '#FF6E00',
                fontSize: scale(14)
              }}
            >
              Contacto
            </a>
          </div>

          {/* Línea divisoria */}
          <div className="lg:hidden w-full h-px my-8" style={{ backgroundColor: '#A2A2A2' }}></div>
          <div className="hidden lg:block w-px h-auto mx-8" style={{ backgroundColor: '#A2A2A2' }}></div>

          {/* Columna 2: Texto corporativo */}
          <div 
            className="flex flex-col justify-center flex-1"
            style={{ gap: scale(12) }}
          >
            <p 
              className="text-gray-300 leading-relaxed"
              style={{ fontSize: scale(14) }}
            >
              Somos una corporación internacional especializada en la transformación digital educativa y la generación de alianzas estratégicas con instituciones de educación superior en más de 20 países.
            </p>
            
            <p 
              className="text-gray-300 leading-relaxed"
              style={{ fontSize: scale(14) }}
            >
              Ofrecemos un ecosistema de servicios integral (360), diseñado específicamente para potenciar el crecimiento exponencial de las matrículas en la modalidad virtual.
            </p>
            
            <p 
              className="text-gray-300 leading-relaxed"
              style={{ fontSize: scale(14) }}
            >
              Nos consolidamos como un aliado estratégico clave para la educación superior, aportando agilidad digital, nuestro know-how especializado y la experiencia necesaria para impulsar a las universidades hacia el liderazgo en el entorno digital. Nuestro objetivo es asegurar una expansión sostenible y una posición competitiva en el mercado global.
            </p>
          </div>
        </div>
      </div>

      {/* Separador y Copyright */}
      <div className={`border-t ${borderClasses}`}>
        <div 
          className={`${getContainerForScreen()}`}
          style={{ paddingTop: scale(16), paddingBottom: scale(16) }}
        >
          <p 
            className={`text-center ${copyrightClasses}`}
            style={{ fontSize: scale(12) }}
          >
            Copyright © 2025 Scala Learning | Todos los derechos reservados | <a 
              href="https://scalalearning.com/wp-content/uploads/2022/05/Politica-Privacidad_SCALALEARNING_25042022.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${copyrightClasses} hover:text-white transition-colors underline`}
            >
              Política de privacidad y aviso de confidencialidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
