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

  // Obtener dimensiones según el tamaño de la card - MEJORADO
  const getCardDimensions = () => {
    if (size === 'rectangular') {
      // Para rectangular, ser más flexible con las dimensiones
      return {
        width: '100%', // Usar ancho completo del contenedor grid
        height: 'auto', // Altura automática
        minHeight: `${scale(280)}px`, // Altura mínima escalada
        maxWidth: dimensions.card.rectangular // Ancho máximo controlado
      };
    }
    // Para small y medium mantener dimensiones fijas
    const dimension = dimensions.card[size];
    return {
      width: dimension,
      height: dimension
    };
  };

  // Obtener tamaño de icono según el tamaño de la card - AHORA RESPONSIVO
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return `${scale(20)}px`; // Iconos escalados para small
      case 'rectangular':
        return `${scale(24)}px`; // Iconos escalados para rectangular (reducido de 32px)
      case 'medium':
      default:
        return `${scale(28)}px`; // Iconos escalados para medium
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
        ${size === 'rectangular' ? 'min-h-0' : ''} // Permitir que las rectangulares se reduzcan
        ${className}
      `}
      style={{
        ...(image ? {
          backgroundImage: `url(${image})`,
          ...backgroundStyles
        } : {}),
        ...cardDimensions // Esto ahora incluye width, height, minHeight y maxWidth
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

      {/* HEADER FIJO - Ahora completamente responsivo */}
      <header 
        className="flex-shrink-0"
        style={{
          padding: `${scale(16)}px`,
          paddingBottom: `${scale(8)}px`,
          height: `${scale(60)}px`, // Altura consistente para todos los tamaños
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Contenido izquierdo */}
        <div className="relative z-10 flex items-center" style={{ gap: `${scale(8)}px` }}>
          {leftHeaderContent || (icon && <div style={{ fontSize: getIconSize() }}>{icon}</div>)}
        </div>
        
        {/* Contenido derecho */}
        <div className="relative z-10 flex items-center" style={{ gap: `${scale(8)}px` }}>
          {rightHeaderContent}
        </div>
      </header>

      {/* BODY FIJO - Ahora completamente responsivo */}
      <main 
        className="flex-grow flex flex-col justify-center"
        style={{
          padding: `${scale(16)}px`,
          paddingTop: `${scale(8)}px`,
          paddingBottom: `${scale(8)}px`,
          minHeight: `${scale(100)}px` // Altura mínima consistente
        }}
      >
        <h3 
          className={`
            ${image ? 'text-white font-bold' : COLOR_CLASSES.textPrimary} 
            font-bold relative z-10
            ${isMobile ? 'mb-2' : 'mb-3'}
          `}
          style={{ fontSize: `${scale(18)}px` }} // Tamaño de fuente consistente
        >
          {title}
        </h3>
        
        {description && (
          <p 
            className={`
              ${image ? 'text-white font-light' : 'font-light'} 
              relative z-10
              ${isMobile ? 'mb-4' : 'mb-6'}
              line-clamp-3 // Limitar a 3 líneas
            `}
            style={{ 
              fontSize: `${scale(14)}px`, // Tamaño de fuente consistente
              color: image ? 'white' : '#9795B5',
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            {description}
          </p>
        )}
      </main>

      {/* FOOTER FIJO - Ahora completamente responsivo */}
      <footer 
        className="flex-shrink-0 relative z-20"
        style={{
          padding: `${scale(16)}px`,
          paddingTop: `${scale(8)}px`,
          height: `${scale(60)}px`, // Altura consistente para todos los tamaños
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
              minWidth: `${scale(100)}px`, // Ancho mínimo consistente
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