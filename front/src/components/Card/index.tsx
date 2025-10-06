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
  leftHeaderContent,
  rightHeaderContent,
  image,
  onButtonClick,
  className = ""
}) => {
  const { isMobile, dimensions, scale } = useScreenSize();
  
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
        flex flex-col h-full
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
          className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
        />
      )}

      {/* HEADER FIJO - Siempre reserva el mismo espacio */}
      <header 
        className="flex-shrink-0"
        style={{
          padding: `${scale(16)}px`,
          paddingBottom: `${scale(8)}px`,
          height: `${scale(80)}px`, // ALTURA FIJA
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Contenido izquierdo */}
        <div className="relative z-10" style={{ transform: `scale(${scale(1)})` }}>
          {leftHeaderContent || (icon && <div>{icon}</div>)}
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
          minHeight: `${scale(120)}px`
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
              ${image ? 'text-white font-light' : COLOR_CLASSES.textSecondary} 
              relative z-10 font-light
              ${isMobile ? 'mb-4' : 'mb-6'}
            `}
            style={{ fontSize: `${scale(18)}px` }}
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
          height: `${scale(80)}px`, // ALTURA FIJA
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
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
      </footer>
    </div>
  );
};

export default Card;
