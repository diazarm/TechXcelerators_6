/**
 * Hero Section
 * 
 * Componente principal para secciones hero con layout de dos columnas.
 * Diseñado para contenido destacado con imagen y texto descriptivo.
 */

import React from "react";
import { useResponsive } from "../../hooks";
import type { HeroSectionProps } from "./types";


export const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  description,
  showImage = true,
  children
}) => {
  const responsive = useResponsive();

  return (
    <section className={`${responsive.grid.columns.two} min-h-[60vh] bg-gray-50`}>
      {/* Columna Izquierda - Imagen */}
      {showImage && (
        <div className="w-full h-full relative">
          <img 
            src="/img/Landing.jpeg" 
            alt="Landing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      )}

      {/* Columna Derecha - Contenido */}
      <div className="bg-gray-50 flex flex-col justify-center px-12 py-16">
        <div className="max-w-lg">
          <h1 className="mb-6 leading-tight font-bold text-[56px] leading-[66px] tracking-normal text-[#5D5A88]">
            {title || "¡Hola! ¡Bienvenido a Scala Learning!"}
          </h1>
          
          <p className={`${responsive.text.body} text-[#827896] leading-relaxed mb-8`}>
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
