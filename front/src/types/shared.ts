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
  category: 'Alianza' | 'Recurso' | 'Sección';
  path: string;
  type: 'Alianza' | 'Recurso' | 'Sección';
  keywords: string[];
  content?: string; // Para resources que tienen content
  
  // Información adicional para mejor UX en el modal
  subtitle?: string; // Información secundaria (siglas, sección, etc.)
  actionText?: string; // Texto del botón de acción
  hasUrl?: boolean; // Si tiene URL (para alianzas)
  linksCount?: number; // Cantidad de links (para recursos)
  resourcesCount?: number; // Cantidad de recursos (para secciones)
  url?: string; // URL real del backend para navegación
}

// Estructura de respuesta del backend
export interface BackendSearchResponse {
  query: string;
  keywords: string[];
  results: {
    alliances: Array<{
      _id: string;
      name: string;
      description: string;
      siglas?: string;
      url?: string;
    }>;
    resources: Array<{
      _id: string;
      title: string;
      description: string;
      content?: string;
      sectionName?: string;
      links?: Array<{
        label?: string;
        url: string;
      }>;
    }>;
    sections: Array<{
      _id: string;
      name: string;
      description: string;
      resourcesCount?: number;
    }>;
  };
  total: number;
  pagination: {
    page: number;
    limit: number;
  };
}
