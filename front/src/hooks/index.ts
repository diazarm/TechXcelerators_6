/**
 * Exportaciones centralizadas de TODOS los hooks
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con hooks
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar hooks desde un solo lugar
 * import { 
 *   useAuth, 
 *   useResponsive,
 *   useBreakpoints,
 *   useHeader
 * } from '../hooks';
 * ```
 */

// Hooks de autenticación (usan contextos)
export { useAuth } from './useAuth';

// Hooks de loading (usan contextos)
export { useLoadingContext } from './useLoadingContext';

// Hooks de header (usan contextos)
export { useHeader } from '../context';

// Hooks de responsividad (utilidad, no usan contextos)
export { useResponsive, useBreakpoints } from './useResponsive';

// Hooks de validación y manejo de errores
export { useFormValidation } from './useFormValidation';
export { useErrorHandler } from './useErrorHandler';

// Exportar tipos de hooks
export type { 
  UseErrorHandlerOptions, 
  UseErrorHandlerReturn,
  UseFormValidationOptions,
  UseFormValidationReturn
} from './types';