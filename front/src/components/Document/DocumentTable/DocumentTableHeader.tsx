/**
 * Header de la tabla de documentos con filtro de categoría
 * Siguiendo el mismo diseño de UserTableHeader
 */

import React from 'react';
import { useScreenSize } from '../../../context';
import { FilterDropdown } from '../../Form/FilterDropdown';

interface DocumentTableHeaderProps {
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}

export const DocumentTableHeader: React.FC<DocumentTableHeaderProps> = ({
  categoryFilter,
  onCategoryFilterChange,
}) => {
  const { scale } = useScreenSize();
  const categoryOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'manual', label: 'Manual' },
    { value: 'informe', label: 'Informe' },
    { value: 'guia', label: 'Guía' },
    { value: 'politicas', label: 'Políticas' },
    { value: 'faqs', label: 'FAQs' },
    { value: 'otros', label: 'Otros' },
  ];

  return (
    <div
      className="bg-gradient-to-r from-[#F5F4F8] to-[#E8E6F0] rounded-t-lg border-b border-gray-200 font-semibold text-[#5D5A88] items-center w-full grid"
      style={{ 
        gridTemplateColumns: '60px 1.5fr 1fr 0.8fr 1fr 1.5fr',
        padding: scale(12),
        gap: scale(12)
      }}
    >
      <div className="text-center" style={{ fontSize: scale(14) }}>Tipo</div>
      <div style={{ fontSize: scale(14) }}>Nombre</div>
      <div>
        <FilterDropdown
          label="Categoría"
          options={categoryOptions}
          value={categoryFilter}
          onChange={onCategoryFilterChange}
        />
      </div>
      <div style={{ fontSize: scale(14) }}>Fecha</div>
      <div style={{ fontSize: scale(14) }}>Visible a</div>
      <div className="text-center" style={{ fontSize: scale(14) }}>Acciones</div>
    </div>
  );
};

