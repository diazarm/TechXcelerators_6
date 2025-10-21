# 🌐 Servicios de API - Scala Learning Frontend

## 📋 Descripción General

Servicios que manejan toda la comunicación con el backend, proporcionando una capa de abstracción entre la UI y la API REST. Organizados por funcionalidad siguiendo patrones consistentes.

## 🏗️ Estructura de Servicios

```
src/services/
├── api.ts                      # Configuración base de API
├── authService.ts              # Autenticación y autorización
├── resourceService.ts          # Gestión de recursos
├── documentService.ts          # Gestión de documentos
├── userService.ts              # Gestión de usuarios
├── allianceService.ts          # Gestión de alianzas
├── searchService.ts            # Búsqueda global
├── resourceManagementService.ts # Gestión avanzada de recursos
├── allianceNavigationService.ts # Navegación de alianzas
├── logoService.ts              # Gestión de logos
├── errorService.ts             # Manejo de errores
├── loggerService.ts            # Logging
├── validationService.ts        # Validaciones
├── types.ts                    # Tipos de servicios
└── index.ts                    # Exportaciones centralizadas
```

## 🔧 Configuración Base

### api.ts
**Propósito**: Configuración centralizada de Axios

**Características**:
- Configuración base de Axios
- Interceptors para requests/responses
- Manejo de tokens JWT
- Manejo de errores globales

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 🔐 Autenticación

### authService.ts
**Propósito**: Gestión de autenticación y autorización

**API**:
```typescript
class AuthService {
  async login(email: string, password: string): Promise<LoginResponse>;
  async register(userData: RegisterData): Promise<RegisterResponse>;
  async logout(): Promise<void>;
  async verifyToken(): Promise<User>;
  async refreshToken(): Promise<TokenResponse>;
  async changePassword(data: ChangePasswordData): Promise<void>;
}
```

**Uso**:
```typescript
import { authService } from '../services/authService';

const response = await authService.login('user@example.com', 'password');
const newUser = await authService.register({
  name: 'Juan Pérez',
  email: 'juan@example.com',
  password: 'password123'
});
```

## 📚 Gestión de Recursos

### resourceService.ts
**Propósito**: CRUD completo de recursos educativos

**API**:
```typescript
class ResourceService {
  async getAllResources(): Promise<IResource[]>;
  async getResourcesBySection(sectionId: string): Promise<IResource[]>;
  async getResourceById(id: string): Promise<IResource>;
  async createResource(data: CreateResourceData): Promise<IResource>;
  async updateResource(id: string, data: UpdateResourceData): Promise<IResource>;
  async deleteResource(id: string): Promise<void>;
  async restoreResource(id: string): Promise<IResource>;
  async searchResources(query: string, filters?: SearchFilters): Promise<IResource[]>;
}
```

**Tipos**:
```typescript
interface CreateResourceData {
  name: string;
  description: string;
  sectionId: string;
  links: Array<{
    label: string;
    url: string;
  }>;
}

interface UpdateResourceData {
  name?: string;
  description?: string;
  links?: Array<{
    label: string;
    url: string;
  }>;
}
```

### resourceManagementService.ts
**Propósito**: Gestión avanzada de recursos con funcionalidades adicionales

**API**:
```typescript
class ResourceManagementService {
  async getResourceByName(name: string): Promise<IResource>;
  async updateResource(id: string, data: UpdateResourceData): Promise<IResource>;
  async softDeleteResource(id: string): Promise<void>;
  async restoreResource(id: string): Promise<IResource>;
  async getDeletedResources(): Promise<IResource[]>;
  async duplicateResource(id: string): Promise<IResource>;
}
```

## 📄 Gestión de Documentos

### documentService.ts
**Propósito**: CRUD completo de documentos

**API**:
```typescript
class DocumentService {
  async getAllDocuments(): Promise<IDocument[]>;
  async getDocumentsBySection(sectionId: string): Promise<IDocument[]>;
  async getDocumentById(id: string): Promise<IDocument>;
  async uploadDocument(data: UploadDocumentData): Promise<IDocument>;
  async updateDocument(id: string, data: UpdateDocumentData): Promise<IDocument>;
  async deleteDocument(id: string): Promise<void>;
  async restoreDocument(id: string): Promise<IDocument>;
  async downloadDocument(id: string): Promise<Blob>;
}
```

**Tipos**:
```typescript
interface UploadDocumentData {
  name: string;
  description?: string;
  sectionId: string;
  file: File;
  isVisible?: boolean;
}

interface UpdateDocumentData {
  name?: string;
  description?: string;
  isVisible?: boolean;
}
```

## 👥 Gestión de Usuarios

### userService.ts
**Propósito**: CRUD completo de usuarios

**API**:
```typescript
class UserService {
  async getAllUsers(): Promise<IUser[]>;
  async getUserById(id: string): Promise<IUser>;
  async createUser(data: CreateUserData): Promise<IUser>;
  async updateUser(id: string, data: UpdateUserData): Promise<IUser>;
  async deleteUser(id: string): Promise<void>;
  async changeUserRole(id: string, role: UserRole): Promise<IUser>;
  async toggleUserStatus(id: string): Promise<IUser>;
}
```

