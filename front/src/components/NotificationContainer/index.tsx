import React from 'react';
import { useNotification } from '../../hooks';
import { Notification } from '../Notification';

/** Contenedor que muestra todas las notificaciones globales */
export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          visible={true}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};
