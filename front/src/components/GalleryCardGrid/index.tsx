import React from 'react';
import GalleryCard from '../GalleryCard';
import { useScreenSize } from '../../context';
import type { CardConfig } from '../../constants';

interface GalleryCardGridProps {
  cards: CardConfig[];
  onCardClick: (card: CardConfig) => void;
  className?: string;
  columns?: number;
}

/**
 * Componente GalleryCardGrid específico para la galería
 * 
 * Es una versión modificada del CardGrid que usa GalleryCard
 * para permitir navegación externa al hacer clic en toda la card.
 */
const GalleryCardGrid: React.FC<GalleryCardGridProps> = ({
  cards,
  onCardClick,
  className = "",
  columns = 3
}) => {
  const { getGapForScreen } = useScreenSize();

  // Determinar la clase de columnas basada en el parámetro
  const getGridColumnsClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 3:
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={`
      grid
      ${getGridColumnsClass()}
      ${getGapForScreen('medium')}
      ${className}
    `}>
      {cards.map((card) => (
        <GalleryCard
          key={card.id}
          card={card}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default GalleryCardGrid;
