import { useState, useRef, useEffect, useCallback } from 'react';
import type { SearchResult } from '../types';

/**
 * Hook personalizado para manejar la lógica del navbar
 * Incluye manejo de menú móvil, búsqueda y navegación por teclado
 */
export const useNavbar = () => {
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
  const handleResultSelect = useCallback((
    result: SearchResult,
    clearSearch: () => void
  ) => {
    // Aquí puedes navegar o hacer algo con el resultado
    clearSearch();
    setSelectedIndex(-1);
    setShowSearchModal(false);
  }, []);

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
