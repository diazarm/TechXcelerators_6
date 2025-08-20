import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Tipos de spinner disponibles
 */
export type SpinnerType = 'default' | 'dots' | 'pulse' | 'bars' | 'ring';

/**
 * Tamaños disponibles para el spinner
 */
export type SpinnerSize = 'small' | 'medium' | 'large' | 'xl';

/**
 * Props para el componente LoadingSpinner
 */
interface LoadingSpinnerProps {
  /** Tipo de animación del spinner */
  type?: SpinnerType;
  /** Tamaño del spinner */
  size?: SpinnerSize;
  /** Color del spinner (clases de Tailwind) */
  color?: string;
  /** Mensaje a mostrar debajo del spinner */
  message?: string;
  /** Si debe ocupar toda la pantalla */
  fullScreen?: boolean;
  /** Si debe mostrar overlay de fondo */
  overlay?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * LoadingSpinner - Componente para mostrar estados de carga
 * 
 * Este componente proporciona múltiples tipos de spinners para diferentes situaciones:
 * - Spinner por defecto: Círculo giratorio clásico
 * - Dots: Tres puntos que aparecen secuencialmente
 * - Pulse: Círculo que pulsa
 * - Bars: Barras que suben y bajan
 * - Ring: Anillo que gira
 * 
 * Características:
 * - Múltiples tipos y tamaños
 * - Integrado con useResponsive()
 * - Modo fullScreen para loading global
 * - Overlay opcional
 * - Mensajes personalizables
 * 
 * @example Spinner básico
 * ```tsx
 * <LoadingSpinner />
 * ```
 * 
 * @example Spinner con mensaje
 * ```tsx
 * <LoadingSpinner 
 *   type="dots" 
 *   size="large" 
 *   message="Cargando datos..." 
 * />
 * ```
 * 
 * @example Spinner de pantalla completa
 * ```tsx
 * <LoadingSpinner 
 *   fullScreen 
 *   overlay 
 *   message="Iniciando aplicación..." 
 * />
 * ```
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = 'default',
  size = 'medium',
  color = 'text-blue-600',
  message,
  fullScreen = false,
  overlay = false,
  className = ''
}) => {
  const { text, flex, animation } = useResponsive();

  // Configuración de tamaños
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const messageSizes = {
    small: text.small,
    medium: text.body,
    large: text.h4,
    xl: text.h3
  };

  // Renderizar diferentes tipos de spinners
  const renderSpinner = () => {
    const baseClasses = `${sizeClasses[size]} ${color}`;

    switch (type) {
      case 'default':
        return (
          <div className={`${baseClasses} animate-spin`}>
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        );

      case 'dots':
        return (
          <div className={`${flex.center} space-x-1`}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 ${color.replace('text-', 'bg-')} rounded-full animate-pulse`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`${baseClasses} ${color.replace('text-', 'bg-')} rounded-full animate-ping`} />
        );

      case 'bars':
        return (
          <div className={`${flex.center} space-x-1`}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-1 h-6 ${color.replace('text-', 'bg-')} animate-pulse`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1.2s'
                }}
              />
            ))}
          </div>
        );

      case 'ring':
        return (
          <div className={`${baseClasses} animate-spin`}>
            <div className={`w-full h-full border-4 border-gray-200 border-t-current rounded-full`} />
          </div>
        );

      default:
        return (
          <div className={`${baseClasses} animate-spin`}>
            <div className="w-full h-full border-4 border-gray-200 border-t-current rounded-full" />
          </div>
        );
    }
  };

  // Contenedor del spinner
  const spinnerContent = (
    <div className={`${flex.center} ${flex.col} space-y-4`}>
      {renderSpinner()}
      {message && (
        <p className={`${messageSizes[size]} text-gray-600 text-center ${animation.fadeIn}`}>
          {message}
        </p>
      )}
    </div>
  );

  // Si es fullScreen, renderizar como overlay
  if (fullScreen) {
    return (
      <div className={`
        fixed inset-0 z-50 ${flex.center} ${flex.col}
        ${overlay ? 'bg-white bg-opacity-90 backdrop-blur-sm' : 'bg-white'}
        ${className}
      `}>
        {spinnerContent}
      </div>
    );
  }

  // Spinner normal
  return (
    <div className={`${flex.center} ${flex.col} p-4 ${className}`}>
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
