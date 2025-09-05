import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Por ahora este hook está deshabilitado hasta que se implemente

export interface CardConfig {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

type PageType = 'dashboard';

interface UseCardsReturn {
  cards: CardConfig[];
  handleCardClick: (card: CardConfig) => void;
}

/**
 * Hook para manejar la configuración y comportamiento de las cards
 * @param pageType - Tipo de página ('home' | 'resources' | 'dashboard')
 * @returns Configuración de cards y función de click
 */
export const useCards = (pageType: PageType): UseCardsReturn => {
  const navigate = useNavigate();

  // TODO: Reemplazar con import real cuando se implemente cardConfigs.ts
  const cards = useMemo(() => {
    // Por ahora retorna array vacío hasta que se implemente
    return [];
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
