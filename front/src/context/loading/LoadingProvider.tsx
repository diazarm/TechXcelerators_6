import React, { useState, useCallback } from 'react';
import type { LoadingProviderProps } from './types';
import { LoadingContext, type LoadingContextType, type LoadingConfig } from './loading-context';

/** Proveedor del contexto de loading */
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loadingItems, setLoadingItems] = useState<LoadingConfig[]>([]);

  // Estado calculado
  const isLoading = loadingItems.length > 0;

  /** Mostrar loading */
  const showLoading = useCallback((config?: LoadingConfig): void => {
    if (config) {
      setLoadingItems(prev => [...prev, config]);
    } else {
      setLoadingItems(prev => [...prev, { id: `global-${Date.now()}` }]);
    }
  }, []);

  /** Ocultar loading */
  const hideLoading = useCallback((id?: string): void => {
    if (id) {
      setLoadingItems(prev => prev.filter(item => item.id !== id));
    } else {
      setLoadingItems(prev => prev.slice(0, -1));
    }
  }, []);

  /** Limpiar todo el loading */
  const clearAll = useCallback((): void => {
    setLoadingItems([]);
  }, []);

  const contextValue: LoadingContextType = {
    isLoading,
    loadingItems,
    showLoading,
    hideLoading,
    clearAll
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};
