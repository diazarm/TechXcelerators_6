/**
 * Tipos para las respuestas de la API
 * Sigue el patrón de respuesta estándar del backend
 */

import type { IResource } from './resource';
import type { User } from './shared';

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

/**
 * Respuesta de login con usuario y token
 */
export interface LoginResponseData {
  user: User;
  token: string;
}

/**
 * Respuesta para operaciones de login
 */
export type LoginResponse = ApiResponse<LoginResponseData>;

/**
 * Respuesta para validación de token
 */
export type ValidateTokenResponse = ApiResponse<User>;

// Re-exportar tipos de recursos para conveniencia
export type { IResource };
