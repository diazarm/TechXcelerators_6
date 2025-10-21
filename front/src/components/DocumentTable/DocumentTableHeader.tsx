/**
 * Header de la tabla de documentos con filtro de categoría
 * Siguiendo el mismo diseño de UserTableHeader
 */

import React from 'react';
import { FilterDropdown } from '../FilterDropdown';

interface DocumentTableHeaderProps {
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}

export const DocumentTableHeader: React.FC<DocumentTableHeaderProps> = ({
  categoryFilter,
  onCategoryFilterChange,
}) => {
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
      className="grid gap-3 px-4 py-3 bg-gradient-to-r from-[#F5F4F8] to-[#E8E6F0] rounded-t-lg border-b border-gray-200 font-semibold text-sm text-[#5D5A88] items-center w-full"
      style={{ gridTemplateColumns: '60px 1.5fr 1fr 0.8fr 1fr 1.5fr' }}
    >
      <div className="text-center">Tipo</div>
      <div>Nombre</div>
      <div>
        <FilterDropdown
          label="Categoría"
          options={categoryOptions}
          value={categoryFilter}
          onChange={onCategoryFilterChange}
        />
      </div>
      <div>Fecha</div>
      <div>Visible a</div>
      <div className="text-center">Acciones</div>
    </div>
  );
};

