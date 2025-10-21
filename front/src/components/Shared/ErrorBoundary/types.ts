import type { ReactNode, ErrorInfo } from 'react';

/**
 * Props para el componente ErrorBoundary
 */
export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

/**
 * State del componente ErrorBoundary
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}
