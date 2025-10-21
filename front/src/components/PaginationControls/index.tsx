import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useScreenSize } from '../../context';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  itemLabel?: string; // Ej: "usuarios", "documentos"
  className?: string;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  itemLabel = 'elementos',
  className = ''
}) => {
  const { scale, isMobile, isTablet } = useScreenSize();
  const showMobileView = isMobile || isTablet;

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col gap-3 py-3 ${className}`}>
      {/* Información de elementos */}
      <div className={`text-gray-600 text-center ${showMobileView ? 'text-xs' : 'text-sm'}`}>
        Mostrando {startItem}-{endItem} de {totalItems} {itemLabel}
      </div>

      {/* Controles de paginación */}
      <div className={`flex items-center justify-center ${showMobileView ? 'gap-1' : 'gap-2'}`}>
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center rounded-lg transition-colors ${showMobileView ? 'px-1.5 py-1' : 'px-2 py-1.5'} ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
              : 'text-[#5D5A88] hover:bg-[#5D5A88]/10 bg-white'
          }`}
        >
          <ChevronLeft size={showMobileView ? scale(14) : scale(16)} />
        </button>

        {/* Números de página */}
        <div className={`flex items-center ${showMobileView ? 'gap-1' : 'gap-1.5'}`}>
          {Array.from({ length: Math.min(totalPages, showMobileView ? 3 : 5) }, (_, i) => {
            let pageNumber;
            if (showMobileView) {
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
                className={`rounded-lg transition-colors ${showMobileView ? 'px-2 py-1 text-xs min-w-[28px]' : 'px-3 py-2 text-sm min-w-[36px]'} ${
                  currentPage === pageNumber
                    ? 'bg-[#5D5A88] text-white'
                    : 'text-[#5D5A88] hover:bg-[#5D5A88]/10 bg-white'
                }`}
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
          className={`flex items-center justify-center rounded-lg transition-colors ${showMobileView ? 'px-1.5 py-1' : 'px-2 py-1.5'} ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
              : 'text-[#5D5A88] hover:bg-[#5D5A88]/10 bg-white'
          }`}
        >
          <ChevronRight size={showMobileView ? scale(14) : scale(16)} />
        </button>
      </div>
    </div>
  );
};
