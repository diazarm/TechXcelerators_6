/**
 * Servicio de logging estructurado
 */

import type { LogEntry, LogLevelType, AppError } from '../types/error';
import type { LoggerConfig } from './types';

class LoggerService {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Máximo de logs en memoria

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      minLevel: 'info',
      console: true,
      file: false,
      includeStackTrace: import.meta.env.DEV,
      enableRemoteLogging: false,
      ...config
    };
  }

  /**
   * Log de error
   */
  error(message: string, data?: Record<string, unknown>, component?: string): void {
    this.log('error', message, data, component);
  }

  /**
   * Log de advertencia
   */
  warn(message: string, data?: Record<string, unknown>, component?: string): void {
    this.log('warn', message, data, component);
  }

  /**
   * Log de información
   */
  info(message: string, data?: Record<string, unknown>, component?: string): void {
    this.log('info', message, data, component);
  }

  /**
   * Log de debug
   */
  debug(message: string, data?: Record<string, unknown>, component?: string): void {
    this.log('debug', message, data, component);
  }

  /**
   * Log de error de aplicación
   */
  logError(error: AppError, component?: string): void {
    this.error(
      `Application Error: ${error.message}`,
      {
        code: error.code,
        details: error.details,
        stack: this.config.includeStackTrace ? error.stack : undefined
      },
      component
    );
  }

  /**
   * Log de error de API
   */
  logApiError(url: string, method: string, status: number, response: unknown): void {
    // No registrar 404 de búsqueda como error (es comportamiento esperado)
    if (status === 404 && url.includes('/search')) {
      return;
    }
    
    this.error(
      `API Error: ${method} ${url} - ${status}`,
      {
        url,
        method,
        status,
        response: this.sanitizeResponse(response)
      },
      'ApiService'
    );
  }

  /**
   * Log de validación
   */
  logValidation(field: string, value: unknown, rule: string, isValid: boolean): void {
    const level = isValid ? 'debug' : 'warn';
    this.log(
      level,
      `Validation: ${field} - ${rule} - ${isValid ? 'PASS' : 'FAIL'}`,
      { field, value, rule, isValid },
      'ValidationService'
    );
  }

  /**
   * Obtener logs recientes
   */
  getRecentLogs(count = 50): LogEntry[] {
    return this.logs.slice(-count);
  }

  /**
   * Limpiar logs antiguos
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Exportar logs para debugging
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Método principal de logging
   */
  private log(
    level: LogLevelType,
    message: string,
    data?: Record<string, unknown>,
    component?: string
  ): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const logEntry: LogEntry = {
      level,
      message,
      data: this.sanitizeData(data),
      timestamp: new Date(),
      component,
      userId: this.getCurrentUserId()
    };

    // Agregar a logs en memoria
    this.logs.push(logEntry);
    this.trimLogs();

    // Log a consola en desarrollo
    if (import.meta.env.DEV) {
      this.logToConsole(logEntry);
    }

    // Enviar a servidor remoto si está habilitado
    if (this.config.enableRemoteLogging && this.config.remoteEndpoint) {
      this.sendToRemote(logEntry);
    }
  }

  /**
   * Verificar si debe hacer log según el nivel
   */
  private shouldLog(level: LogLevelType): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(level);
    const minLevelIndex = levels.indexOf(this.config.minLevel);
    return currentLevelIndex >= minLevelIndex;
  }

  /**
   * Log a consola con formato
   */
  private logToConsole(entry: LogEntry): void {
    const timestamp = entry.timestamp.toISOString();
    const prefix = `[${timestamp}] [${entry.level.toUpperCase()}]`;
    const component = entry.component ? ` [${entry.component}]` : '';
    const message = `${prefix}${component} ${entry.message}`;

    switch (entry.level) {
      case 'error':
        console.error(message, entry.data);
        break;
      case 'warn':
        console.warn(message, entry.data);
        break;
      case 'info':
        console.info(message, entry.data);
        break;
      case 'debug':
        console.debug(message, entry.data);
        break;
    }
  }

  /**
   * Enviar log a servidor remoto
   */
  private async sendToRemote(entry: LogEntry): Promise<void> {
    try {
      await fetch(this.config.remoteEndpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      });
    } catch (error) {
      // No hacer log del error de logging para evitar loops infinitos
      console.error('Failed to send log to remote server:', error);
    }
  }

  /**
   * Sanitizar datos sensibles
   */
  private sanitizeData(data?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!data) return undefined;

    const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth'];
    const sanitized = { ...data };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  /**
   * Sanitizar respuesta de API
   */
  private sanitizeResponse(response: unknown): unknown {
    if (typeof response === 'object' && response !== null) {
      return this.sanitizeData(response as Record<string, unknown>);
    }
    return response;
  }

  /**
   * Obtener ID del usuario actual
   */
  private getCurrentUserId(): string | undefined {
    // TODO: Integrar con AuthContext cuando esté disponible
    return undefined;
  }

  /**
   * Limpiar logs antiguos
   */
  private trimLogs(): void {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }
}

// Instancia singleton
export const logger = new LoggerService({
  minLevel: import.meta.env.DEV ? 'debug' : 'warn',
  enableRemoteLogging: import.meta.env.PROD
});

export default logger;
