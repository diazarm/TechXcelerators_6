import React from "react";
import { useResponsive, useHeader } from "../../hooks";
import { SearchBar } from "../../components";
import type { HeaderProps } from "./types";

/**
 * Header Dinámico
 * 
 * Componente que renderiza títulos dinámicos basados en la página actual.
 * Se integra con HeaderContext para obtener la configuración de cada página.
 * 
 * @example
 * <Header title="GOBERNANZA ESTRATÉGICA" />
 * 
 * @features
 * - Títulos dinámicos por página
 * - Diseño responsivo con useResponsive
 * - Integración con HeaderContext
 * - Estilos consistentes con el sistema de diseño
 */
export const Header: React.FC<HeaderProps> = ({ title }) => {
  const responsive = useResponsive();
  const { header } = useHeader();

  return (
    <header className="bg-white">
      {/* SearchBar primero */}
      <div className="bg-white py-2">
        <div className={`${responsive.container}`}>
          <div className="flex justify-center items-center">
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* Título después */}
      <div className={`${responsive.container} py-4`}>
        <div className="flex justify-center">
          <h1 className="text-[#585D8A] font-bold mb-4 w-[763px] h-[46px] text-2xl leading-[46px] text-center">
            {header.title || title || 'scala'}
          </h1>
        </div>
      </div>
    </header>
  );
};