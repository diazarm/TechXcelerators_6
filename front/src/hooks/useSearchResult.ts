import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_TO_SECTION_MAP } from '../constants';
import type { SearchResult } from '../types';

/**
 * Hook personalizado para manejar la lógica del navbar
 * Incluye manejo de menú móvil, búsqueda y navegación por teclado
 */
export const useNavbar = () => {
  const navigate = useNavigate();
  
  // Estados del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Estados de búsqueda
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  // Referencias
  const searchContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Maneja el toggle del menú móvil
   */
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  /**
   * Cierra el menú móvil
   */
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  /**
   * Maneja la navegación por teclado en la búsqueda
   */
  const handleKeyDown = useCallback((
    e: React.KeyboardEvent,
    isSearchActive: boolean,
    results: SearchResult[],
    onResultSelect: (result: SearchResult) => void,
    clearSearch: () => void
  ) => {
    if (!isSearchActive) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          onResultSelect(results[selectedIndex]);
        }
        break;
      
      case 'Escape':
        e.preventDefault();
        clearSearch();
        setSelectedIndex(-1);
        break;
    }
  }, [selectedIndex]);

  /**
   * Maneja la selección de un resultado de búsqueda
   */
  const handleResultSelect = useCallback(async (
    result: SearchResult,
    clearSearch: () => void
  ) => {
    // Caso 1: Recurso con múltiples links → Mostrar modal de selección
    if (result.category === 'Recurso' && result.linksCount && result.linksCount > 1) {
      try {
        // Obtener el recurso completo desde el backend
        const { resourceService } = await import('../services/resourceService');
        const fullResource = await resourceService.getResourceById(result.id);
        
        if (!fullResource) {
          return;
        }

        // Obtener alianzas y mostrar modal
        const { getAlliances, filterAlliances, showAllianceSelectionModal } = await import('../services/allianceNavigationService');
        const alliances = await getAlliances();
        const filteredAlliances = filterAlliances(alliances);
        
        if (filteredAlliances.length > 0) {
          await showAllianceSelectionModal(filteredAlliances, fullResource);
        }
        
        // Limpiar búsqueda y cerrar modal
        clearSearch();
        setSelectedIndex(-1);
        setShowSearchModal(false);
        return;
      } catch (error) {
        console.error('Error al cargar recurso:', error);
        // Si falla, continuar con el flujo normal
      }
    }

    // Caso 2: Resultado con URL → Abrir en nueva pestaña
    if (result.url) {
      window.open(result.url, '_blank');
      clearSearch();
      setSelectedIndex(-1);
      setShowSearchModal(false);
      return;
    }

    // Caso 3: Navegación interna
    let targetPath = '/dashboard';
    
    switch (result.category) {
      case 'Alianza':
        targetPath = '/alianza';
        break;
      
      case 'Recurso':
        targetPath = '/dashboard';
        break;
      
      case 'Sección': {
        // Mapeo directo: de sectionId a ruta usando el mapeo centralizado
        const sectionRoute = Object.entries(ROUTE_TO_SECTION_MAP).find(
          ([, config]) => config.sectionId === result.id
        );
        targetPath = sectionRoute ? sectionRoute[0] : '/dashboard';
        break;
      }
      
      default:
        targetPath = '/dashboard';
        break;
    }
    
    navigate(targetPath);
    clearSearch();
    setSelectedIndex(-1);
    setShowSearchModal(false);
  }, [navigate]);

  /**
   * Abre el modal de búsqueda
   */
  const openSearchModal = useCallback(() => {
    setShowSearchModal(true);
  }, []);

  /**
   * Cierra el modal de búsqueda
   */
  const closeSearchModal = useCallback(() => {
    setShowSearchModal(false);
  }, []);

  /**
   * Resetea el índice seleccionado
   */
  const resetSelectedIndex = useCallback(() => {
    setSelectedIndex(-1);
  }, []);

  /**
   * Maneja clicks fuera del componente de búsqueda
   */
  const handleClickOutside = useCallback((
    event: MouseEvent,
    clearSearch: () => void
  ) => {
    if (
      searchContainerRef.current && 
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      clearSearch();
      setSelectedIndex(-1);
    }
  }, []);

  /**
   * Effect para detectar clicks fuera del componente de búsqueda
   * Este effect debe ser llamado directamente en el componente
   */
  const useClickOutsideEffect = (
    isSearchActive: boolean,
    clearSearch: () => void
  ) => {
    useEffect(() => {
      const handleClick = (event: MouseEvent) => 
        handleClickOutside(event, clearSearch);

      // Solo agregar listener si la búsqueda está activa
      if (isSearchActive) {
        document.addEventListener('mousedown', handleClick);
      }

      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }, [isSearchActive, clearSearch]);
  };

  return {
    // Estados
    isMenuOpen,
    selectedIndex,
    showSearchModal,
    
    // Referencias
    searchContainerRef,
    
    // Funciones del menú
    handleMenuToggle,
    closeMenu,
    
    // Funciones de búsqueda
    handleKeyDown,
    handleResultSelect,
    openSearchModal,
    closeSearchModal,
    resetSelectedIndex,
    
    // Effects
    useClickOutsideEffect,
  };
};
