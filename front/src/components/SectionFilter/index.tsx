import React from 'react';
import { ChevronDown } from 'react-feather';
import { useScreenSize } from '../../context';
import type { SectionFilterProps } from './types';

/**
 * Componente de filtro por sección
 * Dropdown reutilizable para filtrar recursos por sección
 */
export const SectionFilter: React.FC<SectionFilterProps> = ({
  selectedSectionId,
  onSectionChange,
  sections,
  className = '',
  loading = false
}) => {
  const { scale } = useScreenSize();

  // Calcular el total de recursos en todas las secciones
  const totalCount = sections.reduce((sum, section) => sum + (section.count || 0), 0);

  // Obtener el título de la sección seleccionada

  return (
    <div className={`relative ${className}`}>
      <label 
        className="block text-gray-700 font-medium mb-1"
        style={{ fontSize: `${scale(14)}px` }}
      >
        Filtrar por sección:
      </label>
      
      <div className="relative">
        <select
          value={selectedSectionId}
          onChange={(e) => onSectionChange(e.target.value)}
          disabled={loading}
          className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg appearance-none cursor-pointer hover:border-[#5D5A88] focus:outline-none focus:ring-2 focus:ring-[#5D5A88] focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            padding: `${scale(10)}px ${scale(40)}px ${scale(10)}px ${scale(12)}px`,
            fontSize: `${scale(14)}px`
          }}
        >
          {/* Opción: Todas las secciones */}
          <option value="all">
            {`Todas las secciones${totalCount > 0 ? ` (${totalCount})` : ''}`}
          </option>
          
          {/* Opciones: Secciones individuales */}
          {sections.map((section) => (
            <option key={section.sectionId} value={section.sectionId}>
              {section.title}{section.count !== undefined ? ` (${section.count})` : ''}
            </option>
          ))}
        </select>
        
        {/* Icono de chevron */}
        <div 
          className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none"
          style={{
            paddingRight: `${scale(12)}px`
          }}
        >
          <ChevronDown 
            size={scale(18)} 
            className="text-gray-400"
          />
        </div>
      </div>
      
      {/* Indicador de carga */}
      {loading && (
        <div 
          className="absolute right-0 top-0 flex items-center"
          style={{
            marginTop: `${scale(32)}px`,
            marginRight: `${scale(12)}px`
          }}
        >
          <div 
            className="animate-spin rounded-full border-2 border-gray-300 border-t-[#5D5A88]"
            style={{
              width: `${scale(16)}px`,
              height: `${scale(16)}px`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SectionFilter;

