import axios from 'axios';
import { errorService } from './errorService';
import { logger } from './loggerService';
import type { AppError } from '../types/error';
import type { RetryConfig } from './types';

/**
 * Configuración base de Axios para la aplicación
 * 
 * Este archivo configura:
 * - Base URL para todas las requests
 * - Interceptores para JWT automático
 * - Manejo robusto de errores
 * - Retry automático para operaciones fallidas
 * - Logging estructurado
 * - Headers consistentes
 */

// Crear instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor para requests - Agregar token JWT automáticamente
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log de request
    logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data
    }, 'ApiService');
    
    return config;
  },
  (error) => {
    logger.error('Request interceptor error', { error: error.message }, 'ApiService');
    return Promise.reject(error);
  }
);

/**
 * Interceptor para responses - Manejo robusto de errores
 */
api.interceptors.response.use(
  (response) => {
    // Log de response exitoso
    logger.debug(`API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      method: response.config.method,
      url: response.config.url,
      data: response.data
    }, 'ApiService');

    return response;
  },
  async (error: unknown) => {
    const appError = handleApiError(error);
    
    // Si el error es 401 (no autorizado), limpiar token
    // NO redirigir aquí - dejar que AuthProvider maneje la lógica de navegación
    if (isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Emitir evento personalizado para que AuthProvider reaccione
      window.dispatchEvent(new CustomEvent('authTokenExpired'));
    }
    
    return Promise.reject(appError);
  }
);

/**
 * Type guard para verificar si es un error de Axios
 */
function isAxiosError(error: unknown): error is { 
  response?: { status: number; data: unknown }; 
  request?: unknown; 
  code?: string; 
  config?: { url?: string; method?: string }; 
  message: string; 
} {
  return typeof error === 'object' && error !== null && 'message' in error;
}

/**
 * Manejar errores de API y convertirlos a AppError
 */
function handleApiError(error: unknown): AppError {
  if (isAxiosError(error)) {
    if (error.response) {
      // Error con respuesta del servidor
      const errorData = error.response.data as { error?: string; message?: string };
      const errorMessage = errorData?.error || errorData?.message || error.message;
      
      return errorService.createApiError(
        error.config?.url || 'unknown',
        error.config?.method?.toUpperCase() || 'unknown',
        error.response.status,
        error.response.data,
        errorMessage
      );
    } else if (error.request) {
      // Error de red (sin respuesta)
      if (error.code === 'ECONNABORTED') {
        return errorService.createNetworkError(
          'TIMEOUT',
          error.config?.url,
          'La solicitud tardó demasiado tiempo'
        );
      } else if (error.code === 'ERR_NETWORK') {
        return errorService.createNetworkError(
          'CONNECTION',
          error.config?.url,
          'Error de conexión de red'
        );
      } else {
        return errorService.createNetworkError(
          'UNKNOWN',
          error.config?.url,
          'Error de red desconocido'
        );
      }
    }
  }
  
  // Error en la configuración de la solicitud o error desconocido
  return errorService.handleError(error, 'ApiService');
}

/**
 * Wrapper para requests con retry automático
 */
export async function apiRequest<T = unknown>(
  config: Record<string, unknown>,
  retryConfig?: RetryConfig
): Promise<T> {
  const { maxAttempts = 3 } = retryConfig || {};

  return errorService.executeWithRetry(
    async () => {
      const response = await api(config as { url: string; method: string; data?: unknown; headers?: Record<string, string> });
      return response.data as T;
    },
    'ApiService',
    { maxAttempts }
  );
}

/**
 * Métodos HTTP con manejo de errores mejorado
 */
export const apiMethods = {
  get: <T = unknown>(url: string, config?: Record<string, unknown>) =>
    apiRequest<T>({ ...config, method: 'GET', url }),

  post: <T = unknown>(url: string, data?: unknown, config?: Record<string, unknown>) =>
    apiRequest<T>({ ...config, method: 'POST', url, data }),

  put: <T = unknown>(url: string, data?: unknown, config?: Record<string, unknown>) =>
    apiRequest<T>({ ...config, method: 'PUT', url, data }),

  patch: <T = unknown>(url: string, data?: unknown, config?: Record<string, unknown>) =>
    apiRequest<T>({ ...config, method: 'PATCH', url, data }),

  delete: <T = unknown>(url: string, config?: Record<string, unknown>) =>
    apiRequest<T>({ ...config, method: 'DELETE', url })
};

export { api };
export default api;
