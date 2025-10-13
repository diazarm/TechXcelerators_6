import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { galleryCards } from '../constants/galleryConfigs';
import { createMultipleIcons } from '../constants/iconFactory';
import { EyeOff, Edit2 } from 'react-feather';
import { useResponsive } from './useResponsive';

import type { CardConfig } from '../constants';

interface UseGalleryCardsProps {
  onEditClick?: (resourceName: string) => void;
  onDeleteClick?: (resourceName: string) => void;
}

interface UseGalleryCardsReturn {
  cards: CardConfig[];
  handleCardClick: (card: CardConfig) => void;
}

/**
 * Hook para manejar la configuración y comportamiento de las cards de galería
 * @param props - Configuración del hook
 * @returns Configuración de cards y función de click
 */
export const useGalleryCards = ({ onEditClick, onDeleteClick }: UseGalleryCardsProps): UseGalleryCardsReturn => {
  const { user } = useAuth();
  const { scale } = useResponsive();

  const cards = useMemo(() => {
    // Mostrar acciones (iconos de la derecha) solo para admin o director
    const canSeeActions = Boolean(user?.isAdmin || user?.role === 'director');
    
    return galleryCards.map((card) => {
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
  }, [user?.isAdmin, user?.role, onEditClick, onDeleteClick, scale]);

  const handleCardClick = (card: CardConfig) => {
    // Si la card tiene href (navegación externa), abrir en nueva pestaña
    if (card.href) {
      // Verificar si es una URL externa
      if (card.href.startsWith('http://') || card.href.startsWith('https://')) {
        window.open(card.href, '_blank', 'noopener,noreferrer');
      } else {
        // Si es una ruta interna, usar navigate (aunque no debería ser el caso en galería)
        window.location.href = card.href;
      }
    } else if (card.onClick) {
      card.onClick();
    }
  };

  return {
    cards,
    handleCardClick
  };
};
