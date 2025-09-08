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
      {/* Campo de búsqueda con estilo de la imagen */}
      <div className="flex flex-col items-center">
        {/* Label "Buscar" */}
        <label className="text-[#5D5A88] text-sm font-medium mb-0 self-start">
          Buscar
        </label>
        
        {/* Search Bar Container */}
        <div ref={searchContainerRef} className="relative">
          <div 
            className="bg-white rounded-lg flex items-center px-4 py-3 border border-[#8C88B8]"
            style={{ width: '540px', height: '46px' }}
          >
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={openSearchModal}
              onKeyDown={onKeyDown}
              placeholder="" 
              className="flex-1 text-gray-700 font-medium outline-none border-none bg-transparent placeholder-gray-500"
            />
            
            {/* Iconos del lado derecho */}
            <div className="flex items-center space-x-2">
              {isSearchActive && (
                <button
                  onClick={clearSearch}
                  className="w-4 h-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
