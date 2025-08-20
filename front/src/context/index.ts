/**
 * Exportaciones centralizadas de los contextos
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con los contextos
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar todo desde un solo lugar
 * import { AuthProvider, useAuthContext, LoadingProvider, useLoadingContext } from './context';
 * 
 * // O importar individualmente
 * import { AuthProvider } from './context/AuthContext';
 * import { useLoadingContext } from './context/useLoadingContext';
 * ```
 */

// Exportaciones del contexto de autenticación
export { AuthProvider } from './AuthContext';
export { useAuthContext } from './useAuthContext';
export type { AuthContextType } from './auth-context';

// Exportaciones del contexto de loading
export { LoadingProvider } from './LoadingProvider';
export { useLoadingContext } from './useLoadingContext';
export type { LoadingContextType, LoadingConfig } from './loading-context';
