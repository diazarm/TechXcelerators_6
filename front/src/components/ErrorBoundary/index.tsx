import React, { Component } from 'react';
import type { ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import { useResponsive } from '../../hooks';

// Los tipos se importan desde ../../types

/** Componente de fallback por defecto para mostrar cuando hay un error */
const DefaultErrorFallback: React.FC<{ error?: Error; onReset?: () => void }> = ({ 
  error, 
  onReset 
}) => {
  const { container, text, spacing, shadow, border } = useResponsive();

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className={`${container} max-w-2xl`}>
        <div className={`bg-white ${border.radius.large} p-8 ${shadow.large} text-center`}>
          {/* Icono de error */}
          <div className="text-6xl mb-6">💥</div>
          
          {/* Título */}
          <h1 className={`${text.h2} text-gray-900 mb-4`}>
            ¡Oops! Algo salió mal
          </h1>
          
          {/* Descripción */}
          <p className={`${text.body} text-gray-600 mb-6`}>
            No te preocupes, nuestro equipo ha sido notificado del problema.
            Puedes intentar recargar la página o contactarnos si el problema persiste.
          </p>
          
          {/* Botones de acción */}
          <div className={`${spacing.py.small} space-y-4`}>
            <button
              onClick={onReset}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              🔄 Intentar de nuevo
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              🏠 Ir al inicio
            </button>
          </div>
          
          {/* Información técnica (solo en desarrollo) */}
          {import.meta.env.DEV && error && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                📋 Información técnica (solo desarrollo)
              </summary>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <pre className="text-xs text-red-600 overflow-auto">
                  {error.toString()}
                </pre>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

/** ErrorBoundary - Captura errores de React y muestra UI de fallback */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /** Método estático que se llama cuando hay un error */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  /** Se llama cuando hay un error en un componente descendiente */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Aquí puedes enviar el error a un servicio de logging como Sentry
    // logErrorToService(error, errorInfo);
  }

  /**
   * Resetea el estado de error para permitir reintentar
   */
  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Si se proporciona un fallback personalizado, úsalo
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Sino, usa el fallback por defecto
      return (
        <DefaultErrorFallback 
          error={this.state.error} 
          onReset={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
