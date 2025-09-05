/**
 * useErrorHandler Hook
 * 
 * Hook para manejo global de errores con logging automático,
 * notificaciones al usuario y recuperación de errores.
 */

import { useState, useCallback, useEffect } from 'react';
import { errorService, logger } from '../services';
import { useNotification } from './useNotification';
import type { AppError, ErrorState } from '../types/error';
import type { UseErrorHandlerOptions, UseErrorHandlerReturn } from './types';



export function useErrorHandler(options: UseErrorHandlerOptions = {}): UseErrorHandlerReturn {
  const {
    autoShow = true,
    autoHideDelay = 5000,
    onError,
    onErrorResolved
  } = options;

  const { addNotification } = useNotification();

  const [errorState, setErrorState] = useState<ErrorState>({
    errors: [],
    hasValidationErrors: false,
    hasNetworkErrors: false
  });

  /**
   * Remover un error
   */
  const removeError = useCallback((errorCode: string) => {
    setErrorState(prev => {
      const errorToRemove = prev.errors.find(e => e.code === errorCode);
      if (!errorToRemove) return prev;

      const newErrors = prev.errors.filter(e => e.code !== errorCode);
      const hasValidationErrors = newErrors.some(e => e.code.startsWith('VALIDATION_'));
      const hasNetworkErrors = newErrors.some(e => e.code.startsWith('NETWORK_'));
      const criticalError = newErrors.find(e => 
        e.code.startsWith('API_5') || 
        e.code.startsWith('NETWORK_') ||
        e.code.startsWith('BUSINESS_AUTH')
      ) || newErrors[0];

      const newState: ErrorState = {
        errors: newErrors,
        hasValidationErrors,
        hasNetworkErrors,
        criticalError
      };

      logger.debug('Error removed from handler', {
        errorCode,
        remainingErrors: newErrors.length
      }, 'ErrorHandler');

      onErrorResolved?.(errorToRemove);
      return newState;
    });
  }, [onErrorResolved]);

  /**
   * Agregar un error
   */
  const addError = useCallback((error: AppError) => {
    setErrorState(prev => {
      // Evitar duplicados
      const existingError = prev.errors.find(e => e.code === error.code);
      if (existingError) return prev;

      const newErrors = [...prev.errors, error];
      const hasValidationErrors = newErrors.some(e => e.code.startsWith('VALIDATION_'));
      const hasNetworkErrors = newErrors.some(e => e.code.startsWith('NETWORK_'));
      const criticalError = newErrors.find(e => 
        e.code.startsWith('API_5') || 
        e.code.startsWith('NETWORK_') ||
        e.code.startsWith('BUSINESS_AUTH')
      ) || newErrors[0];

      const newState: ErrorState = {
        errors: newErrors,
        hasValidationErrors,
        hasNetworkErrors,
        criticalError
      };

      logger.info('Error added to handler', {
        errorCode: error.code,
        errorMessage: error.message,
        totalErrors: newErrors.length
      }, 'ErrorHandler');

      onError?.(error);
      return newState;
    });

    // Mostrar notificación basada en el tipo de error
    if (autoShow) {
      let notificationType: 'error' | 'warning' | 'info' = 'error';
      let title = 'Error del sistema';
      let message = error.message;
      let duration = 0; // Por defecto no auto-hide

      if (error.code.startsWith('VALIDATION_')) {
        notificationType = 'warning';
        title = 'Datos incompletos';
        message = 'Por favor, revisa los campos marcados y completa la información requerida.';
        duration = 5000;
      } else if (error.code.startsWith('NETWORK_')) {
        notificationType = 'error';
        title = 'Sin conexión';
        message = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
        duration = 0;
      } else if (error.code.startsWith('API_5')) {
        notificationType = 'error';
        title = 'Error del servidor';
        message = 'El servidor está experimentando problemas. Intenta nuevamente en unos minutos.';
        duration = 0;
      } else if (error.code.startsWith('BUSINESS_AUTH')) {
        notificationType = 'error';
        title = 'Acceso denegado';
        message = 'No tienes permisos para realizar esta acción.';
        duration = 0;
      }

      addNotification({
        type: notificationType,
        title,
        message,
        duration
      });
    }

    // Auto-ocultar errores no críticos
    if (autoShow && !error.code.startsWith('API_5') && !error.code.startsWith('NETWORK_')) {
      setTimeout(() => {
        removeError(error.code);
      }, autoHideDelay);
    }
  }, [autoShow, autoHideDelay, onError, removeError, addNotification]);

  /**
   * Limpiar todos los errores
   */
  const clearErrors = useCallback(() => {
    setErrorState({
      errors: [],
      hasValidationErrors: false,
      hasNetworkErrors: false
    });

    logger.info('All errors cleared', {}, 'ErrorHandler');
  }, []);

  /**
   * Manejar un error genérico
   */
  const handleError = useCallback((error: unknown, context?: string): AppError => {
    const appError = errorService.handleError(error, context);
    addError(appError);
    return appError;
  }, [addError]);

  /**
   * Reintentar operación que falló
   */
  const retryOperation = useCallback(async (
    operation: () => Promise<void>,
    context?: string
  ): Promise<void> => {
    try {
      await errorService.executeWithRetry(operation, context);
      
      // Si la operación fue exitosa, limpiar errores relacionados
      setErrorState(prev => ({
        ...prev,
        errors: prev.errors.filter(e => 
          !e.code.startsWith('NETWORK_') && 
          !e.code.startsWith('API_5')
        )
      }));

      logger.info('Operation retry successful', { context }, 'ErrorHandler');
    } catch (error) {
      handleError(error, context);
    }
  }, [handleError]);

  /**
   * Limpiar errores cuando el componente se desmonta
   */
  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  return {
    errorState,
    hasErrors: errorState.errors.length > 0,
    criticalError: errorState.criticalError || null,
    addError,
    removeError,
    clearErrors,
    handleError,
    retryOperation
  };
}
