import React, { useEffect, useRef } from 'react';
import { useScreenSize } from '../../../context';
import { useEscapeKey } from '../../../hooks';
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
  onResultSelect,
  isLoading = false,
  error = null
}) => {
  const { dimensions, scale } = useScreenSize();
  const selectedResultRef = useRef<HTMLDivElement>(null);
  
  // Hook de accesibilidad - Solo Escape key, sin focus trap
  // El focus debe permanecer en el input del SearchBar
  useEscapeKey(isOpen, onClose);
  
  // Scroll automático al resultado seleccionado cuando cambia selectedIndex
  useEffect(() => {
    if (selectedIndex >= 0 && selectedResultRef.current) {
      selectedResultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);
  
  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-x-hidden">
      <div 
        role="listbox"
        aria-labelledby="search-modal-title"
        className="bg-white rounded-lg shadow-xl w-full overflow-hidden border border-gray-200"
        style={{ maxHeight: `${scale(60)}vh`, maxWidth: '100%' }}
      >
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
              id="search-modal-title"
              className="text-white font-bold"
              style={{ fontSize: dimensions.fontSize.lg }}
            >
              Resultados de búsqueda
            </h3>
            <p 
              className="text-[#B8BCC8]"
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
        <div 
          className="overflow-y-auto overflow-x-hidden"
          style={{ maxHeight: `calc(${scale(60)}vh - ${scale(80)}px)` }}
        >
          {/* Estado de carga */}
          {isLoading && (
            <div 
              className="flex items-center justify-center py-8"
              style={{
                paddingTop: dimensions.spacing.xl,
                paddingBottom: dimensions.spacing.xl
              }}
            >
              <div 
                className="animate-spin mr-3"
                style={{ 
                  color: '#5D5A88',
                  fontSize: dimensions.fontSize.lg
                }}
              >
                ⟳
              </div>
              <span 
                className="text-[#5D5A88] font-medium"
                style={{ fontSize: dimensions.fontSize.md }}
              >
                Buscando...
              </span>
            </div>
          )}

          {/* Estado de error */}
          {error && !isLoading && (
            <div 
              className="flex items-center justify-center py-8"
              style={{
                paddingTop: dimensions.spacing.xl,
                paddingBottom: dimensions.spacing.xl
              }}
            >
              <div 
                className="mr-3"
                style={{ 
                  color: '#FF6E00',
                  fontSize: dimensions.fontSize.lg
                }}
              >
                ⚠
              </div>
              <div className="text-center">
                <p 
                  className="text-[#FF6E00] font-medium mb-1"
                  style={{ fontSize: dimensions.fontSize.md }}
                >
                  Error en la búsqueda
                </p>
                <p 
                  className="text-gray-600 text-sm"
                  style={{ fontSize: dimensions.fontSize.sm }}
                >
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Resultados */}
          {!isLoading && !error && results.length > 0 ? (
            <div 
              className="overflow-x-hidden"
              style={{ paddingTop: dimensions.spacing.xs, paddingBottom: dimensions.spacing.lg }}
            >
              {results.map((result, index) => (
                <div
                  key={result.id}
                  ref={index === selectedIndex ? selectedResultRef : null}
                  className={`group cursor-pointer relative bg-white border-b border-gray-200 last:border-b-0 ${
                    index === selectedIndex 
                      ? 'border-[#5D5A88]/50 shadow-lg shadow-[#5D5A88]/5 bg-gradient-to-br from-[#F5F4F8] to-[#E8E6F0]' 
                      : 'hover:border-[#5D5A88]/50 hover:shadow-lg hover:shadow-[#5D5A88]/5 hover:bg-gradient-to-br hover:from-[#F5F4F8] hover:to-[#E8E6F0]'
                  } transition-all duration-200 transform ${
                    index === selectedIndex ? 'scale-[1.01]' : 'hover:scale-[1.01]'
                  }`}
                  style={{
                    paddingLeft: dimensions.spacing.md,
                    paddingRight: dimensions.spacing.md,
                    paddingTop: dimensions.spacing.sm,
                    paddingBottom: dimensions.spacing.sm,
                    maxWidth: '100%',
                    overflow: 'hidden'
                  }}
                  onClick={() => onResultSelect(result)}
                >
                  <div 
                    className="flex items-start min-w-0"
                    style={{ gap: dimensions.spacing.sm }}
                  >
                    {/* Indicador visual */}
                    <div 
                      className={`rounded-full mt-2 flex-shrink-0 ${
                        index === selectedIndex ? 'bg-[#5D5A88]' : 'bg-[#5D5A88]'
                      }`}
                      style={{
                        width: dimensions.spacing.xs,
                        height: dimensions.spacing.xs
                      }}
                    ></div>
                    
                    {/* Contenido del resultado */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <h4 
                        className={`font-semibold truncate ${
                          index === selectedIndex ? 'text-[#5D5A88]' : 'text-[#5D5A88]'
                        } group-hover:text-[#5D5A88] transition-colors duration-200`}
                        style={{ fontSize: dimensions.fontSize.md }}
                        title={result.title}
                      >
                        {result.title}
                      </h4>
                      
                      {/* Subtítulo con información útil */}
                      {result.subtitle && (
                        <p 
                          className={`font-medium ${
                            index === selectedIndex ? 'text-[#5D5A88]' : 'text-[#6B7280]'
                          } group-hover:text-[#5D5A88] transition-colors duration-200`}
                          style={{ 
                            fontSize: dimensions.fontSize.xs,
                            marginTop: dimensions.spacing.xs
                          }}
                        >
                          {result.subtitle}
                        </p>
                      )}
                      
                      {/* Descripción solo si es diferente al título */}
                      {result.description && result.description !== result.title && (
                        <p 
                          className="line-clamp-2 text-[#827896] group-hover:text-[#5D5A88] transition-colors duration-200"
                          style={{ 
                            fontSize: dimensions.fontSize.sm,
                            marginTop: dimensions.spacing.xs
                          }}
                          title={result.description}
                        >
                          {result.description}
                        </p>
                      )}
                      
                      {/* Información adicional y badge */}
                      <div 
                        className="flex items-center justify-between flex-wrap"
                        style={{ 
                          gap: dimensions.spacing.xs,
                          marginTop: dimensions.spacing.md
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            className="rounded-full font-medium bg-[#FF6E00] text-white"
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
                          
                          {/* Información específica por tipo */}
                          {result.linksCount !== undefined && result.linksCount > 0 && (
                            <span 
                              className="text-[#6B7280] group-hover:text-[#5D5A88] transition-colors duration-200"
                              style={{ fontSize: dimensions.fontSize.xs }}
                              title={`Este recurso tiene ${result.linksCount} enlaces disponibles`}
                            >
                              {result.linksCount} enlaces
                            </span>
                          )}
                          
                          {result.hasUrl && (
                            <span 
                              className="text-[#6B7280] group-hover:text-[#5D5A88] transition-colors duration-200"
                              style={{ fontSize: dimensions.fontSize.xs }}
                              title="Esta alianza tiene sitio web disponible"
                            >
                              🌐 Sitio web
                            </span>
                          )}
                        </div>
                        
                        {/* Texto de acción */}
                        {result.actionText && (
                          <span 
                            className={`font-medium ${
                              index === selectedIndex ? 'text-[#5D5A88]' : 'text-[#5D5A88]'
                            } group-hover:text-[#5D5A88] transition-colors duration-200`}
                            style={{ fontSize: dimensions.fontSize.xs }}
                            title={`Click para ${result.actionText.toLowerCase()}`}
                          >
                            {result.actionText} →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Gradiente sutil en hover/selected (igual que AllianceModal) */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-[#5D5A88]/5 via-transparent to-[#5D5A88]/8 pointer-events-none transition-opacity duration-200 ${
                      index === selectedIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
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
