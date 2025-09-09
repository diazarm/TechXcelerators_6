/** Tipos para el contexto de notificaciones */

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number; // en milisegundos, 0 = no auto-hide
  persistent?: boolean; // si no se puede cerrar automáticamente
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}
