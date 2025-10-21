import { useContext, useCallback } from 'react';
import { NotificationContext } from '../context/notification';
import type { NotificationContextType } from '../context/notification/types';

/**
 * Hook para usar notificaciones globales
 */
export const useNotification = (): NotificationContextType & {
  showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
} => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification debe usarse dentro de NotificationProvider');
  }

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    context.addNotification({
      type,
      message,
      duration: type === 'error' ? 5000 : 5000, // 5 segundos para todos
    });
  }, [context]);

  return {
    ...context,
    showNotification,
  };
};
