import React from "react";
import { useResponsive } from "../../hooks";
import type { MainLayoutProps } from "./types";
import { Navbar, Footer } from "../../components";


const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = "",
}) => {
  const responsive = useResponsive();


  return (
    <div className={`min-h-screen bg-white ${className}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Navbar */}
      <Navbar className={className} />

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