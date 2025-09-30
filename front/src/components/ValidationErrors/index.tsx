/**
 * Componente para mostrar errores de validación
 */

import React from 'react';
import { useResponsive, useComponentDimensions } from '../../hooks';
import type { ValidationErrorsProps } from './types';

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({
  errors,
  className = ''
}) => {
  const responsive = useResponsive();
  const dimensions = useComponentDimensions();

  if (!errors || errors.length === 0) return null;

  return (
    <div className={`mt-1 ${className}`}>
      {errors.map((error: string, index: number) => (
        <div
          key={index}
          className="flex items-center gap-1 text-red-600"
          style={{ fontSize: dimensions.fontSize.xs }}
        >
          <span className="text-red-500">⚠️</span>
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
};

export default ValidationErrors;
