/**
 * Hero Section
 * 
 * Componente principal para secciones hero con layout de dos columnas.
 * Diseñado para contenido destacado con imagen y texto descriptivo.
 */

import React from "react";
import { useResponsive } from "../../hooks";
import { COLOR_CLASSES } from "../../constants";
import type { HeroSectionProps } from "./types";


export const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  description,
  showImage = true,
  children
}) => {
  const responsive = useResponsive();

  return (
    <section className={`${responsive.grid.columns.two} min-h-[60vh] bg-gray-50 rounded-[30px] overflow-hidden`}>
      {/* Columna Izquierda - Imagen */}
      {showImage && (
        <div className="w-full h-full relative">
          <img 
            src="/img/HomeHS.jpg" 
            alt="Home Hero Section" 
            className="w-full h-full object-cover rounded-[30px]"
          />
          <div className="absolute inset-0 bg-black/30 rounded-[30px]"></div>
        </div>
      )}

      {/* Columna Derecha - Contenido */}
      <div className="bg-gray-50 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="max-w-lg">
          <h1 className={`mb-4 sm:mb-6 leading-tight font-bold ${responsive.text.h1} ${COLOR_CLASSES.textPrimary}`}>
            {title || "¡Hola! ¡Bienvenido a Scala Learning!"}
          </h1>
          
          <p className={`${responsive.text.body} ${COLOR_CLASSES.textSecondary} leading-relaxed mb-6 sm:mb-8`}>
            {description || "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."}
          </p>
          
          {/* Botones debajo del texto Lorem ipsum */}
          {children && (
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
