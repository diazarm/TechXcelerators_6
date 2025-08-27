/**
 * Constantes de la aplicación - Solo las que realmente se usan
 * 
 * @example
 * import { APP_NAME, MOCK_DELAY } from '../../constants';
 */

// Información básica de la aplicación
export const APP_NAME = 'TechXcelerators';
export const APP_VERSION = '1.0.0';

// Constantes para simulación y testing
export const MOCK_DELAY = 1000; // Delay para simular llamadas API
export const DEFAULT_TIMEOUT = 5000; // Timeout por defecto para operaciones

// Constantes para validación (cuando se implementen formularios)
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50
} as const;

// Constantes para UI/UX (cuando se implementen componentes)
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  MAX_FILE_SIZE: 5 * 1024 * 1024 // 5MB
} as const;
