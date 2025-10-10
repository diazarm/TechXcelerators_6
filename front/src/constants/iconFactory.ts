import React from 'react';
import { scale } from '../utils';

/**
 * Factory para creación de iconos escalados
 * Centraliza toda la lógica de creación de iconos con sistema de escalado
 */

/**
 * Función para crear iconos con componente específico y escalado
 * @param IconComponent - Componente de icono de react-feather
 * @param baseSize - Tamaño base del icono
 * @param color - Color del icono (opcional)
 * @returns Elemento React del icono escalado
 */
export const createIcon = (
  IconComponent: React.ComponentType<{ size: number; color?: string }>, 
  baseSize: number, 
  color?: string
) => {
  const scaledSize = scale(baseSize);
  
  return React.createElement('div', {
    className: "flex items-center justify-center",
    style: {
      width: `${scaledSize}px`,
      height: `${scaledSize}px`
    }
  }, React.createElement(IconComponent, {
    size: scaledSize,
    color: color || '#585D8A'
  }));
};

/**
 * Función para crear iconos semibold con escalado
 * @param IconComponent - Componente de icono de react-feather
 * @param baseSize - Tamaño base del icono
 * @param color - Color del icono (opcional)
 * @returns Elemento React del icono semibold escalado
 */
export const createSemiboldIcon = (
  IconComponent: React.ComponentType<{ size: number; color?: string; strokeWidth?: number }>, 
  baseSize: number, 
  color?: string
) => {
  const scaledSize = scale(baseSize);
  
  return React.createElement('div', {
    className: "flex items-center justify-center",
    style: {
      width: `${scaledSize}px`,
      height: `${scaledSize}px`
    }
  }, React.createElement(IconComponent, {
    size: scaledSize,
    color: color || '#585D8A',
    strokeWidth: 1.5 // Menos peso visual
  }));
};

/**
 * Función para crear iconos con círculo sutil y escalado
 * @param IconComponent - Componente de icono de react-feather
 * @param baseSize - Tamaño base del icono
 * @param color - Color del icono (opcional)
 * @returns Elemento React del icono con círculo escalado
 */
export const createIconWithCircle = (
  IconComponent: React.ComponentType<{ size: number; color?: string }>, 
  baseSize: number, 
  color?: string
) => {
  const scaledSize = scale(baseSize);
  const scaledPadding = scale(12);
  
  return React.createElement('div', {
    className: "flex items-center justify-center rounded-full border border-gray-200",
    style: {
      width: `${scaledSize + scaledPadding}px`,
      height: `${scaledSize + scaledPadding}px`,
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
  }, React.createElement(IconComponent, {
    size: scaledSize,
    color: color || '#5D5A88'
  }));
};

/**
 * Función para crear múltiples iconos en un contenedor con escalado
 * @param icons - Array de configuración de iconos
 * @param baseGap - Espaciado base entre iconos
 * @param onEditClick - Función a ejecutar al hacer click en el icono de editar
 * @param onDeleteClick - Función a ejecutar al hacer click en el icono de eliminar
 * @returns Elemento React contenedor con múltiples iconos escalados
 */
export const createMultipleIcons = (
  icons: Array<{ 
    component: React.ComponentType<{ size: number; color?: string; strokeWidth?: number }>, 
    size: number, 
    color?: string, 
    withCircle?: boolean,
    type?: 'edit' | 'delete'
  }>, 
  baseGap: number = 8,
  onEditClick?: () => void,
  onDeleteClick?: () => void
) => {
  const scaledGap = scale(baseGap);
  
  const handleIconClick = (e: React.MouseEvent, type?: 'edit' | 'delete') => {
    e.stopPropagation(); // Evitar que se propague al click de la card
    
    if (type === 'edit' && onEditClick) {
      onEditClick();
    } else if (type === 'delete' && onDeleteClick) {
      onDeleteClick();
    }
  };
  
  return React.createElement('div', { 
    style: { display: 'flex', gap: `${scaledGap}px`, alignItems: 'center' } 
  }, icons.map((icon, index) => {
    const iconElement = icon.withCircle 
      ? createIconWithCircle(icon.component, icon.size, icon.color) 
      : createIcon(icon.component, icon.size, icon.color);
    
    // Si hay handlers y el icono tiene tipo, hacerlo clickeable SIN cambiar el diseño
    if ((onEditClick || onDeleteClick) && icon.type) {
      return React.createElement('div', {
        key: index,
        onClick: (e: React.MouseEvent) => handleIconClick(e, icon.type),
        style: { cursor: 'pointer' },
        title: icon.type === 'edit' ? 'Editar recurso' : 'Desactivar recurso'
      }, iconElement);
    }
    
    return React.createElement('div', { key: index }, iconElement);
  }));
};
