/**
 * Tipos para servicios
 */

// Tipos para el logger
export interface LoggerConfig {
  /** Nivel de log mínimo */
  minLevel: 'debug' | 'info' | 'warn' | 'error';
  /** Si debe loggear en consola */
  console: boolean;
  /** Si debe loggear en archivo */
  file: boolean;
  /** Ruta del archivo de log */
  filePath?: string;
  /** Si debe incluir stack trace */
  includeStackTrace?: boolean;
  /** Si debe habilitar logging remoto */
  enableRemoteLogging?: boolean;
  /** Endpoint para logging remoto */
  remoteEndpoint?: string;
}

// Los tipos de Axios se importan directamente desde 'axios'

// Tipos para retry
export interface RetryConfig {
  maxAttempts?: number;
  retryOn?: number[];
}