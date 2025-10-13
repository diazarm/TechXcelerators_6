/**
 * Exportación centralizada de todas las constantes del proyecto
 * 
 * Este archivo centraliza la exportación de constantes para mantener
 * consistencia con el patrón de importación del resto del proyecto.
 * 
 * @example
 * ```tsx
 * // ✅ CORRECTO - Importación centralizada
 * import { APP_NAME, MOCK_DELAY, VALIDATION_RULES } from '../../constants';
 * 
 * // ❌ INCORRECTO - Importación directa
 * import { APP_NAME } from '../../constants/appConstants';
 * ```
 */

export * from './appConstants';
export * from './colors';
export * from './cardConfigs';
export * from './iconFactory';
export * from './pageHeaders';
export * from './notificationMessages';
export * from './sectionMapping';
export * from './allianceData';
