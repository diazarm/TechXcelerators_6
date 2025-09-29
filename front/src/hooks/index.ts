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

// Hooks de registro de usuarios
export { useRegister } from './useRegister';

// Hooks de loading (usan contextos)
export { useLoadingContext } from './useLoadingContext';

// Hooks de header (usan contextos)
export { useHeader } from './useHeader';

// Hooks de responsividad (utilidad, no usan contextos)
export { useResponsive, useBreakpoints } from './useResponsive';
export { useScaledDimensions, useComponentDimensions } from './useScaledDimensions';

// Hooks de validación y manejo de errores
export { useFormValidation } from './useFormValidation';
export { useErrorHandler } from './useErrorHandler';

// Hooks de búsqueda (utilidad, no usan contextos)
export { useSearch } from './useSearch';

// Hooks de configuración de páginas
export { usePageHeader } from './usePageHeader';

// Hooks de navbar (utilidad, no usan contextos)
export { useNavbar } from './useSearchResult';

// Hooks de notificaciones
export { useNotification } from './useNotification';

// Hooks de cards
export { useCards } from './useCards';

export { useResources } from './useResources';

// Exportar tipos de hooks
export type { 
  UseErrorHandlerOptions, 
  UseErrorHandlerReturn,
  UseFormValidationOptions,
  UseFormValidationReturn
} from './types';