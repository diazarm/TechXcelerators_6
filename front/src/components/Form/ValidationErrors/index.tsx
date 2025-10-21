/**
 * Componente para mostrar errores de validación
 */

import React from 'react';
import { useScreenSize } from '../../../context';
import type { ValidationErrorsProps } from './types';

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({
  errors,
  className = '',
  id
}) => {
  const { dimensions } = useScreenSize();

  if (!errors || errors.length === 0) return null;

  return (
    <div 
      id={id}
      className={`mt-1 ${className}`}
      role="alert"
      aria-live="polite"
    >
      {errors.map((error: string, index: number) => (
        <div
          key={index}
          className="flex items-center gap-1 text-red-600"
          style={{ fontSize: dimensions.fontSize.xs }}
        >
          <span className="text-red-500" aria-hidden="true">⚠️</span>
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
};

export default ValidationErrors;
