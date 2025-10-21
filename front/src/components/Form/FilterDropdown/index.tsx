import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'react-feather';
import { useScreenSize } from '../../../context';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Componente de filtro desplegable para headers de tablas
 * Permite seleccionar una opción de un conjunto predefinido
 */
export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
}) => {
  const { scale } = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);


  // Cerrar dropdown al hacer click fuera o scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true); // true para capturar en fase de captura
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        left: rect.left
      });
    }
    setIsOpen(!isOpen);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-1 cursor-pointer hover:text-[#FF6E00] transition-colors duration-200 focus:outline-none bg-transparent border-none p-0"
      >
        <span className="font-semibold text-[#5D5A88] text-sm">
          {label}
        </span>
        {selectedOption && selectedOption.value !== 'all' && (
          <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#5D5A88]/10 text-[#5D5A88]">
            {selectedOption.label}
          </span>
        )}
        <ChevronDown
          size={scale(14)}
          className={`text-[#5D5A88] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="fixed z-[9999] bg-white shadow-xl border-2 border-gray-300 rounded-lg overflow-hidden"
          style={{
            top: position.top,
            left: position.left,
            minWidth: scale(150),
            maxHeight: scale(200),
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div className="overflow-y-auto" style={{ maxHeight: scale(200) }}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors duration-150 text-sm border-none cursor-pointer ${
                  option.value === value ? 'bg-[#5D5A88]/10 text-[#5D5A88] font-medium' : 'text-gray-700'
                }`}
              >
                {option.label}
                {option.value === value && (
                  <span className="ml-2 text-[#FF6E00]">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

