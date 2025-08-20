import type { User } from '../types/globalTypes';

/**
 * Tipo del contexto de autenticación
 * Define la estructura de datos y métodos disponibles en el contexto
 */
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
