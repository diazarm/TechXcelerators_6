/**
 * Sistema de Manejo de Errores
 * 
 * Tipos y interfaces para un sistema robusto de manejo de errores con categorización,
 * logging estructurado y recuperación automática.
 */

export interface BaseError {
  /** Código único del error */
  code: string;
  /** Mensaje descriptivo del error */
  message: string;
  /** Detalles adicionales del error */
  details?: Record<string, unknown>;
  /** Timestamp del error */
  timestamp: Date;
  /** Stack trace del error (solo en desarrollo) */
  stack?: string;
}

export interface ValidationError extends BaseError {
  /** Campo que falló la validación */
  field: string;
  /** Valor que causó el error */
  value: unknown;
  /** Regla de validación que falló */
  rule: string;
}

export interface ApiError extends BaseError {
  /** Código de estado HTTP */
  status?: number;
  /** URL de la API que falló */
  url?: string;
  /** Método HTTP utilizado */
  method?: string;
  /** Respuesta del servidor */
  response?: unknown;
}

export interface NetworkError extends BaseError {
  /** Tipo de error de red */
  type: 'TIMEOUT' | 'CONNECTION' | 'CORS' | 'UNKNOWN';
  /** URL que falló */
  url?: string;
}

export interface BusinessError extends BaseError {
  /** Categoría del error de negocio */
  category: 'AUTH' | 'PERMISSION' | 'VALIDATION' | 'BUSINESS_RULE';
  /** Acción sugerida para el usuario */
  suggestedAction?: string;
}

export type AppError = ValidationError | ApiError | NetworkError | BusinessError;

export interface ErrorState {
  /** Lista de errores activos */
  errors: AppError[];
  /** Error más crítico */
  criticalError?: AppError;
  /** Si hay errores de validación */
  hasValidationErrors: boolean;
  /** Si hay errores de red */
  hasNetworkErrors: boolean;
}

export interface RetryConfig {
  /** Número máximo de intentos */
  maxAttempts: number;
  /** Delay inicial entre intentos (ms) */
  initialDelay: number;
  /** Factor de multiplicación del delay */
  backoffFactor: number;
  /** Delay máximo entre intentos (ms) */
  maxDelay: number;
}

export interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

export type LogLevelType = LogLevel[keyof LogLevel];

export interface LogEntry {
  /** Nivel del log */
  level: LogLevelType;
  /** Mensaje del log */
  message: string;
  /** Datos adicionales */
  data?: Record<string, unknown>;
  /** Timestamp del log */
  timestamp: Date;
  /** Componente que generó el log */
  component?: string;
  /** Usuario actual (si está autenticado) */
  userId?: string;
}
