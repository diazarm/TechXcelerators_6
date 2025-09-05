import React, { useState, useCallback, useMemo } from 'react';
import type { NotificationContextType, Notification } from './types';
import { NotificationContext } from './notification-context';

interface NotificationProviderProps {
  children: React.ReactNode;
}

/** Proveedor del contexto de notificaciones */
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  /** Remover una notificación */
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  /** Agregar una notificación */
  const addNotification = useCallback((notification: Omit<Notification, 'id'>): string => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000, // 5 segundos por defecto
      persistent: notification.persistent ?? false
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remover si no es persistente y tiene duración
    if (!newNotification.persistent && newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, [removeNotification]);

  /** Limpiar todas las notificaciones */
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const contextValue: NotificationContextType = useMemo(() => ({
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  }), [notifications, addNotification, removeNotification, clearAllNotifications]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