**Tipos**:
```typescript
interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'director' | 'admin';
}

interface UpdateUserData {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}

type UserRole = 'user' | 'director' | 'admin';
```

## 🏛️ Gestión de Alianzas

### allianceService.ts
**Propósito**: Gestión de alianzas universitarias

**API**:
```typescript
class AllianceService {
  async getAlliances(): Promise<IAlliance[]>;
  async getAllianceById(id: string): Promise<IAlliance>;
  async createAlliance(data: CreateAllianceData): Promise<IAlliance>;
  async updateAlliance(id: string, data: UpdateAllianceData): Promise<IAlliance>;
  async deleteAlliance(id: string): Promise<void>;
}
```

### allianceNavigationService.ts
**Propósito**: Navegación y gestión de alianzas

**API**:
```typescript
class AllianceNavigationService {
  async handleAllianceClick(sectionType: string, resourceName?: string): Promise<void>;
  async getAllianceBySiglas(siglas: string): Promise<IAlliance>;
  async navigateToAlliance(allianceId: string): Promise<void>;
}
```

## 🔍 Sistema de Búsqueda

### searchService.ts
**Propósito**: Búsqueda global en recursos y documentos

**API**:
```typescript
class SearchService {
  async globalSearch(query: string, filters?: SearchFilters): Promise<SearchResults>;
  async searchResources(query: string, filters?: ResourceSearchFilters): Promise<IResource[]>;
  async searchDocuments(query: string, filters?: DocumentSearchFilters): Promise<IDocument[]>;
  async searchUsers(query: string, filters?: UserSearchFilters): Promise<IUser[]>;
  async getSearchSuggestions(query: string): Promise<string[]>;
}
```

**Tipos**:
```typescript
interface SearchResults {
  resources: IResource[];
  documents: IDocument[];
  users: IUser[];
  totalResults: number;
}

interface SearchFilters {
  sectionId?: string;
  type?: 'resource' | 'document' | 'user';
  dateRange?: {
    start: Date;
    end: Date;
  };
}
```

## 🎨 Gestión de Logos

### logoService.ts
**Propósito**: Gestión de logos de alianzas

**API**:
```typescript
// Obtener logo por siglas de alianza
function getLogoForAlliance(siglas: string): string;

// Verificar si existe logo personalizado
function hasCustomLogo(siglas: string): boolean;

// Obtener logos disponibles
function getAvailableLogos(): string[];

// Mapeo de logos
const LOGO_MAP: Record<string, string> = {
  'EAFIT': '/img/eafit.png',
  'UNAB': '/img/andresbello.png',
  'UDD': '/img/udd.png',
  'CENTRAL': '/img/ucentral.png',
  'UNIS': '/img/unis.png',
  'UP': '/img/panamericana.png',
  'UCSS': '/img/ucatolica.png',
  'UAC': '/img/ucusco.png',
  'UNINORTE': '/img/logoUninorte.png'
};
```

## 🛠️ Servicios de Utilidad

### errorService.ts
**Propósito**: Manejo centralizado de errores

**API**:
```typescript
class ErrorService {
  handleApiError(error: any): ApiError;
  getErrorMessage(error: any): string;
  logError(error: any, context?: string): void;
  reportError(error: any): Promise<void>;
}
```

### loggerService.ts
**Propósito**: Sistema de logging

**API**:
```typescript
class LoggerService {
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: any): void;
  debug(message: string, data?: any): void;
}
```

### validationService.ts
**Propósito**: Validaciones de datos

**API**:
```typescript
class ValidationService {
  validateEmail(email: string): boolean;
  validatePassword(password: string): ValidationResult;
  validateUrl(url: string): boolean;
  validateFile(file: File, allowedTypes: string[]): ValidationResult;
}
```

## 🔄 Patrones de Implementación

### 1. Service Class Pattern
```typescript
class BaseService {
  protected api = api;
  
  protected async handleRequest<T>(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<T> {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  private handleError(error: any): Error {
    return new Error(error.message || 'Error desconocido');
  }
}
```

### 2. Request/Response Pattern
```typescript
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

interface ApiRequest<T> {
  data: T;
  metadata?: {
    source: string;
    version: string;
  };
}
```

### 3. Error Handling Pattern
```typescript
const handleServiceError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    throw new ApiError(data.message, status);
  } else if (error.request) {
    throw new NetworkError('Error de conexión');
  } else {
    throw new ConfigurationError(error.message);
  }
};
```

## 🚀 Mejores Prácticas

### 1. TypeScript
```typescript
interface ServiceConfig {
  baseURL: string;
  timeout: number;
  retries: number;
}

class TypedService {
  constructor(private config: ServiceConfig) {}
  
  async getData<T>(): Promise<T> {
    // Implementación tipada
  }
}
```

### 2. Error Handling
```typescript
const apiCall = async () => {
  try {
    const result = await service.getData();
    return { success: true, data: result };
  } catch (error) {
    logger.error('Error en API call', error);
    return { success: false, error: error.message };
  }
};
```

### 3. Caching
```typescript
class CachedService {
  private cache = new Map<string, any>();
  
  async getData(key: string): Promise<any> {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const data = await this.fetchData();
    this.cache.set(key, data);
    return data;
  }
}
```

### 4. Retry Logic
```typescript
const retryRequest = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};
```

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0