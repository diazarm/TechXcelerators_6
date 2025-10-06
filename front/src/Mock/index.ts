/**
 * Exportaciones centralizadas de Mock Data
 * 
 * Este archivo centraliza todas las exportaciones de datos de prueba
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar mock data desde un solo lugar
 * import { 
 *   mockAlliances, 
 *   getActiveAlliances,
 *   mockSearchData 
 * } from '../Mock';
 * ```
 */

// Mock data de alianzas
export { 
  mockAlliances, 
  getActiveAlliances, 
  getDeletedAlliances, 
  getInactiveAlliances 
} from './mockAlliances';

// Mock data de recursos
export { mockResources } from './MockResources';

// Mock data de búsqueda
export { mockSearchData } from './MockSearchData';
