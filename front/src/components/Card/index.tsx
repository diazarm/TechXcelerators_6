import React from 'react';
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
  image,
  onButtonClick,
  className = ""
}) => {
  const { isMobile, isDesktop, isXLarge, isXXLarge, dimensions, scale } = useScreenSize();
  
  // Hook de responsividad para imágenes
  const { backgroundStyles } = useResponsiveImage({
    type: 'card',
    aspectRatio: '4/3',
    responsive: true
  });

  return (
    <div 
      className={`
        ${image ? 'relative overflow-hidden' : 'bg-white border border-gray-100 hover:border-gray-200'}
        rounded-2xl shadow-sm hover:shadow-md transition-all duration-300
        rounded-2xl
        shadow-sm
        ${isMobile ? 'p-4' : 'p-6'}
        flex flex-col
        ${className}
      `}
      style={{
        ...(image ? {
          backgroundImage: `url(${image})`,
          ...backgroundStyles
        } : {}),
        width: dimensions.card.medium,
        height: dimensions.card.medium
      }}
    >
      {/* Overlay con opacidad si hay imagen */}
      {image && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
        />
      )}

      {/* Icon - Solo mostrar si existe y no hay imagen */}
      {icon && !image && (
        <div 
          className="mb-4 relative"
          style={{
            top: dimensions.spacing.xs,
            left: dimensions.spacing.sm
          }}
        >
          {icon}
        </div>
      )}
      
      {/* Spacer para cards con imagen - Empuja el contenido hacia abajo */}
      {image && !icon && (
        <div 
          className="flex-grow"
          style={{ minHeight: dimensions.spacing.xl }}
        />
      )}
      
      {/* Title */}
      <h3 
        className={`
          ${image ? 'text-white font-bold' : COLOR_CLASSES.textPrimary} 
          font-semibold relative z-10
          ${isMobile ? 'mb-2' : 'mb-3'}
        `}
        style={{ fontSize: dimensions.fontSize.lg }}
      >
        {title}
      </h3>
      
      {/* Description */}
      <p 
        className={`
          ${image ? 'text-white font-semibold' : COLOR_CLASSES.textSecondary} 
          flex-grow relative z-10
          ${isMobile ? 'mb-4' : 'mb-6'}
        `}
        style={{ fontSize: dimensions.fontSize.sm }}
      >
        {description}
      </p>
      
      {/* Button - Posicionado en esquina inferior derecha */}
      <div className="flex justify-end mt-auto relative z-10">
        <Button
          variant="primary"
          size="xs"
          onClick={onButtonClick}
          iconRight={<ArrowRight className="w-4 h-4" />}
          style={{ minWidth: `${scale(110)}px` }}
        >
          Ir
        </Button>
      </div>
    </div>
  );
};

export default Card;
