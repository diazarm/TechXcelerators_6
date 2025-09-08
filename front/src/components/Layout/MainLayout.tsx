import React from "react";
import { useLocation } from "react-router-dom";
import { useResponsive } from "../../hooks";
import type { MainLayoutProps } from "./types";
import { Navbar, Footer, SearchBar } from "../../components";


const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = "",
}) => {
  const responsive = useResponsive();
  const location = useLocation();
  
  // Determinar si estamos en la página Home (landing page)
  const isHomePage = location.pathname === '/';


  return (
    <div className={`min-h-screen bg-white flex flex-col ${className}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Navbar */}
      <Navbar className={className} />

      {/* SearchBar - Solo mostrar si no estamos en Home */}
      {!isHomePage && (
        <div className="bg-white">
          <div className={`${responsive.container}`}>
            <div className="flex justify-center items-center">
              <SearchBar />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {children && (
        <main className={`${responsive.container} pb-16 flex-1`}>
          {children}
        </main>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;