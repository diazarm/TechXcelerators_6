import { createContext } from 'react';
import type { AuthContextType } from '../../types';

/**
 * Contexto de autenticación
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Re-exportar el tipo para facilitar imports
export type { AuthContextType };
