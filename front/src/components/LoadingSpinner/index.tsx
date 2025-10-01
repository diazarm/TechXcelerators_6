import React from 'react';
import type { LoadingSpinnerProps } from './types';
import { useResponsive, useComponentDimensions } from '../../hooks';
import { COLOR_CLASSES } from '../../constants';

/** Spinner de carga reutilizable con estilos responsive */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = 'default',
  size = 'medium',
  color,
  message,
  fullScreen = false,
  overlay = false,
  className = ''
}) => {
  // Usar color por defecto de la aplicación si no se especifica
  const spinnerColor = color || COLOR_CLASSES.primary;
  const { text, flex, animation } = useResponsive();
  const dimensions = useComponentDimensions();

  // Configuración de tamaños escalados
  const sizeClasses = {
    small: { width: dimensions.spacing.sm, height: dimensions.spacing.sm },
    medium: { width: dimensions.spacing.md, height: dimensions.spacing.md },
    large: { width: dimensions.spacing.lg, height: dimensions.spacing.lg },
    xl: { width: dimensions.spacing.xl, height: dimensions.spacing.xl }
  };

  const messageSizes = {
    small: dimensions.fontSize.sm,
    medium: dimensions.fontSize.md,
    large: dimensions.fontSize.lg,
    xl: dimensions.fontSize.xl
  };

  // Colores de texto para mensajes
  const messageColor = COLOR_CLASSES.textSecondary;

  // Renderizar diferentes tipos de spinners
  const renderSpinner = () => {
    const baseSize = sizeClasses[size];

    switch (type) {
      case 'default':
        return (
          <div className={`animate-spin ${spinnerColor}`} style={baseSize}>
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
                className={`w-2 h-2 ${spinnerColor.replace('text-', 'bg-')} rounded-full animate-pulse`}
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
          <div 
            className={`${spinnerColor.replace('text-', 'bg-')} rounded-full animate-ping`} 
            style={baseSize} 
          />
        );

      case 'bars':
        return (
          <div className={`${flex.center} space-x-1`}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-1 h-6 ${spinnerColor.replace('text-', 'bg-')} animate-pulse`}
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
          <div className={`animate-spin ${spinnerColor}`} style={baseSize}>
            <div className={`w-full h-full border-4 border-gray-200 border-t-current rounded-full`} />
          </div>
        );

      default:
        return (
          <div className={`animate-spin ${spinnerColor}`} style={baseSize}>
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
        <p 
          className={`${messageColor} text-center ${animation.fadeIn}`}
          style={{ fontSize: messageSizes[size] }}
        >
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
        ${overlay ? 'bg-white bg-opacity-90 backdrop-blur-sm' : COLOR_CLASSES.background}
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
