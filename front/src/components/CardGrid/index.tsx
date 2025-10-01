import React from 'react';
import Card from '../Card';
import { useResponsive } from '../../hooks';
import type { CardGridProps } from './types';

/**
 * Componente CardGrid para mostrar una grilla de cards
 * @param cards - Array de configuración de cards
 * @param onCardClick - Función para manejar clicks en las cards
 * @param className - Clases CSS adicionales
 * @param columns - Número de columnas (2, 3, 4) - Nueva prop
 */
const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onCardClick,
  className = "",
  columns = 3 // Valor por defecto
}) => {
  const responsive = useResponsive();

  // Determinar la clase de columnas basada en el parámetro
  const getGridColumnsClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 3:
      default:
        return responsive.grid.columns.three;
    }
  };

  return (
    <div className={`
      grid
      ${getGridColumnsClass()}
      ${responsive.grid.gap.medium}
      ${className}
    `}>
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          icon={card.icon}
          image={card.image}
          onButtonClick={() => onCardClick(card)}
        />
      ))}
    </div>
  );
};

export default CardGrid;