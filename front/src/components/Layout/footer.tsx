import React from "react";
import { Link } from "react-router-dom";
import { useResponsive } from "../../hooks";

/**
 * Componente Footer simple y responsivo
 */
export const Footer: React.FC = () => {
  const responsive = useResponsive();

  return (
    <footer className="bg-[#585D8A] text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Contenido principal del footer */}
      <div className={responsive.container}>
        <div className={`${responsive.spacing.py.medium} ${responsive.spacing.px.medium}`}>
          {/* Sección principal con columnas */}
          <div className={`${responsive.grid.columns.four} gap-8 mb-8`}>
            {/* Columna 1: Logo */}
            <div className="col-span-1">
              <div className="flex items-center space-x-3">
                <svg 
                  width="40" 
                  height="30" 
                  viewBox="0 0 60 40" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-8"
                >
                  {/* Purple "S" shape */}
                  <path 
                    d="M15 8C15 8 20 6 25 8C30 10 32 15 30 20C28 25 20 28 15 26C10 24 8 20 10 16C12 12 18 10 22 12C26 14 28 18 26 22C24 26 18 28 14 26C10 24 8 20 10 16C12 12 18 10 22 12" 
                    stroke="white" 
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
                <div>
                  <h3 className="text-lg font-bold text-white">SCALA</h3>
                  <p className="text-sm text-[#F86E15] font-semibold">Learning</p>
                </div>
              </div>
            </div>

            {/* Columna 2: Learn More */}
            <div className="col-span-1">
              <h4 className="text-base font-bold text-white mb-4">Learn More</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-white hover:text-[#F86E15] transition-colors text-sm">
                    About Scala
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-white hover:text-[#F86E15] transition-colors text-sm">
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link to="/environment" className="text-white hover:text-[#F86E15] transition-colors text-sm">
                    Environment
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-white hover:text-[#F86E15] transition-colors text-sm">
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Services */}
            <div className="col-span-1">
              <h4 className="text-base font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/gobernanza" className="text-white hover:text-[#F86E15] transition-colors text-sm">
                    Gobernanza
                  </Link>
                </li>
                <li>
                  <Link to="/planeacion" className="text-white hover:text-[#F86E15] transition-colors text-sm">
                    Planeación
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="text-white hover:text-[#F86E15] transition-colors text-sm">
                    Chat IA
                  </Link>
                </li>
                <li>
                  <Link to="/galeria" className="text-white hover:text-[#F86E15] transition-colors text-sm">
                    Galería
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4: Contact Us */}
            <div className="col-span-1">
              <h4 className="text-base font-bold text-white mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-white text-sm">
                  <span className="font-semibold">Support:</span> support@scala.com
                </li>
                <li className="text-white text-sm">
                  <span className="font-semibold">Phone:</span> +1 (555) 123-4567
                </li>
                <li className="text-white text-sm">
                  <span className="font-semibold">Address:</span> 123 Learning St.
                </li>
                <li className="text-white text-sm">
                  <span className="font-semibold">Hours:</span> Mon-Fri 9AM-6PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Línea separadora */}
      <div className="border-t border-[#4a4f7a]"></div>

      {/* Sección de copyright */}
      <div className={responsive.container}>
        <div className={`${responsive.spacing.py.small} ${responsive.spacing.px.medium} text-center`}>
          <p className="text-sm text-white">
            © 2024 Scala Learning | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
