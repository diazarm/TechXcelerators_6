import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useScreenSize } from "../../context";
import { useEscapeKey } from "../../hooks";
import type { ResourceDropdownProps } from "./types";
import { COLOR_CLASSES } from "../../constants";

const ResourceDropdown: React.FC<ResourceDropdownProps> = ({
  isOpen,
  onToggle,
}) => {
  const { dimensions, scale } = useScreenSize();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Hook de accesibilidad - Cerrar con Escape
  useEscapeKey(isOpen, onToggle);
  
  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 ${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium cursor-pointer bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#FF6E00] focus:ring-opacity-50 rounded`}
        style={{ 
          fontSize: dimensions.fontSize.sm,
          padding: `${dimensions.spacing.xs}px`
        }}
        aria-label="Menú de recursos"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Recursos
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          role="menu"
          aria-orientation="vertical"
          className="absolute top-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          style={{
            right: 0,
            marginTop: dimensions.spacing.xs,
            width: 'auto',
            minWidth: `${scale(200)}px`,
            maxWidth: '90vw'
          }}
        >
          <div style={{ paddingTop: dimensions.spacing.xs, paddingBottom: dimensions.spacing.xs }}>
            <Link
              to="/manual-usuario"
              role="menuitem"
              className={`${COLOR_CLASSES.textPrimary} hover:bg-gray-100 transition-colors block`}
              style={{
                paddingLeft: dimensions.spacing.md,
                paddingRight: dimensions.spacing.md,
                paddingTop: dimensions.spacing.sm,
                paddingBottom: dimensions.spacing.sm,
                fontSize: dimensions.fontSize.sm
              }}
              onClick={onToggle}
            >
              Manual de Usuario
            </Link>
            <Link
              to="/utilidades"
              role="menuitem"
              className={`${COLOR_CLASSES.textPrimary} hover:bg-gray-100 transition-colors block`}
              style={{
                paddingLeft: dimensions.spacing.md,
                paddingRight: dimensions.spacing.md,
                paddingTop: dimensions.spacing.sm,
                paddingBottom: dimensions.spacing.sm,
                fontSize: dimensions.fontSize.sm
              }}
              onClick={onToggle}
            >
              Utilidades
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceDropdown;
