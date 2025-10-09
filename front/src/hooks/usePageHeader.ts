import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHeader } from './useHeader';
import { PAGE_HEADERS } from '../constants';

/**
 * Hook para configuración automática de títulos de páginas
 * 
 * Configura automáticamente el título del header
 * basado en la ruta actual usando la configuración centralizada.
 * 
 * @example
 * ```tsx
 * const Dashboard = () => {
 *   usePageHeader(); // Solo esta línea para configurar título
 *   return <div>Contenido del dashboard</div>;
 * };
 * ```
 */
export const usePageHeader = (): void => {
  const location = useLocation();
  const { setHeader } = useHeader();

  useEffect(() => {
    const pageConfig = PAGE_HEADERS[location.pathname as keyof typeof PAGE_HEADERS];
    if (pageConfig) {
      setHeader({
        title: pageConfig.title,
        description: pageConfig.description,
        className: ''
      });
    }
  }, [location.pathname, setHeader]);
};
