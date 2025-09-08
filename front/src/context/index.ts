/**
 * Exportaciones centralizadas de TODOS los contextos
 * 
 * Este archivo centraliza TODAS las exportaciones relacionadas con contextos
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar contextos desde un solo lugar
 * import { 
 *   AuthProvider, 
 *   AuthContext, 
 *   LoadingProvider, 
 *   LoadingContext,
 *   HeaderProvider,
 *   useHeader
 * } from './context';
 * ```
 */

// Exportaciones del contexto de autenticación
export { AuthProvider } from './auth/AuthProvider';
export { AuthContext } from './auth/auth-context';

// Exportaciones del contexto de loading
export { LoadingProvider } from './loading/LoadingProvider';
export { LoadingContext } from './loading/loading-context';

// Exportaciones del contexto del header
export { HeaderProvider } from './header/HeaderProvider';
export { default as HeaderContext } from './header/HeaderProvider';

// Exportaciones del contexto de notificaciones
export { NotificationProvider } from './notification/NotificationProvider';
export { NotificationContext } from './notification/notification-context';

// Exportar tipos de contextos
export type { HeaderContextType, HeaderProviderProps } from './header/types';