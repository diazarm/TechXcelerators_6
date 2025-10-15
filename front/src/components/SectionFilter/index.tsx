import React, { useState, useRef, useEffect } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calcular el total de recursos en todas las secciones
  const totalCount = sections.reduce((sum, section) => sum + (section.count || 0), 0);

  // Obtener el texto de la opción seleccionada
  const getSelectedText = () => {
    if (selectedSectionId === 'all') {
      return `Todas las secciones${totalCount > 0 ? ` (${totalCount})` : ''}`;
    }
    const section = sections.find(s => s.sectionId === selectedSectionId);
    return section ? `${section.title}${section.count !== undefined ? ` (${section.count})` : ''}` : 'Seleccionar...';
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (value: string) => {
    onSectionChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label 
        className="block text-[#1E285F] font-medium mb-1"
        style={{ fontSize: `${scale(14)}px` }}
      >
        Filtrar por sección:
      </label>
      
      <div className="relative">
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          className="w-full bg-white border border-gray-200 text-[#1E285F] rounded-lg cursor-pointer hover:border-[#5D5A88] focus:outline-none focus:ring-2 focus:ring-[#5D5A88] focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left flex items-center justify-between"
          style={{
            padding: `${scale(10)}px ${scale(40)}px ${scale(10)}px ${scale(12)}px`,
            fontSize: `${scale(14)}px`,
            minHeight: `${scale(40)}px`
          }}
        >
          <span className="truncate">{getSelectedText()}</span>
          <ChevronDown 
            size={scale(18)} 
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {/* Dropdown menu */}
        {isOpen && (
          <div 
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
            style={{
              maxWidth: '100%',
              minWidth: '200px'
            }}
          >
            {/* Opción: Todas las secciones */}
            <button
              type="button"
              onClick={() => handleOptionClick('all')}
              className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                selectedSectionId === 'all' ? 'bg-[#5D5A88] text-white' : 'text-[#1E285F]'
              }`}
              style={{
                fontSize: `${scale(14)}px`,
                padding: `${scale(8)}px ${scale(12)}px`
              }}
            >
              Todas las secciones{totalCount > 0 ? ` (${totalCount})` : ''}
            </button>
            
            {/* Opciones: Secciones individuales */}
            {sections.map((section) => (
              <button
                key={section.sectionId}
                type="button"
                onClick={() => handleOptionClick(section.sectionId)}
                className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                  selectedSectionId === section.sectionId ? 'bg-[#5D5A88] text-white' : 'text-[#1E285F]'
                }`}
                style={{
                  fontSize: `${scale(14)}px`,
                  padding: `${scale(8)}px ${scale(12)}px`
                }}
              >
                {section.title}{section.count !== undefined ? ` (${section.count})` : ''}
              </button>
            ))}
          </div>
        )}
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

