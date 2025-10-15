import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { getCardConfig, createMultipleIcons } from '../constants';
import { EyeOff, Edit2 } from 'react-feather';
import { handleAllianceCardClick } from '../services';
import { useResponsive } from './useResponsive';

import type { CardConfig } from '../constants';


type PageType = 'dashboard' | 'gobernanza' | 'alianza' | 'iniciativas' | 'galeria';


interface UseCardsProps {
  pageType: PageType;
  onEditClick?: (resourceName: string) => void;
  onDeleteClick?: (resourceName: string) => void;
}

interface UseCardsReturn {
  cards: CardConfig[];
  handleCardClick: (card: CardConfig) => void;
}

/**
 * Hook para manejar la configuración y comportamiento de las cards
 * @param props - Configuración del hook
 * @returns Configuración de cards y función de click
 */
export const useCards = ({ pageType, onEditClick, onDeleteClick }: UseCardsProps): UseCardsReturn => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { scale } = useResponsive();

  const cards = useMemo(() => {
    const baseCards = getCardConfig(pageType);

    // Mostrar acciones (iconos de la derecha) solo para admin o director en Alianza, Iniciativas y Galeria
    if (pageType === 'alianza' || pageType === 'iniciativas' || pageType === 'galeria') {
      const canSeeActions = Boolean(user?.isAdmin || user?.role === 'director');
      return baseCards.map((card) => {
        // Si el usuario puede ver acciones y la card tiene iconos, hacerlos clickeables
        if (canSeeActions && card.resourceName && card.rightHeaderContent) {
          return {
            ...card,
            rightHeaderContent: createMultipleIcons([
              { component: EyeOff, size: scale(18), color: '#5D5A88', withCircle: true, type: 'delete' },
              { component: Edit2, size: scale(18), color: '#5D5A88', withCircle: true, type: 'edit' }
            ], scale(8), 
            onEditClick ? () => onEditClick(card.resourceName!) : undefined, 
            onDeleteClick ? () => onDeleteClick(card.resourceName!) : undefined
            ),
          };
        }
        
        return {
          ...card,
          rightHeaderContent: canSeeActions ? card.rightHeaderContent : undefined,
        };
      });
    }

    return baseCards;
  }, [pageType, user?.isAdmin, user?.role, onEditClick, onDeleteClick, scale]);

  const handleCardClick = (card: CardConfig) => {
    if (card.href) {
      navigate(card.href);
    } else if (card.onClick) {
      card.onClick();
    } else if (card.sectionType) {
      // Manejar clicks de cards de alianza usando el servicio
      handleAllianceCardClick(card.sectionType, card.resourceName, card.showModal);
    }
  };

  return {
    cards,
    handleCardClick
  };
};