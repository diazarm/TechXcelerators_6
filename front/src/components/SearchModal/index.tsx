import React from 'react';
import { useComponentDimensions } from '../../hooks';
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
  const dimensions = useComponentDimensions();
  
  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <div className="bg-white rounded-lg shadow-xl w-full max-h-[60vh] overflow-hidden border border-gray-200">
        {/* Header del modal */}
        <div 
          className="bg-[#5D5A88] flex items-center justify-between"
          style={{
            paddingLeft: dimensions.spacing.md,
            paddingRight: dimensions.spacing.md,
            paddingTop: dimensions.spacing.sm,
            paddingBottom: dimensions.spacing.sm
          }}
        >
          <div>
            <h3 
              className="text-white font-bold"
              style={{ fontSize: dimensions.fontSize.lg }}
            >
              Resultados de búsqueda
            </h3>
            <p 
              className="text-[#A4A9C2]"
              style={{ fontSize: dimensions.fontSize.sm }}
            >
              {results.length} resultados para '{searchQuery}'
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#FF6E00] transition-colors rounded-full bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20"
            style={{
              padding: dimensions.spacing.xs
            }}
            aria-label="Cerrar modal de búsqueda"
          >
            <svg 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{
                width: dimensions.spacing.md,
                height: dimensions.spacing.md
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="overflow-y-auto max-h-[calc(60vh-80px)]">
          {results.length > 0 ? (
            <div style={{ paddingTop: dimensions.spacing.xs, paddingBottom: dimensions.spacing.xs }}>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`cursor-pointer border-b border-gray-200 last:border-b-0 ${
                    index === selectedIndex 
                      ? 'bg-[#5D5A88]' 
                      : 'hover:bg-gray-50'
                  } transition-colors duration-200`}
                  style={{
                    paddingLeft: dimensions.spacing.md,
                    paddingRight: dimensions.spacing.md,
                    paddingTop: dimensions.spacing.sm,
                    paddingBottom: dimensions.spacing.sm
                  }}
                  onClick={() => onResultSelect(result)}
                >
                  <div 
                    className="flex items-start"
                    style={{ gap: dimensions.spacing.sm }}
                  >
                    {/* Indicador visual */}
                    <div 
                      className={`rounded-full mt-2 flex-shrink-0 ${
                        index === selectedIndex ? 'bg-white' : 'bg-[#FF6E00]'
                      }`}
                      style={{
                        width: dimensions.spacing.xs,
                        height: dimensions.spacing.xs
                      }}
                    ></div>
                    
                    {/* Contenido del resultado */}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className={`font-semibold truncate ${
                          index === selectedIndex ? 'text-white' : 'text-[#5D5A88]'
                        }`}
                        style={{ fontSize: dimensions.fontSize.md }}
                      >
                        {result.title}
                      </h4>
                      
                      <p 
                        className={`line-clamp-2 ${
                          index === selectedIndex ? 'text-[#A4A9C2]' : 'text-[#827896]'
                        }`}
                        style={{ 
                          fontSize: dimensions.fontSize.sm,
                          marginTop: dimensions.spacing.xs
                        }}
                      >
                        {result.description}
                      </p>
                      
                      {/* Badges y metadatos */}
                      <div 
                        className="flex items-center flex-wrap"
                        style={{ 
                          gap: dimensions.spacing.xs,
                          marginTop: dimensions.spacing.md
                        }}
                      >
                        <span 
                          className={`rounded-full font-medium ${
                            index === selectedIndex 
                              ? 'bg-white text-[#5D5A88]' 
                              : 'bg-[#FF6E00] text-white'
                          }`}
                          style={{
                            fontSize: dimensions.fontSize.xs,
                            paddingLeft: dimensions.spacing.md,
                            paddingRight: dimensions.spacing.md,
                            paddingTop: dimensions.spacing.xs,
                            paddingBottom: dimensions.spacing.xs
                          }}
                        >
                          {result.category}
                        </span>
                        
                        <span 
                          className={`rounded-full font-medium ${
                            index === selectedIndex 
                              ? 'bg-white text-[#5D5A88]' 
                              : 'bg-[#5D5A88] text-white'
                          }`}
                          style={{
                            fontSize: dimensions.fontSize.xs,
                            paddingLeft: dimensions.spacing.md,
                            paddingRight: dimensions.spacing.md,
                            paddingTop: dimensions.spacing.xs,
                            paddingBottom: dimensions.spacing.xs
                          }}
                        >
                          {result.type}
                        </span>
                        
                        <span 
                          className={`${
                            index === selectedIndex ? 'text-[#A4A9C2]' : 'text-[#827896]'
                          }`}
                          style={{ fontSize: dimensions.fontSize.xs }}
                        >
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
            <div 
              className="text-center"
              style={{
                paddingLeft: dimensions.spacing.md,
                paddingRight: dimensions.spacing.md,
                paddingTop: dimensions.spacing['2xl'],
                paddingBottom: dimensions.spacing['2xl']
              }}
            >
              <svg 
                className="text-[#827896] mx-auto" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  width: dimensions.spacing['2xl'],
                  height: dimensions.spacing['2xl'],
                  marginBottom: dimensions.spacing.sm
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              <h4 
                className="font-semibold text-[#5D5A88]"
                style={{ 
                  fontSize: dimensions.fontSize.lg,
                  marginBottom: dimensions.spacing.xs
                }}
              >
                No se encontraron resultados
              </h4>
              <p 
                className="text-[#827896]"
                style={{ fontSize: dimensions.fontSize.sm }}
              >
                Intenta con otras palabras clave o verifica la ortografía
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
