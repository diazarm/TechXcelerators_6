import React from 'react';
import { ArrowRight } from 'react-feather';
import { Button } from '../Button';
import { useResponsiveImage } from '../../hooks';
import { useScreenSize } from '../../context';
import { COLOR_CLASSES } from '../../constants';
import type { CardConfig } from '../../constants';

interface GalleryCardProps {
  card: CardConfig;
  onCardClick: (card: CardConfig) => void;
}

/**
 * Componente GalleryCard específico para la galería
 * 
 * Es una versión modificada del Card que es clickeable en toda su superficie
 * para navegación externa, pero mantiene la funcionalidad de iconos.
 */
const GalleryCard: React.FC<GalleryCardProps> = ({
  card,
  onCardClick
}) => {
  const { isMobile, dimensions, scale } = useScreenSize();
  
  // Hook de responsividad para imágenes
  const { backgroundStyles } = useResponsiveImage({
    type: 'card',
    aspectRatio: '4/3',
    responsive: true
  });

  // Obtener dimensiones para cards small
  const getCardDimensions = () => {
    const dimension = dimensions.card.small;
    return {
      width: dimension,
      height: dimension
    };
  };

  const getIconSize = () => {
    return scale(24);
  };

  const shouldShowButton = () => {
    return false; // Las cards de galería no tienen botón
  };

  const cardDimensions = getCardDimensions();

  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <div 
      className={`
        ${card.image ? 'relative overflow-hidden cursor-pointer' : 'bg-white border border-gray-100 hover:border-gray-200 cursor-pointer'}
        rounded-2xl shadow-sm hover:shadow-md transition-all duration-300
        flex flex-col h-full
        ${!card.isActive ? 'opacity-50' : ''}
      `}
      style={{
        ...(card.image ? {
          backgroundImage: `url(${card.image})`,
          ...backgroundStyles
        } : {}),
        width: cardDimensions.width,
        height: cardDimensions.height
      }}
      onClick={handleCardClick}
    >
      {/* Overlay con opacidad si hay imagen */}
      {card.image && (
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
          height: `${scale(60)}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Contenido izquierdo */}
        <div className="relative z-10" style={{ transform: `scale(${scale(1)})` }}>
          {card.leftHeaderContent || (card.icon && <div style={{ fontSize: getIconSize() }}>{card.icon}</div>)}
        </div>
        
        {/* Contenido derecho */}
        <div className="relative z-10 flex items-center" style={{ gap: `${scale(8)}px`, transform: `scale(${scale(1)})` }}>
          {card.rightHeaderContent}
        </div>
      </header>

      {/* BODY FIJO - Siempre en la misma posición */}
      <main 
        className="flex-grow flex flex-col justify-center"
        style={{
          padding: `${scale(24)}px`,
          paddingTop: `${scale(8)}px`,
          paddingBottom: `${scale(8)}px`,
          minHeight: `${scale(80)}px`
        }}
      >
        <h3 
          className={`
            ${card.image ? 'text-white font-bold' : COLOR_CLASSES.textPrimary} 
            font-bold relative z-10
            ${isMobile ? 'mb-2' : 'mb-3'}
          `}
          style={{ fontSize: `${scale(20)}px` }}
        >
          {card.title}
        </h3>
        <p 
          className={`
            ${card.image ? 'text-white/90' : 'text-gray-600'} 
            relative z-10 leading-relaxed
          `}
          style={{ fontSize: `${scale(14)}px` }}
        >
          {card.description}
        </p>
      </main>

      {/* FOOTER FIJO - Siempre en la misma posición */}
      <footer 
        className="flex-shrink-0"
        style={{
          padding: `${scale(16)}px`,
          paddingTop: `${scale(8)}px`,
          height: shouldShowButton() ? `${scale(60)}px` : `${scale(40)}px`
        }}
      >
        {/* Botón solo si no es card small */}
        {shouldShowButton() && (
          <Button
            variant="primary"
            size="xs"
            onClick={() => {
              onCardClick(card);
            }}
            iconRight={<ArrowRight className="w-4 h-4" />}
            style={{ 
              minWidth: `${scale(110)}px`,
              opacity: 1,
              position: 'relative',
              zIndex: 10
            }}
          >
            Ir
          </Button>
        )}
      </footer>
    </div>
  );
};

export default GalleryCard;
