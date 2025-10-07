import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { getCardConfig } from '../constants';

import type { CardConfig } from '../constants';


type PageType = 'dashboard' | 'gobernanza' | 'alianza' | 'iniciativas';


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
  const { user } = useAuth();

  const cards = useMemo(() => {
    const baseCards = getCardConfig(pageType);

    // Mostrar acciones (iconos de la derecha) solo para admin o director en la página Alianza
    if (pageType === 'alianza') {
      const canSeeActions = Boolean(user?.isAdmin || user?.role === 'director');
      return baseCards.map((card) => ({
        ...card,
        rightHeaderContent: canSeeActions ? card.rightHeaderContent : undefined,
      }));
    }

    return baseCards;
  }, [pageType, user?.isAdmin, user?.role]);

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