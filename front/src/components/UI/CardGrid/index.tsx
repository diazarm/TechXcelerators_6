import React from 'react';
import Card from '../Card';
import { useScreenSize } from '../../../context';
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
  columns = 3, // Valor por defecto
  defaultCardSize = 'medium'
}) => {
  const { getGapForScreen } = useScreenSize();

  // Determinar la clase de columnas basada en el parámetro
const getGridColumnsClass = () => {
  switch (columns) {
    case 2:
      return 'grid-cols-1 lg:grid-cols-2'; // Cambiar md: por lg: para mejor responsividad
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
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          icon={card.icon}
          leftHeaderContent={card.leftHeaderContent}
          rightHeaderContent={card.rightHeaderContent}
          image={card.image}
          onButtonClick={() => onCardClick(card)}
          isActive={card.isActive}
          size={defaultCardSize}
        />
      ))}
    </div>
  );
};

export default CardGrid;