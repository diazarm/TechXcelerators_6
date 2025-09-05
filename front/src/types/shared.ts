/**
 * Tipos compartidos entre múltiples módulos
 * NO específicos de un solo componente/servicio
 */

// Tipos de usuario que se usan en auth, components, services
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

export type UserRole = 'admin' | 'user';

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

// Tipos específicos para cada tipo de login
export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface UserLoginCredentials {
  email: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials, accessType?: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
