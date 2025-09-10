import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCardConfig } from '../constants/cardConfigs';
import type { CardConfig } from '../constants/cardConfigs';

type PageType = 'dashboard' | 'recursos' | 'gobernanza';

interface UseCardsReturn {
  cards: CardConfig[];
  handleCardClick: (card: CardConfig) => void;
}

/**
 * Hook para manejar la configuración y comportamiento de las cards
 * @param pageType - Tipo de página ('dashboard' | 'recursos' | 'gobernanza')
 * @returns Configuración de cards y función de click
 */
export const useCards = (pageType: PageType): UseCardsReturn => {
  const navigate = useNavigate();

  const cards = useMemo(() => {
    return getCardConfig(pageType);
  }, [pageType]);

  const handleCardClick = (card: CardConfig) => {
    if (card.href) {
      navigate(card.href);
    } else if (card.onClick) {
      card.onClick();
    }
  };

  return {
    cards,
    handleCardClick
  };
};
