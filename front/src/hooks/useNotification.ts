import { useContext } from 'react';
import { NotificationContext } from '../context/notification';
import type { NotificationContextType } from '../context/notification/types';

/**
 * Hook para usar notificaciones globales
 */
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification debe usarse dentro de NotificationProvider');
  }
  
  return context;
};
