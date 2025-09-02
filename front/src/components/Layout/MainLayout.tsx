import React from "react";


import { useResponsive } from "../../hooks/useResponsive";
import type { MainLayoutProps } from "./types";
import { Header } from "./header";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { useHeader } from "../../context";
// donde se va a renderizar el contenido de la pagina


//ojo con esto de arriba, todo lo que sea type con cuidado.
// colocado y tipos compartidos.
//cada componente que tenga sus tipados. 
//type en index.
//planos globales, los tipos compartidos donde lo voy a ocupar en distintas partes.
//hacer archivo de typos compartidos. types.ts

//renderizar todo (¿Dejar espacio para el body?)
//No tocar los hooks por el amor zeus.
//importar el hook, por favors.

/**
 * Componente MainLayout con colores de marca y botones integrados
 * 
 * @example
 * ```tsx
 * // Layout básico
 * <MainLayout>
 *   <div>Contenido principal</div>
 * </MainLayout>
 * 
 * // Layout con clases personalizadas
 * <MainLayout className="min-h-screen">
 *   <div>Contenido principal</div>
 * </MainLayout>
 * ```
 */
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
      
        {/* Hero Section */}
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