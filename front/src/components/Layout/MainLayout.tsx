import React from "react";
import { useLocation } from "react-router-dom";
import { useResponsive } from "../../hooks";
import type { MainLayoutProps } from "./types";
import { Navbar, Footer, Header } from "../../components";


const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = "",
  footerVariant = "light",
}) => {
  const responsive = useResponsive();
  const location = useLocation();
  
  // Páginas que NO usan header dinámico
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const shouldShowHeader = !isHomePage && !isLoginPage;


  return (
    <div className={`min-h-screen bg-white flex flex-col ${className}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Navbar - siempre visible */}
      <Navbar className={className} />

      {/* Header con SearchBar - solo en páginas internas */}
      {shouldShowHeader && <Header />}

      {/* Main Content */}
      {children && (
        <main className={`${responsive.container} pb-16 pt-8 flex-1`}>
          {children}
        </main>
      )}
      
      {/* Footer */}
      <Footer variant={footerVariant} />
    </div>
  );
};

export default MainLayout;