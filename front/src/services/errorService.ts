/**
 * ErrorService
 * 
 * Servicio centralizado para manejo robusto de errores con categorización,
 * logging automático, reintentos y recuperación de errores.
 */

import type { AppError, RetryConfig, ApiError, NetworkError, BusinessError, ValidationError } from '../types/error';
import { logger } from './loggerService';

class ErrorService {
  private retryConfig: RetryConfig = {
    maxAttempts: 3,
    initialDelay: 1000,
    backoffFactor: 2,
    maxDelay: 10000
  };

  /**
   * Crear error de validación
   */
  createValidationError(
    field: string,
    value: unknown,
    rule: string,
    message?: string
  ): ValidationError {
    const error: ValidationError = {
      code: `VALIDATION_${rule.toUpperCase()}`,
      message: message || `Error de validación en ${field}`,
      field,
      value,
      rule,
      timestamp: new Date(),
      stack: this.getStackTrace()
    };

    logger.logError(error, 'ValidationService');
    return error;
  }

  /**
   * Crear error de API
   */
  createApiError(
    url: string,
    method: string,
    status: number,
    response?: unknown,
    message?: string
  ): ApiError {
    const error: ApiError = {
      code: `API_${status}`,
      message: message || `Error de API: ${method} ${url} - ${status}`,
      status,
      url,
      method,
      response,
      timestamp: new Date(),
      stack: this.getStackTrace()
    };

    logger.logApiError(url, method, status, response);
    return error;
  }

  /**
   * Crear error de red
   */
  createNetworkError(
    type: 'TIMEOUT' | 'CONNECTION' | 'CORS' | 'UNKNOWN',
    url?: string,
    message?: string
  ): NetworkError {
    const error: NetworkError = {
      code: `NETWORK_${type}`,
      message: message || `Error de red: ${type}`,
      type,
      url,
      timestamp: new Date(),
      stack: this.getStackTrace()
    };

    logger.logError(error, 'NetworkService');
    return error;
  }

  /**
   * Crear error de negocio
   */
  createBusinessError(
    category: 'AUTH' | 'PERMISSION' | 'VALIDATION' | 'BUSINESS_RULE',
    message: string,
    suggestedAction?: string
  ): BusinessError {
    const error: BusinessError = {
      code: `BUSINESS_${category}`,
      message,
      category,
      suggestedAction,
      timestamp: new Date(),
      stack: this.getStackTrace()
    };

    logger.logError(error, 'BusinessService');
    return error;
  }

  /**
   * Manejar error genérico
   */
  handleError(error: unknown, context?: string): AppError {
    if (this.isAppError(error)) {
      return error;
    }

    if (error instanceof Error) {
      const appError: AppError = {
        code: 'UNKNOWN_ERROR',
        message: error.message,
        timestamp: new Date(),
        stack: error.stack,
        details: { originalError: error.name }
      };

      logger.logError(appError, context);
      return appError;
    }

    const appError: AppError = {
      code: 'UNKNOWN_ERROR',
      message: 'Error desconocido',
      timestamp: new Date(),
      details: { originalError: String(error) }
    };

    logger.logError(appError, context);
    return appError;
  }

  /**
   * Ejecutar operación con retry automático
   */
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    context?: string,
    customRetryConfig?: Partial<RetryConfig>
  ): Promise<T> {
    const config = { ...this.retryConfig, ...customRetryConfig };
    let lastError: unknown;

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        logger.debug(`Executing operation (attempt ${attempt}/${config.maxAttempts})`, {}, context);
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === config.maxAttempts) {
          logger.error(`Operation failed after ${config.maxAttempts} attempts`, {
            attempts: config.maxAttempts,
            error: error instanceof Error ? error.message : 'Unknown error'
          }, context);
          break;
        }

        const delay = this.calculateDelay(attempt, config);
        logger.warn(`Operation failed, retrying in ${delay}ms (attempt ${attempt}/${config.maxAttempts})`, {
          attempt,
          maxAttempts: config.maxAttempts,
          delay,
          error: error instanceof Error ? error.message : 'Unknown error'
        }, context);

        await this.sleep(delay);
      }
    }

    throw this.handleError(lastError, context);
  }

  /**
   * Verificar si un error es recuperable
   */
  isRecoverableError(error: AppError): boolean {
    if (error.code.startsWith('NETWORK_')) {
      return true; // Errores de red son recuperables
    }

    if (error.code.startsWith('API_')) {
      const apiError = error as ApiError;
      // Errores 5xx y algunos 4xx son recuperables
      return apiError.status ? apiError.status >= 500 || apiError.status === 429 : false;
    }

    return false;
  }

  /**
   * Obtener mensaje de error amigable para el usuario
   */
  getUserFriendlyMessage(error: AppError): string {
    switch (error.code) {
      case 'NETWORK_TIMEOUT':
        return 'La operación tardó demasiado. Por favor, intenta nuevamente.';
      case 'NETWORK_CONNECTION':
        return 'No hay conexión a internet. Verifica tu conexión.';
      case 'NETWORK_CORS':
        return 'Error de configuración del servidor. Contacta al administrador.';
      case 'API_401':
        return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
      case 'API_403':
        return 'No tienes permisos para realizar esta acción.';
      case 'API_404':
        return 'El recurso solicitado no fue encontrado.';
      case 'API_429':
        return 'Demasiadas solicitudes. Por favor, espera un momento.';
      case 'API_500':
      case 'API_502':
      case 'API_503':
      case 'API_504':
        return 'Error del servidor. Por favor, intenta nuevamente más tarde.';
      case 'BUSINESS_AUTH':
        return 'Error de autenticación. Verifica tus credenciales.';
      case 'BUSINESS_PERMISSION':
        return 'No tienes permisos para realizar esta acción.';
      default:
        return error.message || 'Ha ocurrido un error inesperado.';
    }
  }

  /**
   * Configurar retry
   */
  setRetryConfig(config: Partial<RetryConfig>): void {
    this.retryConfig = { ...this.retryConfig, ...config };
  }

  /**
   * Verificar si es un AppError
   */
  private isAppError(error: unknown): error is AppError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'message' in error &&
      'timestamp' in error
    );
  }

  /**
   * Obtener stack trace
   */
  private getStackTrace(): string | undefined {
    if (import.meta.env.DEV) {
      return new Error().stack;
    }
    return undefined;
  }

  /**
   * Calcular delay para retry
   */
  private calculateDelay(attempt: number, config: RetryConfig): number {
    const delay = config.initialDelay * Math.pow(config.backoffFactor, attempt - 1);
    return Math.min(delay, config.maxDelay);
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Instancia singleton
export const errorService = new ErrorService();

export default errorService;
