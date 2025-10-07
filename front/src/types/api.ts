/**
 * Tipos para las respuestas de la API
 * Sigue el patrón de respuesta estándar del backend
 */

import type { IResource } from './resource';

/**
 * Respuesta estándar de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * Respuesta para operaciones de recursos
 */
export type ResourceResponse = ApiResponse<IResource>;

/**
 * Respuesta para listas de recursos
 */
export type ResourceListResponse = ApiResponse<IResource[]>;

// Re-exportar tipos de recursos para conveniencia
export type { IResource };
