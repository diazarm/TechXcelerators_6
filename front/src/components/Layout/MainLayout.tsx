import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useResponsive } from "../../hooks";
import type { MainLayoutProps } from "./types";
import { Navbar, Footer, Header } from "../../components";

const MainLayout: React.FC<MainLayoutProps> = ({ className = "" }) => {
  const responsive = useResponsive();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const shouldShowHeader = !isHomePage && !isLoginPage;

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
      <main className={`${responsive.container} pb-16 pt-8 flex-1`}>
        <Outlet /> {/* 👈 Aquí se montan las páginas según la ruta */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
