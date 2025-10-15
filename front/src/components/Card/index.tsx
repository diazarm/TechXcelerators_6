import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'react-feather';
import { Button } from '../Button';
import { useResponsiveImage } from '../../hooks';
import { useScreenSize } from '../../context';
import { COLOR_CLASSES } from '../../constants';
import type { CardProps } from './types';

/**
 * Componente Card reutilizable con diseño consistente y responsivo
 * @param title - Título de la card
 * @param description - Descripción de la card
 * @param icon - Icono opcional (React node)
 * @param onButtonClick - Función al hacer click en el botón
 * @param className - Clases CSS adicionales
 */
const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  leftHeaderContent,
  rightHeaderContent,
  image,
  onButtonClick,
  className = "",
  isActive = true,
  size = 'medium'
}) => {
  const { isMobile, dimensions, scale } = useScreenSize();
  
  // Hook de responsividad para imágenes
  const { backgroundStyles } = useResponsiveImage({
    type: 'card',
    aspectRatio: '4/3',
    responsive: true
  });

  // Estado para manejar la imagen con WebP fallback
  const [imageSrc, setImageSrc] = useState(image);

  // Intentar cargar WebP si hay imagen
  useEffect(() => {
    if (!image) return;

    // Generar ruta WebP
    const getWebPPath = (originalSrc: string): string => {
      const lastDotIndex = originalSrc.lastIndexOf('.');
      if (lastDotIndex === -1) return originalSrc + '.webp';
      return originalSrc.substring(0, lastDotIndex) + '.webp';
    };

    const webpSrc = getWebPPath(image);

    // Intentar cargar WebP primero
    const img = new Image();
    img.onload = () => {
      // WebP existe y se cargó correctamente
      setImageSrc(webpSrc);
    };
    img.onerror = () => {
      // WebP no existe o falló, usar original
      setImageSrc(image);
    };
    img.src = webpSrc;
  }, [image]);

  // Obtener dimensiones según el tamaño de la card
  const getCardDimensions = () => {
    if (size === 'rectangular') {
      // En móvil: cards rectangulares más pequeñas pero manteniendo proporción
      if (isMobile) {
        return {
          width: `${320}px`, // Fijo en móvil para evitar conflictos
          height: `${200}px` // Fijo en móvil para evitar conflictos
        };
      }
      // En desktop: cards rectangulares escaladas proporcionalmente
      // Base: 480x280px (ratio 1.71:1)
      return {
        width: dimensions.card.rectangular,
        height: `${scale(280)}px` // Escala proporcionalmente con el ancho
      };
    }
    // Para small y medium
    const dimension = dimensions.card[size];
    return {
      width: dimension,
      height: dimension
    };
  };

  // Obtener tamaño de icono según el tamaño de la card
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return `20px`; // Iconos más pequeños para cards small (fijo)
      case 'rectangular':
        return `32px`; // Iconos normales para rectangular (fijo)
      case 'medium':
      default:
        return `32px`; // Iconos normales para medium (fijo)
    }
  };

  // Determinar si mostrar botón según el tamaño
  const shouldShowButton = () => {
    return size !== 'small'; // Cards small no tienen botón
  };

  const cardDimensions = getCardDimensions();

  return (
    <div 
      className={`
        ${image ? 'relative overflow-hidden' : 'bg-white border border-gray-100 hover:border-gray-200'}
        rounded-2xl shadow-sm hover:shadow-md transition-all duration-300
        flex flex-col h-full
        ${!isActive ? 'opacity-50' : ''}
        ${size === 'small' && onButtonClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        ...(image ? {
          backgroundImage: `url(${imageSrc})`,
          ...backgroundStyles
        } : {}),
        width: cardDimensions.width,
        height: cardDimensions.height
      }}
      onClick={size === 'small' && onButtonClick ? onButtonClick : undefined}
      role={size === 'small' && onButtonClick ? 'button' : undefined}
      tabIndex={size === 'small' && onButtonClick ? 0 : undefined}
    >
      {/* Overlay con opacidad si hay imagen */}
      {image && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
        />
      )}

      {/* HEADER FIJO - Siempre reserva el mismo espacio */}
      <header 
        className="flex-shrink-0"
        style={{
          padding: `${scale(16)}px`,
          paddingBottom: `${scale(8)}px`,
          height: size === 'rectangular' && isMobile ? `60px` : `${scale(80)}px`, // Fijo en móvil rectangular
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Contenido izquierdo */}
        <div className="relative z-10" style={{ transform: `scale(${scale(1)})` }}>
          {leftHeaderContent || (icon && <div style={{ fontSize: getIconSize() }}>{icon}</div>)}
        </div>
        
        {/* Contenido derecho */}
        <div className="relative z-10 flex items-center" style={{ gap: `${scale(8)}px`, transform: `scale(${scale(1)})` }}>
          {rightHeaderContent}
        </div>
      </header>

      {/* BODY FIJO - Siempre en la misma posición */}
      <main 
        className="flex-grow flex flex-col justify-center"
        style={{
          padding: `${scale(24)}px`,
          paddingTop: `${scale(8)}px`,
          paddingBottom: `${scale(8)}px`,
          minHeight: size === 'rectangular' && isMobile ? `80px` : `${scale(120)}px` // Fijo en móvil rectangular
        }}
      >
        <h3 
          className={`
            ${image ? 'text-white font-bold' : COLOR_CLASSES.textPrimary} 
            font-bold relative z-10
            ${isMobile ? 'mb-2' : 'mb-3'}
          `}
          style={{ fontSize: `${scale(20)}px` }}
        >
          {title}
        </h3>
        
        {description && (
          <p 
            className={`
              ${image ? 'text-white font-light' : 'font-light'} 
              relative z-10
              ${isMobile ? 'mb-4' : 'mb-6'}
            `}
            style={{ 
              fontSize: `${scale(15)}px`,
              color: image ? 'white' : '#9795B5',
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            {description}
          </p>
        )}
      </main>

      {/* FOOTER FIJO - Siempre reserva el mismo espacio */}
      <footer 
        className="flex-shrink-0 relative z-20"
        style={{
          padding: `${scale(16)}px`,
          paddingTop: `${scale(8)}px`,
          height: size === 'rectangular' && isMobile ? `60px` : `${scale(80)}px`, // Fijo en móvil rectangular
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Badge sutil "No disponible" */}
        {!isActive && (
          <span 
            className="text-red-600 font-medium text-xs"
            style={{ fontSize: `${scale(11)}px` }}
          >
            No disponible
          </span>
        )}
        
        {/* Spacer si la card está activa */}
        {isActive && <div />}
        
        {/* Botón solo si no es card small */}
        {shouldShowButton() && (
          <Button
            variant="primary"
            size="xs"
            onClick={onButtonClick}
            iconRight={<ArrowRight className="w-4 h-4" />}
            style={{ 
              minWidth: `${scale(110)}px`,
              opacity: 1,
              position: 'relative',
              zIndex: 30
            }}
          >
            Ir
          </Button>
        )}
      </footer>
    </div>
  );
};

export default Card;
