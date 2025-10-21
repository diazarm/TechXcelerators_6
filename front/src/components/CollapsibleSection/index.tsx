/**
 * Componente de Sección Colapsable
 * Componente reutilizable para crear secciones expandibles/colapsables
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useScreenSize } from '../../context';
import { COLOR_CLASSES } from '../../constants';

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  defaultOpen = false,
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { scale, getResponsivePadding, getResponsiveMargin, getResponsiveText } = useScreenSize();
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSection();
    }
  };


  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF6E00]/20 transition-all duration-300 ${getResponsivePadding('medium')} ${getResponsiveMargin('medium')} ${className}`}
    >
      {/* Header completamente clickeable */}
      <div
        className={`flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200 -m-2 p-2 ${isOpen ? 'mb-4' : ''}`}
        onClick={toggleSection}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        aria-label={isOpen ? `Colapsar sección ${title}` : `Expandir sección ${title}`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <h2
            className={`${COLOR_CLASSES.textPrimary} font-semibold ${getResponsiveText('medium')}`}
          >
            {title}
          </h2>
        </div>

        {/* Icono de expansión/colapso */}
        <div
          className={`${COLOR_CLASSES.primary} transition-transform duration-300`}
        >
          {isOpen ? (
            <ChevronUp size={scale(24)} />
          ) : (
            <ChevronDown size={scale(24)} />
          )}
        </div>
      </div>

      {/* Contenido colapsable */}
      <div
        ref={contentRef}
        id={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="transition-all duration-300"
        style={{
          maxHeight: isOpen ? 'none' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: isOpen ? 'visible' : 'hidden',
        }}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
};

