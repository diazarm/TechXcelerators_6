/**
 * Tipos para el componente ValidationErrors
 */

export interface ValidationErrorsProps {
  /** Lista de errores de validación */
  errors: string[];
  /** Nombre del campo (opcional, para debugging) */
  fieldName?: string;
  /** Clases CSS adicionales */
  className?: string;
}
