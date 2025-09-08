import React from 'react';
import { SearchModal } from '../SearchModal';
import { useSearch, useNavbar } from '../../hooks';
import { mockSearchData } from '../../Mock/MockSearchData';
import type { SearchResult } from '../../types/shared';

/**
 * Componente SearchBar reutilizable
 * 
 * Campo de búsqueda con modal de resultados que se puede usar en cualquier página
 */
const SearchBar: React.FC = () => {
  // Hook de búsqueda con datos mock
  const {
    searchQuery,
    results,
    handleSearchChange,
    clearSearch,
    isSearchActive
  } = useSearch(mockSearchData);

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
          <label className="absolute -top-2 left-4 bg-white px-2 text-[#5D5A88] text-sm font-medium z-10">
            Buscar
          </label>
          
          <div 
            className="bg-white rounded-[6px] flex items-center px-4 py-3 border-2 border-[#8C88B8]"
            style={{ width: '540px', height: '46px' }}
          >
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={openSearchModal}
              onKeyDown={onKeyDown}
              placeholder="" 
              className="flex-1 text-[#5D5A88] font-medium outline-none border-none bg-transparent placeholder-gray-500 text-base"
              style={{ 
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#5D5A88'
              }}
            />
            
            {/* Iconos del lado derecho */}
            <div className="flex items-center space-x-2">
              {isSearchActive && (
                <button
                  onClick={clearSearch}
                  className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* Triángulo hacia arriba */}
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
