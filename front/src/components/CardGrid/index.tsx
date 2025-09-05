import React from 'react';
import Card from '../Card';
import { useResponsive } from '../../hooks';
import type { CardGridProps } from './types';

/**
 * Componente CardGrid para mostrar una grilla de cards
 * @param cards - Array de configuración de cards
 * @param onCardClick - Función para manejar clicks en las cards
 * @param className - Clases CSS adicionales
 */
const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onCardClick,
  className = ""
}) => {
  const responsive = useResponsive();

  return (
    <div className={`
      ${responsive.grid.columns.three}
      ${responsive.grid.gap.medium}
      ${className}
    `}>
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          icon={card.icon}
          onButtonClick={() => onCardClick(card)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
