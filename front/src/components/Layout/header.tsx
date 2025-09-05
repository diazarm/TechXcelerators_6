import React from "react";
import { useResponsive } from "../../hooks";
import type { HeaderProps } from "./types";

/**
 * Header Dinámico
 * 
 * Componente que renderiza títulos y subtítulos dinámicos basados en la página actual.
 * Se integra con HeaderContext para obtener la configuración de cada página.
 * 
 * @example
 * <Header title="GOBERNANZA ESTRATÉGICA" subtitle="Gestión y coordinación de comités..." />
 * 
 * @features
 * - Títulos y subtítulos dinámicos por página
 * - Diseño responsivo con useResponsive
 * - Integración con HeaderContext
 * - Estilos consistentes con el sistema de diseño
 */
export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const responsive = useResponsive();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className={`${responsive.container} ${responsive.spacing.py.medium}`}>
        <div className="text-center">
          <h1 className={`${responsive.text.h1} text-[#585D8A] font-bold mb-4`}>
            {title || 'scala'}
          </h1>
          {subtitle && (
            <p className={`${responsive.text.body} text-gray-600 max-w-3xl mx-auto`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};