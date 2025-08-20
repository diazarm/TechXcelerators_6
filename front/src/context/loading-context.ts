import { SpinnerType, SpinnerSize } from '../components/LoadingSpinner';

/**
 * Configuración del loading global
 */
export interface LoadingConfig {
  /** Tipo de spinner a mostrar */
  type?: SpinnerType;
  /** Tamaño del spinner */
  size?: SpinnerSize;
  /** Mensaje a mostrar */
  message?: string;
  /** Si debe mostrar overlay */
  overlay?: boolean;
}

/**
 * Tipo del contexto de Loading
 */
export interface LoadingContextType {
  /** Si está mostrando loading actualmente */
  isLoading: boolean;
  /** Configuración actual del loading */
  config: LoadingConfig;
  /** Mostrar loading global */
  showLoading: (config?: LoadingConfig) => void;
  /** Ocultar loading global */
  hideLoading: () => void;
  /** Mostrar loading con mensaje específico */
  showLoadingWithMessage: (message: string, config?: Omit<LoadingConfig, 'message'>) => void;
}
