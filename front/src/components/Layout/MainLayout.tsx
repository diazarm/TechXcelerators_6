import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useScreenSize } from "../../context";
import type { MainLayoutProps } from "./types";
import { Navbar, Footer, Header } from "../../components";

const MainLayout: React.FC<MainLayoutProps> = ({
  className = "",
  footerVariant = "dark",
}) => {
  const { getContainerForScreen, scale } = useScreenSize();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isManualPage = location.pathname === "/manual-usuario";
  const isUtilidadesPage = location.pathname === "/utilidades";
  const shouldShowHeader = !isHomePage && !isLoginPage && !isManualPage && !isUtilidadesPage;

  // Scroll to top en cada cambio de ruta
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen bg-white flex flex-col ${className}`}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Navbar siempre visible */}
      <Navbar className={className} />

      {/* Header dinámico */}
      {shouldShowHeader && <Header />}

      {/* Main content */}
      <main 
        className={`${!isHomePage ? getContainerForScreen() : ''} flex-1`}
        style={{
          paddingBottom: !isHomePage ? `${scale(150)}px` : '0px',
          paddingTop: !isHomePage ? `${scale(16)}px` : '0px'
        }}
      >
        <Outlet /> {/* 👈 Aquí se montan las páginas según la ruta */}
      </main>

      {/* Footer */}
      <Footer variant={footerVariant} />
    </div>
  );
};

export default MainLayout;
