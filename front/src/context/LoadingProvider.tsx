import React, { createContext, useState, ReactNode } from 'react';
import { LoadingContextType, LoadingConfig } from './loading-context';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Contexto de Loading
 */
export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * Props del LoadingProvider
 */
interface LoadingProviderProps {
  children: ReactNode;
}

/**
 * LoadingProvider - Proveedor del contexto de loading global
 * 
 * Este proveedor permite controlar el estado de carga global desde cualquier
 * componente de la aplicación sin necesidad de prop drilling.
 * 
 * Características:
 * - Control global del estado de loading
 * - Configuración personalizable del spinner
 * - Métodos utilitarios para casos comunes
 * - Overlay automático de pantalla completa
 * 
 * @example
 * ```tsx
 * // En App.tsx
 * import { LoadingProvider } from './context/LoadingProvider';
 * 
 * <LoadingProvider>
 *   <App />
 * </LoadingProvider>
 * ```
 * 
 * @example Uso en componentes
 * ```tsx
 * import { useLoadingContext } from './context/useLoadingContext';
 * 
 * const MyComponent = () => {
 *   const { showLoading, hideLoading } = useLoadingContext();
 *   
 *   const handleAsyncOperation = async () => {
 *     showLoading({ message: 'Guardando...' });
 *     try {
 *       await saveData();
 *     } finally {
 *       hideLoading();
 *     }
 *   };
 * };
 * ```
 */
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<LoadingConfig>({
    type: 'default',
    size: 'large',
    message: 'Cargando...',
    overlay: true
  });

  /**
   * Mostrar loading global con configuración opcional
   */
  const showLoading = (newConfig?: LoadingConfig) => {
    if (newConfig) {
      setConfig(prev => ({ ...prev, ...newConfig }));
    }
    setIsLoading(true);
  };

  /**
   * Ocultar loading global
   */
  const hideLoading = () => {
    setIsLoading(false);
  };

  /**
   * Mostrar loading con mensaje específico
   */
  const showLoadingWithMessage = (message: string, newConfig?: Omit<LoadingConfig, 'message'>) => {
    const fullConfig: LoadingConfig = {
      ...config,
      ...newConfig,
      message
    };
    setConfig(fullConfig);
    setIsLoading(true);
  };

  const contextValue: LoadingContextType = {
    isLoading,
    config,
    showLoading,
    hideLoading,
    showLoadingWithMessage
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {/* Renderizar loading global cuando esté activo */}
      {isLoading && (
        <LoadingSpinner
          fullScreen
          type={config.type}
          size={config.size}
          message={config.message}
          overlay={config.overlay}
        />
      )}
    </LoadingContext.Provider>
  );
};
