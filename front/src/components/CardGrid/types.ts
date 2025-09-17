import type { CardConfig } from '../../constants';

export interface CardGridProps {
  cards: CardConfig[];
  onCardClick: (card: CardConfig) => void;
  className?: string;
  columns?: number; // ← Añade esta línea
}