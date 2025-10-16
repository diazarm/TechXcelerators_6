/**
 * Hero Section
 * 
 * Componente principal para secciones hero con layout de dos columnas.
 * Diseñado para contenido destacado con imagen y texto descriptivo.
 */

import React from "react";
import { useScreenSize } from "../../context";
import { COLOR_CLASSES } from "../../constants";
import { OptimizedImage } from "../OptimizedImage";
import type { HeroSectionProps } from "./types";

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  description,
  showImage = true,
  children
}) => {
  const { scale, getContainerForScreen } = useScreenSize();

  return (
    <section 
      className="bg-gray-50 overflow-hidden"
      style={{
        minHeight: `${scale(280)}px`, // Altura fija escalada en lugar de vh
        borderRadius: `${scale(16)}px`,
        marginTop: `${scale(24)}px`,
        paddingTop: `${scale(24)}px`,
        paddingBottom: `${scale(24)}px`
      }}
    >
      <div className={`${getContainerForScreen()}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Columna Izquierda - Imagen */}
          {showImage && (
            <div className="w-full h-full relative">
              <OptimizedImage 
                src="/img/HomeHS.jpg" 
                alt="Home Hero Section" 
                className="w-full h-full object-cover"
                style={{ borderRadius: `${scale(16)}px` }}
                loading="eager"
              />
              <div 
                className="absolute inset-0 bg-black/30"
                style={{ borderRadius: `${scale(16)}px` }}
              ></div>
            </div>
          )}

          {/* Columna Derecha - Contenido */}
          <div 
            className="bg-gray-50 flex flex-col justify-center"
            style={{
              paddingLeft: `${scale(24)}px`,
              paddingRight: `${scale(24)}px`,
              paddingTop: `${scale(16)}px`,
              paddingBottom: `${scale(16)}px`
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
                  fontSize: `${scale(28)}px`,
                  marginBottom: `${scale(24)}px`
                }}
              >
                {title || "¡Hola! ¡Bienvenido a Scala Learning!"}
              </h1>
              
              <p 
                className={`${COLOR_CLASSES.textSecondary} leading-relaxed`}
                style={{ 
                  fontSize: `${scale(16)}px`,
                  marginBottom: `${scale(24)}px`
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