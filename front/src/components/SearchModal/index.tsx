import React from 'react';
import type { SearchModalProps } from './types';

/**
 * Modal flotante para mostrar resultados de búsqueda
 * 
 * @param props - Propiedades del componente
 * @returns Modal de búsqueda o null si no está abierto
 */
export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  results,
  searchQuery,
  selectedIndex,
  onResultSelect
}) => {
  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <div className="bg-white rounded-lg shadow-xl w-full max-h-[60vh] overflow-hidden border border-gray-200">
        {/* Header del modal */}
        <div className="bg-[#5D5A88] px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">Resultados de búsqueda</h3>
            <p className="text-[#A4A9C2] text-sm">
              {results.length} resultados para '{searchQuery}'
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#FF6E00] transition-colors p-2 rounded-full bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20"
            aria-label="Cerrar modal de búsqueda"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="overflow-y-auto max-h-[calc(60vh-80px)]">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`px-6 py-4 cursor-pointer border-b border-gray-200 last:border-b-0 ${
                    index === selectedIndex 
                      ? 'bg-[#5D5A88]' 
                      : 'hover:bg-gray-50'
                  } transition-colors duration-200`}
                  onClick={() => onResultSelect(result)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Indicador visual */}
                    <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                      index === selectedIndex ? 'bg-white' : 'bg-[#FF6E00]'
                    }`}></div>
                    
                    {/* Contenido del resultado */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold truncate ${
                        index === selectedIndex ? 'text-white' : 'text-[#5D5A88]'
                      }`}>
                        {result.title}
                      </h4>
                      
                      <p className={`text-sm mt-1 line-clamp-2 ${
                        index === selectedIndex ? 'text-[#A4A9C2]' : 'text-[#827896]'
                      }`}>
                        {result.description}
                      </p>
                      
                      {/* Badges y metadatos */}
                      <div className="flex items-center space-x-3 mt-3 flex-wrap gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          index === selectedIndex 
                            ? 'bg-white text-[#5D5A88]' 
                            : 'bg-[#FF6E00] text-white'
                        }`}>
                          {result.category}
                        </span>
                        
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          index === selectedIndex 
                            ? 'bg-white text-[#5D5A88]' 
                            : 'bg-[#5D5A88] text-white'
                        }`}>
                          {result.type}
                        </span>
                        
                        <span className={`text-xs ${
                          index === selectedIndex ? 'text-[#A4A9C2]' : 'text-[#827896]'
                        }`}>
                          {result.path}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Estado sin resultados */
            <div className="px-6 py-12 text-center">
              <svg className="w-16 h-16 text-[#827896] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              <h4 className="text-lg font-semibold text-[#5D5A88] mb-2">No se encontraron resultados</h4>
              <p className="text-[#827896] text-sm">
                Intenta con otras palabras clave o verifica la ortografía
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
