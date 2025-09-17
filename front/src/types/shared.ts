/**
 * Tipos compartidos entre múltiples módulos
 * NO específicos de un solo componente/servicio
 */

// Tipos de usuario que se usan en auth, components, services
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Solo admin tiene password
  isActive: boolean;
  role: UserRole;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type UserRole = 'user' | 'director';

// Tipos de autenticación compartidos
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ user: User; token: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  type: string;
  keywords: string[];
}
