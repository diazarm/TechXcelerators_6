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
export interface LoadingSpinnerProps {
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
