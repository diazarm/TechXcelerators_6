import React, { Component } from 'react';
import type { ErrorInfo } from 'react';
import { AlertCircle } from 'react-feather';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import { useScreenSize } from '../../context';

// Los tipos se importan desde ../../types

/** Componente de fallback por defecto para mostrar cuando hay un error */
const DefaultErrorFallback: React.FC<{ error?: Error; onReset?: () => void }> = ({ 
  error, 
  onReset 
}) => {
  const { dimensions, scale } = useScreenSize();

  return (
    <div 
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: 'url(/img/BgLogin.png)' }}
    >
      {/* Overlay con opacidad */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: '#00000066' }}
      />
      
      {/* Contenedor del error centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8" style={{ minHeight: '100vh', paddingTop: dimensions.spacing['2xl'], paddingBottom: dimensions.spacing['2xl'] }}>
        {/* Logo */}
        <div 
          style={{
            width: `${scale(400)}px`,
            height: `${scale(173)}px`,
            marginBottom: dimensions.spacing.lg
          }}
        >
          <img 
            src="/img/Logo3.png" 
            alt="Scala Learning" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Contenedor del error */}
        <div 
          className="text-center shadow-2xl"
          style={{
            backgroundColor: 'rgba(164, 169, 194, 0.5)',
            borderRadius: `${scale(20)}px`,
            padding: dimensions.spacing.lg,
            maxWidth: `${scale(400)}px`,
            minWidth: `${scale(280)}px`,
            width: '90%'
          }}
        >
          {/* Icono de error */}
          <div 
            className="flex justify-center mb-4"
            style={{
              marginBottom: dimensions.spacing.lg
            }}
          >
            <AlertCircle 
              size={scale(48)} 
              className="text-white" 
            />
          </div>
          
          {/* Título */}
          <h1 
            className="text-white montserrat"
            style={{
              fontWeight: 600,
              fontSize: `${scale(20)}px`,
              lineHeight: '100%',
              letterSpacing: '0%',
              marginBottom: dimensions.spacing.md
            }}
          >
            Error del Sistema
          </h1>
          
          {/* Descripción */}
          <p 
            className="text-white istok-web"
            style={{
              fontWeight: 400,
              fontSize: `${scale(14)}px`,
              lineHeight: '120%',
              letterSpacing: '0%',
              marginBottom: dimensions.spacing.md
            }}
          >
            Algo salió mal. Por favor intenta de nuevo o contacta al administrador.
          </p>
          
          {/* Botones de acción */}
          <div 
            style={{
              gap: dimensions.spacing.sm,
              paddingTop: dimensions.spacing.sm,
              paddingBottom: dimensions.spacing.sm,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <button
              onClick={onReset}
              className="w-full text-white transition-colors istok-web"
              style={{
                fontWeight: 400,
                fontSize: `${scale(14)}px`,
                backgroundColor: '#FF6E00',
                boxShadow: '0px 2px 2px 0px #00000020',
                height: `${scale(40)}px`,
                borderRadius: `${scale(50)}px`
              }}
            >
              Intentar de nuevo
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full text-white transition-colors istok-web"
              style={{
                fontWeight: 400,
                fontSize: `${scale(14)}px`,
                backgroundColor: '#5D5A88',
                boxShadow: '0px 2px 2px 0px #00000020',
                height: `${scale(40)}px`,
                borderRadius: `${scale(50)}px`
              }}
            >
              Ir al inicio
            </button>
          </div>
          
          {/* Información técnica (solo en desarrollo) */}
          {import.meta.env.DEV && error && (
            <details className="mt-4 sm:mt-6 text-left">
              <summary 
                className="cursor-pointer text-xs sm:text-sm text-white hover:text-gray-200 istok-web"
                style={{
                  fontWeight: 400,
                  fontSize: '10px'
                }}
              >
                Información técnica (solo desarrollo)
              </summary>
              <div className="mt-2 sm:mt-4 p-3 sm:p-4 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <pre className="text-xs text-red-300 overflow-auto">
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