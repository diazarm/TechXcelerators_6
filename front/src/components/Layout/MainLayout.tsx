import React from "react";
import { useResponsive } from "../../hooks";
import type { MainLayoutProps } from "./types";
import { Header, Navbar, Footer } from "../../components";
import { useHeader } from "../../context";


const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = "",
}) => {
  const responsive = useResponsive();
  const { header } = useHeader();


  return (
    <div className={`min-h-screen bg-white ${className}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Navbar */}
      <Navbar title="scala" subtitle="Learning" />
      
        {/* Header dinámico */}
        <Header 
          title={header.title || "scala"} 
          subtitle={header.subtitle || "Learning"} 
        />

      {/* Main Content */}
      {children && (
        <main className={`${responsive.container} ${responsive.spacing.py.large}`}>
          {children}
        </main>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;