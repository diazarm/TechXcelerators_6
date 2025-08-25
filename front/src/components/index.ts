/**
 * Exportaciones centralizadas de TODOS los componentes
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con componentes
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar componentes desde un solo lugar
 * import { 
 *   LoadingSpinner,
 *   ErrorBoundary,
 *   Navigation
 * } from '../components';
 * ```
 */

// Componentes de loading
export { default as LoadingSpinner } from './LoadingSpinner';

// Componentes de sistema
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as Navigation } from './Navigation';
