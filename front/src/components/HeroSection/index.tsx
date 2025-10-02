/**
 * Hero Section
 * 
 * Componente principal para secciones hero con layout de dos columnas.
 * Diseñado para contenido destacado con imagen y texto descriptivo.
 */

import React from "react";
import { useScreenSize } from "../../context";
import { COLOR_CLASSES } from "../../constants";
import type { HeroSectionProps } from "./types";

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  description,
  showImage = true,
  children
}) => {
  const { dimensions, scale, getContainerForScreen } = useScreenSize();

  return (
    <section 
      className="bg-gray-50 overflow-hidden"
      style={{
        minHeight: `${scale(35)}vh`,
        borderRadius: dimensions.spacing.xl,
        marginTop: dimensions.spacing.xl,
        paddingTop: dimensions.spacing.xl,
        paddingBottom: dimensions.spacing.xl
      }}
    >
      <div className={`${getContainerForScreen()}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
              paddingLeft: dimensions.spacing.lg,
              paddingRight: dimensions.spacing.lg,
              paddingTop: dimensions.spacing.md,
              paddingBottom: dimensions.spacing.md
            }}
          >
            <div 
              className="mx-auto"
              style={{
                maxWidth: `${scale(500)}px`
              }}
            >
              <h1 
                className={`leading-tight font-bold ${COLOR_CLASSES.textPrimary}`}
                style={{ 
                  fontSize: dimensions.fontSize['3xl'],
                  marginBottom: dimensions.spacing.lg
                }}
              >
                {title || "¡Hola! ¡Bienvenido a Scala Learning!"}
              </h1>
              
              <p 
                className={`${COLOR_CLASSES.textSecondary} leading-relaxed`}
                style={{ 
                  fontSize: dimensions.fontSize.md,
                  marginBottom: dimensions.spacing.lg
                }}
              >
                {description || "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."}
              </p>
              
              {/* Botones debajo del texto Lorem ipsum */}
              {children && (
                <div 
                  className="flex flex-col sm:flex-row justify-between"
                  style={{ gap: `${scale(24)}px` }}
                >
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;