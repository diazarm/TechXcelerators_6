import React from 'react';
import { SearchModal } from '../SearchModal';
import { useSearch, useNavbar } from '../../hooks';
import { useScreenSize } from '../../context';
import type { SearchResult } from '../../types/shared';

/**
 * Componente SearchBar reutilizable
 * 
 * Campo de búsqueda con modal de resultados que se puede usar en cualquier página
 */
const SearchBar: React.FC = () => {
  const { dimensions, scale, isMobile } = useScreenSize();
  
  // Hook de búsqueda - conectado al backend real
  const {
    searchQuery,
    results,
    handleSearchChange,
    clearSearch,
    isSearchActive,
    isLoading,
    error
  } = useSearch();

  // Hook personalizado para manejar la lógica del navbar
  const {
    selectedIndex,
    showSearchModal,
    searchContainerRef,
    handleKeyDown,
    handleResultSelect,
    openSearchModal,
    closeSearchModal,
    useClickOutsideEffect,
  } = useNavbar();

  // Wrapper para handleResultSelect que incluye clearSearch
  const onResultSelect = (result: SearchResult) => {
    handleResultSelect(result, clearSearch);
  };

  // Wrapper para handleKeyDown que incluye los parámetros necesarios
  const onKeyDown = (e: React.KeyboardEvent) => {
    handleKeyDown(e, isSearchActive, results, onResultSelect, clearSearch);
  };

  // Usar el effect del hook para clicks fuera del componente
  useClickOutsideEffect(isSearchActive, clearSearch);

  return (
    <>
      {/* Campo de búsqueda con estilo fieldset */}
      <div className="flex flex-col items-center">
        {/* Search Bar Container con fieldset effect */}
        <div ref={searchContainerRef} className="relative">
          {/* Label "Buscar" posicionado sobre el borde */}
          <label 
            className="absolute -top-2 left-4 bg-white text-[#5D5A88] font-medium z-10"
            style={{ 
              paddingLeft: dimensions.spacing.xs,
              paddingRight: dimensions.spacing.xs,
              fontSize: dimensions.fontSize.sm
            }}
          >
            Buscar
          </label>
          
          <div 
            className="bg-white flex items-center border-2 border-[#8C88B8]"
            style={{ 
              width: isMobile ? '100%' : `${scale(540)}px`, 
              maxWidth: isMobile ? '100%' : `${scale(540)}px`,
              height: `${scale(46)}px`,
              paddingLeft: dimensions.spacing.sm,
              paddingRight: dimensions.spacing.sm,
              paddingTop: dimensions.spacing.md,
              paddingBottom: dimensions.spacing.md,
              borderRadius: `${scale(6)}px`
            }}
          >
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={openSearchModal}
              onKeyDown={onKeyDown}
              placeholder="" 
              className="flex-1 text-[#5D5A88] font-medium outline-none border-none bg-transparent placeholder-gray-500"
              style={{ 
                fontSize: dimensions.fontSize.lg,
                lineHeight: '1.5',
                color: '#5D5A88'
              }}
            />
            
            {/* Iconos del lado derecho */}
            <div 
              className="flex items-center"
              style={{ gap: dimensions.spacing.xs }}
            >
              {isLoading && (
                <div 
                  className="animate-spin"
                  style={{ 
                    color: '#5D5A88',
                    fontSize: dimensions.fontSize.sm,
                    width: dimensions.spacing.sm,
                    height: dimensions.spacing.sm
                  }}
                >
                  ⟳
                </div>
              )}
              
              {error && !isLoading && (
                <div 
                  style={{ 
                    color: '#FF6E00',
                    fontSize: dimensions.fontSize.sm,
                    width: dimensions.spacing.sm,
                    height: dimensions.spacing.sm
                  }}
                  title={error}
                >
                  ⚠
                </div>
              )}
              
              {isSearchActive && !isLoading && (
                <button
                  onClick={clearSearch}
                  className="text-gray-600 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100 flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'transparent',
                    width: dimensions.spacing.md,
                    height: dimensions.spacing.md,
                    padding: dimensions.spacing.xs
                  }}
                >
                  <svg 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      width: dimensions.spacing.sm,
                      height: dimensions.spacing.sm
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* Triángulo hacia arriba */}
              <svg 
                className="text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  width: dimensions.spacing.sm,
                  height: dimensions.spacing.sm
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>
          
          {/* Modal de búsqueda */}
          <SearchModal
            isOpen={showSearchModal && isSearchActive}
            onClose={closeSearchModal}
            results={results}
            searchQuery={searchQuery}
            selectedIndex={selectedIndex}
            onResultSelect={onResultSelect}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
