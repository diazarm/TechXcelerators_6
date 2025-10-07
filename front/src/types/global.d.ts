/**
 * Extensiones globales para TypeScript
 */

declare global {
  interface Window {
    showNotification?: (
      type: 'success' | 'error' | 'warning' | 'info',
      title: string,
      message: string
    ) => void;
  }
}

export {};
