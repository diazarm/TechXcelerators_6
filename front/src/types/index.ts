/**
 * Exportaciones centralizadas de tipos compartidos
 * 
 * Este archivo centraliza SOLO tipos compartidos entre módulos.
 * Los tipos co-locados se importan directamente desde sus módulos.
 * 
 * @example
 * ```tsx
 * // Importar tipos compartidos desde un solo lugar
 * import type { 
 *   User, 
 *   AuthContextType, 
 *   LoginCredentials
 * } from '../../types';
 * 
 * // Importar tipos co-locados directamente desde su módulo
 * import type { ButtonProps } from '../components/Button/types';
 * ```
 */

// Tipos compartidos entre módulos
export type { 
  User, 
  UserRole, 
  AuthState, 
  LoginCredentials, 
  AuthContextType, 
  AuthProviderProps 
} from './shared';
