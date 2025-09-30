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
  getCurrentUser,
  refreshToken
} from './authService';

// Exportaciones de la instancia de API
export { default as api, apiMethods } from './api';

// Exportaciones de servicios de error y validación
export { default as logger } from './loggerService';
export { default as errorService } from './errorService';
export { default as validationService } from './validationService';

// Exportar ValidationRules desde types
export { ValidationRules } from '../types/validation';

// Exportaciones del servicio de alianzas
export { AllianceService, allianceService } from './allianceService';

// Exportaciones del servicio de recursos
export { ResourceService } from './resourceService';

// Exportar tipos de servicios
export type { LoggerConfig } from './types';
