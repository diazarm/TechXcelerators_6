import { useContext } from 'react';
import { LoadingContext } from '../../context';

/**
 * Hook para usar el contexto de loading global
 * 
 * Proporciona funciones para mostrar/ocultar loading y
 * configurar mensajes personalizados.
 */
export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  
  if (context === undefined) {
    throw new Error('useLoadingContext debe usarse dentro de LoadingProvider');
  }
  
  return context;
};
