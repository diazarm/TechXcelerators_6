import { createContext } from 'react';
import type { NotificationContextType } from './types';

/**
 * Contexto de notificaciones global
 */
export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Re-exportar el tipo para facilitar imports
export type { NotificationContextType };
