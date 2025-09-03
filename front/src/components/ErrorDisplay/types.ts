/**
 * Tipos para el componente ErrorDisplay
 */

import type { AppError } from '../../types/error';

export interface ErrorDisplayProps {
  /** Error a mostrar */
  error: AppError | null;
  /** Título del error */
  title?: string;
  /** Si mostrar detalles técnicos */
  showDetails?: boolean;
  /** Función para reintentar */
  onRetry?: () => void;
  /** Función para cerrar el error */
  onDismiss?: () => void;
  /** Clases CSS adicionales */
  className?: string;
}
