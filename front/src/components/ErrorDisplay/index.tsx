/**
 * Componente para mostrar errores de manera consistente
 */

import React from 'react';
import { useResponsive } from '../../hooks';
import type { ErrorDisplayProps } from './types';

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title = 'Error',
  showDetails = false,
  onRetry,
  onDismiss,
  className = ''
}) => {
  const responsive = useResponsive();

  if (!error) return null;

  const getErrorIcon = () => {
    if (error.code.startsWith('NETWORK_')) return '🌐';
    if (error.code.startsWith('API_')) return '🔌';
    if (error.code.startsWith('VALIDATION_')) return '⚠️';
    if (error.code.startsWith('BUSINESS_')) return '🚫';
    return '❌';
  };

  const getFriendlyMessage = (error: any) => {
    if (error.code.startsWith('NETWORK_')) {
      return 'Parece que hay un problema de conexión. Verifica tu internet e intenta nuevamente.';
    }
    if (error.code.startsWith('API_')) {
      return 'El servidor no está respondiendo correctamente. Por favor, intenta más tarde.';
    }
    if (error.code.startsWith('VALIDATION_')) {
      return 'Hay un problema con la información ingresada. Revisa los campos marcados.';
    }
    if (error.code.startsWith('BUSINESS_')) {
      return error.message || 'No se pudo completar la operación. Intenta nuevamente.';
    }
    return error.message || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
  };

  const getErrorColor = () => {
    if (error.code.startsWith('NETWORK_')) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (error.code.startsWith('API_')) return 'text-red-600 bg-red-50 border-red-200';
    if (error.code.startsWith('VALIDATION_')) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (error.code.startsWith('BUSINESS_')) return 'text-purple-600 bg-purple-50 border-purple-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className={`rounded-lg border p-4 ${getErrorColor()} ${className}`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{getErrorIcon()}</div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${responsive.text.small}`}>
            {title}
          </h3>
          
          <p className={`mt-1 ${responsive.text.xsmall} opacity-90`}>
            {getFriendlyMessage(error)}
          </p>

          {showDetails && error.details && (
            <details className="mt-2">
              <summary className={`cursor-pointer ${responsive.text.xsmall} font-medium`}>
                Detalles técnicos
              </summary>
              <pre className={`mt-2 p-2 bg-white bg-opacity-50 rounded text-xs overflow-auto max-h-32`}>
                {JSON.stringify(error.details, null, 2)}
              </pre>
            </details>
          )}

          {error.code.startsWith('BUSINESS_') && 'suggestedAction' in error && error.suggestedAction && (
            <div className="mt-2 p-2 bg-white bg-opacity-30 rounded">
              <p className={`${responsive.text.xsmall} font-medium`}>
                💡 {error.suggestedAction}
              </p>
            </div>
          )}

          <div className="flex gap-2 mt-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className={`px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-xs font-medium transition-colors`}
              >
                🔄 Reintentar
              </button>
            )}
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className={`px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-xs font-medium transition-colors`}
              >
                ✕ Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
