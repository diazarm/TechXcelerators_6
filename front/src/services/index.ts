/**
 * Exportaciones centralizadas de TODOS los servicios
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con servicios
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar servicios desde un solo lugar
 * import { 
 *   login, 
 *   validateToken, 
 *   logout, 
 *   getCurrentUser 
 * } from '../services';
 * ```
 */

// Exportaciones del servicio de autenticación
export { 
  login, 
  validateToken, 
  logout, 
  getCurrentUser 
} from './authService';

// Exportaciones de la instancia de API
export { default as api } from './api';
