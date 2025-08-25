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
 *   useBreakpoints 
 * } from '../hooks';
 * ```
 */

// Hooks de autenticación (usan contextos)
export { useAuth } from './useAuth';

// Hooks de loading (usan contextos)
export { useLoadingContext } from './useLoadingContext';

// Hooks de responsividad (utilidad, no usan contextos)
export { useResponsive, useBreakpoints } from './useResponsive';
