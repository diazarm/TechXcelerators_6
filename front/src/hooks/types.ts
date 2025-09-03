/**
 * Tipos para hooks personalizados
 */

import type { AppError, ErrorState } from '../types/error';
import type { ValidationState, FormValidation } from '../types/validation';

// Tipos para useErrorHandler
export interface UseErrorHandlerOptions {
  /** Si mostrar errores automáticamente */
  autoShow?: boolean;
  /** Tiempo para auto-ocultar errores (ms) */
  autoHideDelay?: number;
  /** Callback cuando ocurre un error */
  onError?: (error: AppError) => void;
  /** Callback cuando se resuelve un error */
  onErrorResolved?: (error: AppError) => void;
}

export interface UseErrorHandlerReturn {
  /** Estado actual de errores */
  errorState: ErrorState;
  /** Si hay errores activos */
  hasErrors: boolean;
  /** Error más crítico */
  criticalError: AppError | null;
  /** Agregar un error */
  addError: (error: AppError) => void;
  /** Remover un error */
  removeError: (errorCode: string) => void;
  /** Limpiar todos los errores */
  clearErrors: () => void;
  /** Manejar un error genérico */
  handleError: (error: unknown, context?: string) => AppError;
  /** Reintentar operación que falló */
  retryOperation: (operation: () => Promise<void>, context?: string) => Promise<void>;
}

// Tipos para useFormValidation
export interface UseFormValidationOptions {
  /** Validación del formulario */
  validation: FormValidation;
  /** Si validar en tiempo real */
  validateOnChange?: boolean;
  /** Si validar al hacer blur */
  validateOnBlur?: boolean;
  /** Callback cuando la validación cambia */
  onValidationChange?: (isValid: boolean) => void;
}

export interface UseFormValidationReturn<T> {
  /** Datos del formulario */
  formData: T;
  /** Estado de validación */
  validationState: ValidationState;
  /** Si el formulario es válido */
  isValid: boolean;
  /** Si se ha intentado validar */
  hasValidated: boolean;
  /** Actualizar un campo */
  updateField: (field: keyof T, value: unknown) => void;
  /** Actualizar múltiples campos */
  updateFields: (updates: Partial<T>) => void;
  /** Validar un campo específico */
  validateField: (field: keyof T) => void;
  /** Validar todo el formulario */
  validateForm: () => ValidationState;
  /** Resetear el formulario */
  resetForm: (newData?: Partial<T>) => void;
  /** Marcar campo como tocado */
  touchField: (field: keyof T) => void;
  /** Obtener errores de un campo */
  getFieldErrors: (field: keyof T) => string[];
  /** Si un campo tiene errores */
  hasFieldErrors: (field: keyof T) => boolean;
  /** Si un campo ha sido tocado */
  isFieldTouched: (field: keyof T) => boolean;
}
