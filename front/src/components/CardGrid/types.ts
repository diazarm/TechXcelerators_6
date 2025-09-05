import type { CardConfig } from '../../constants/cardConfigs';

export interface CardGridProps {
  cards: CardConfig[];
  onCardClick: (card: CardConfig) => void;
  className?: string;
}
