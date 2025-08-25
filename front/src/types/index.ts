/**
 * Exportaciones centralizadas de TODOS los tipos
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con tipos
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar tipos desde un solo lugar
 * import type { 
 *   User, 
 *   AuthContextType, 
 *   LoginCredentials,
 *   LoadingContextType,
 *   LoadingConfig 
 * } from '../types';
 * ```
 */

// Tipos de autenticación
export type { 
  User, 
  UserRole, 
  AuthState, 
  LoginCredentials, 
  AuthContextType, 
  AuthProviderProps 
} from './auth';

// Tipos de loading
export type { 
  LoadingContextType, 
  LoadingConfig 
} from '../context/loading/loading-context';
