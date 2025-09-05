import { createContext } from 'react';

/**
 * Configuración para mostrar loading en componentes específicos
 */
export interface LoadingConfig {
  id: string;
  message?: string;
  variant?: 'spinner' | 'skeleton' | 'dots';
}

/**
 * Estado del contexto de loading
 */
export interface LoadingContextType {
  isLoading: boolean;
  loadingItems: LoadingConfig[];
  showLoading: (config?: LoadingConfig) => void;
  hideLoading: (id?: string) => void;
  clearAll: () => void;
}

/**
 * Contexto de loading
 */
export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
