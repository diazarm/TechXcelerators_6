import { useContext } from 'react';
import { LoadingContext } from './LoadingProvider';
import { LoadingContextType } from './loading-context';

/**
 * Hook para acceder al contexto de Loading
 * 
 * Este hook proporciona acceso a todas las funciones de control de loading global.
 * Debe ser usado dentro de un componente envuelto por LoadingProvider.
 * 
 * @throws Error si se usa fuera del LoadingProvider
 * 
 * @example Uso básico
 * ```tsx
 * import { useLoadingContext } from './context/useLoadingContext';
 * 
 * const MyComponent = () => {
 *   const { isLoading, showLoading, hideLoading } = useLoadingContext();
 *   
 *   const handleClick = () => {
 *     showLoading({ message: 'Procesando...' });
 *     setTimeout(hideLoading, 2000);
 *   };
 *   
 *   return <button onClick={handleClick}>Procesar</button>;
 * };
 * ```
 * 
 * @example Con async/await
 * ```tsx
 * const { showLoadingWithMessage, hideLoading } = useLoadingContext();
 * 
 * const fetchData = async () => {
 *   showLoadingWithMessage('Obteniendo datos...');
 *   try {
 *     const data = await api.getData();
 *     return data;
 *   } finally {
 *     hideLoading();
 *   }
 * };
 * ```
 * 
 * @example Con diferentes tipos de spinner
 * ```tsx
 * const { showLoading } = useLoadingContext();
 * 
 * // Spinner de puntos
 * showLoading({ 
 *   type: 'dots', 
 *   message: 'Enviando...' 
 * });
 * 
 * // Spinner de barras
 * showLoading({ 
 *   type: 'bars', 
 *   size: 'xl',
 *   message: 'Procesando archivo...' 
 * });
 * ```
 * 
 * @returns Objeto con funciones y estado del loading global
 */
export const useLoadingContext = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  
  if (context === undefined) {
    throw new Error('useLoadingContext debe ser usado dentro de un LoadingProvider');
  }
  
  return context;
};
