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

// Exportaciones del servicio de búsqueda
export { searchService } from './searchService';

// Exportaciones del servicio de logos
export { getLogoForAlliance, hasCustomLogo, getAvailableLogos } from './logoService';

// Exportaciones del servicio de navegación de alianzas
export {
  getResourcesBySection,
  getAlliances,
  findResourceByName,
  filterAlliances,
  shouldShowModal,
  navigateToUrl,
  showNotification,
  findAllianceLink,
  findAllAllianceLinks,
  showAllianceSelectionModal,
  handleAllianceCardClick
} from './allianceNavigationService';

// Exportaciones del servicio de gestión de recursos
export {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  softDeleteResource,
  restoreResource,
  getResourceIdByName,
  getResourceByName,
  RESOURCE_NAME_TO_ID_MAP
} from './resourceManagementService';

// Exportar tipos de servicios
export type { LoggerConfig } from './types';
export type { CreateResourceData, UpdateResourceData } from './resourceManagementService';
