import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useScreenSize } from '../../context';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className = ''
}) => {
  const { scale, isMobile } = useScreenSize();

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div 
      className={`flex items-center justify-between ${className}`}
      style={{
        paddingTop: isMobile ? scale(12) : scale(16),
        paddingBottom: isMobile ? scale(8) : scale(12)
      }}
    >
      {/* Información de elementos */}
      <div 
        className="text-gray-600"
        style={{ fontSize: isMobile ? scale(10) : scale(12) }}
      >
        Mostrando {startItem}-{endItem} de {totalItems} usuarios
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center" style={{ gap: isMobile ? scale(4) : scale(8) }}>
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center rounded-lg transition-colors ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
              : 'text-[#5D5A88] hover:bg-[#5D5A88]/10 bg-white'
          }`}
          style={{
            padding: isMobile ? scale(6) : scale(8),
            gap: isMobile ? scale(2) : scale(4)
          }}
        >
          <ChevronLeft size={isMobile ? scale(14) : scale(16)} />
          <span style={{ fontSize: isMobile ? scale(10) : scale(12) }}>
            Anterior
          </span>
        </button>

        {/* Números de página */}
        <div className="flex items-center" style={{ gap: isMobile ? scale(2) : scale(4) }}>
          {Array.from({ length: Math.min(totalPages, isMobile ? 3 : 5) }, (_, i) => {
            let pageNumber;
            if (isMobile) {
              // En móvil mostrar máximo 3 páginas
              if (totalPages <= 3) {
                pageNumber = i + 1;
              } else if (currentPage <= 2) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 1) {
                pageNumber = totalPages - 2 + i;
              } else {
                pageNumber = currentPage - 1 + i;
              }
            } else {
              // En desktop mostrar máximo 5 páginas
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
            }

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`rounded-lg transition-colors ${
                  currentPage === pageNumber
                    ? 'bg-[#5D5A88] text-white'
                    : 'text-[#5D5A88] hover:bg-[#5D5A88]/10 bg-white'
                }`}
                style={{
                  padding: isMobile ? scale(6) : scale(8),
                  fontSize: isMobile ? scale(10) : scale(12),
                  minWidth: isMobile ? scale(24) : scale(32)
                }}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center rounded-lg transition-colors ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
              : 'text-[#5D5A88] hover:bg-[#5D5A88]/10 bg-white'
          }`}
          style={{
            padding: isMobile ? scale(6) : scale(8),
            gap: isMobile ? scale(2) : scale(4)
          }}
        >
          <span style={{ fontSize: isMobile ? scale(10) : scale(12) }}>
            Siguiente
          </span>
          <ChevronRight size={isMobile ? scale(14) : scale(16)} />
        </button>
      </div>
    </div>
  );
};
