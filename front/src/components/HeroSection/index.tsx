/**
 * Hero Section
 * 
 * Componente principal para secciones hero con layout de dos columnas.
 * Diseñado para contenido destacado con imagen y texto descriptivo.
 */

import React from "react";
import { useResponsive, useComponentDimensions } from "../../hooks";
import { COLOR_CLASSES } from "../../constants";
import type { HeroSectionProps } from "./types";


export const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  description,
  showImage = true,
  children
}) => {
  const responsive = useResponsive();
  const dimensions = useComponentDimensions();

  return (
    <section 
      className={`${responsive.grid.columns.two} bg-gray-50 overflow-hidden`}
      style={{
        minHeight: '60vh',
        borderRadius: dimensions.spacing.xl
      }}
    >
      {/* Columna Izquierda - Imagen */}
      {showImage && (
        <div className="w-full h-full relative">
          <img 
            src="/img/HomeHS.jpg" 
            alt="Home Hero Section" 
            className="w-full h-full object-cover"
            style={{ borderRadius: dimensions.spacing.xl }}
          />
          <div 
            className="absolute inset-0 bg-black/30"
            style={{ borderRadius: dimensions.spacing.xl }}
          ></div>
        </div>
      )}

      {/* Columna Derecha - Contenido */}
      <div 
        className="bg-gray-50 flex flex-col justify-center"
        style={{
          paddingLeft: dimensions.spacing.md,
          paddingRight: dimensions.spacing.md,
          paddingTop: dimensions.spacing.md,
          paddingBottom: dimensions.spacing.md
        }}
      >
        <div className="max-w-lg">
          <h1 
            className={`leading-tight font-bold ${COLOR_CLASSES.textPrimary}`}
            style={{ 
              fontSize: dimensions.fontSize['3xl'],
              marginBottom: dimensions.spacing.md
            }}
          >
            {title || "¡Hola! ¡Bienvenido a Scala Learning!"}
          </h1>
          
          <p 
            className={`${COLOR_CLASSES.textSecondary} leading-relaxed`}
            style={{ 
              fontSize: dimensions.fontSize.md,
              marginBottom: dimensions.spacing.md
            }}
          >
            {description || "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."}
          </p>
          
          {/* Botones debajo del texto Lorem ipsum */}
          {children && (
            <div 
              className="flex flex-col sm:flex-row justify-start"
              style={{ gap: dimensions.spacing.sm }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
