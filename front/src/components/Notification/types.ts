/** Tipos para el componente Notification */

export interface NotificationProps {
  /** Tipo de notificación */
  type?: 'success' | 'error' | 'warning' | 'info';
  /** Título de la notificación */
  title?: string;
  /** Mensaje de la notificación */
  message: string;
  /** Función para cerrar la notificación */
  onClose?: () => void;
  /** Si la notificación es visible */
  visible?: boolean;
}
