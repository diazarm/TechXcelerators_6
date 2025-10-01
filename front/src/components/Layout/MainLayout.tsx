import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useScreenSize } from "../../context";
import type { MainLayoutProps } from "./types";
import { Navbar, Footer, Header } from "../../components";

const MainLayout: React.FC<MainLayoutProps> = ({
  className = "",
  footerVariant = "dark",
}) => {
  const { getContainerForScreen, dimensions } = useScreenSize();
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
      <main 
        className={`${getContainerForScreen()} flex-1`}
        style={{
          paddingBottom: dimensions.spacing.xl,
          paddingTop: dimensions.spacing.md
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
