/**
 * Exportaciones centralizadas de tipos
 * 
 * Este archivo centraliza tipos compartidos y re-exporta tipos de módulos
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar tipos compartidos desde un solo lugar
 * import type { 
 *   User, 
 *   AuthContextType, 
 *   LoginCredentials
 * } from '../types';
 * 
 * // Importar tipos específicos desde sus módulos
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

// Re-exportar tipos de módulos para facilitar imports
export type { 
  ButtonProps 
} from '../components/Button/types';

export type { 
  LoadingSpinnerProps,
  SpinnerType,
  SpinnerSize
} from '../components/LoadingSpinner/types';

export type { 
  ErrorBoundaryProps,
  ErrorBoundaryState
} from '../components/ErrorBoundary/types';

export type { 
  LoadingProviderProps 
} from '../context/loading/types';
