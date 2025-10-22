# 🌐 Servicios de API - Scala Learning Frontend

## 📋 Descripción General

Servicios que manejan toda la comunicación con el backend, proporcionando una capa de abstracción entre la UI y la API REST. Mezcla de clases singleton y funciones según el caso de uso.

## 🏗️ Estructura de Servicios

```
src/services/
├── api.ts                      # Configuración base de API (Axios)
├── authService.ts              # Funciones de autenticación
├── resourceService.ts          # Clase ResourceService
├── resourceManagementService.ts # Funciones de gestión de recursos
├── documentService.ts          # Funciones de gestión de documentos
├── userService.ts              # Clase UserService
├── allianceService.ts          # Clase AllianceService
├── allianceNavigationService.ts # Funciones de navegación de alianzas
├── searchService.ts            # Objeto con métodos de búsqueda
├── logoService.ts              # Funciones de gestión de logos
├── errorService.ts             # Clase ErrorService
├── loggerService.ts            # Clase LoggerService
├── validationService.ts        # Clase ValidationService
├── types.ts                    # Tipos de servicios
└── index.ts                    # Exportaciones centralizadas
```

## 🔧 Configuración Base

### api.ts
**Propósito**: Configuración centralizada de Axios

**Características**:
- Instancia de Axios configurada
- Interceptors para requests/responses
- Manejo automático de tokens JWT
- Manejo de errores globales (401 → logout)

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests (agrega token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para responses (maneja 401)
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
// Funciones exportadas (no es una clase)
async function login(credentials: LoginCredentials): Promise<{ user: User; token: string }>;
async function validateToken(token: string): Promise<User>;
async function logout(): Promise<void>;
async function getCurrentUser(): Promise<User | null>;
```

**Uso**:
```typescript
import { login, validateToken, logout } from '../services';

// Login
const { user, token } = await login({ 
  email: 'user@example.com', 
  password: 'password' 
});

// Validar token
const user = await validateToken(token);

// Logout
await logout();
```

## 📚 Gestión de Recursos

### resourceService.ts
**Propósito**: CRUD completo de recursos educativos

**Patrón**: Clase singleton exportada como `resourceService`

**API**:
```typescript
class ResourceService {
  async getAllResources(): Promise<IResource[]>;
  async getResourcesBySection(sectionId: string): Promise<IResource[]>;
  async getResourceById(id: string): Promise<IResource | null>;
}

export const resourceService = new ResourceService();
```

**Uso**:
```typescript
import { resourceService } from '../services';

const allResources = await resourceService.getAllResources();
const sectionResources = await resourceService.getResourcesBySection('68c9f2d8...');
const resource = await resourceService.getResourceById('68c22af4...');
```

### resourceManagementService.ts
**Propósito**: Funciones adicionales para gestión de recursos

**Patrón**: Funciones exportadas individualmente

**API**:
```typescript
async function createResource(data: CreateResourceData): Promise<IResource>;
async function updateResource(id: string, data: UpdateResourceData): Promise<IResource>;
async function softDeleteResource(id: string): Promise<IResource>;
async function restoreResource(id: string): Promise<IResource>;
async function getResourceByName(name: string): Promise<IResource | null>;
async function getDeletedResources(): Promise<IResource[]>;

const RESOURCE_NAME_TO_ID_MAP: Record<string, string>; // Mapeo de nombres a IDs
function getResourceIdByName(name: string): string | null;
```

**Uso**:
```typescript
import { 
  createResource, 
  updateResource, 
  getResourceByName 
} from '../services';

const newResource = await createResource({
  name: 'Nuevo Recurso',
  description: 'Descripción',
  sectionId: '68c9f2d8...',
  links: [{ label: 'Link', url: 'https://...' }]
});

const resource = await getResourceByName('Portafolio y Precios');
```

## 📄 Gestión de Documentos

### documentService.ts
**Propósito**: CRUD completo de documentos

**Patrón**: Funciones exportadas individualmente

**API**:
```typescript
async function uploadDocument(data: DocumentUploadData): Promise<IDocument>;
async function getDocuments(filters?: DocumentFilters): Promise<IDocument[]>;
async function getDocumentById(id: string): Promise<IDocument>;
async function updateDocument(id: string, data: DocumentUpdateData): Promise<IDocument>;
async function updateDocumentVisibility(id: string, role: 'director' | 'user', isVisible: boolean): Promise<IDocument>;
async function deleteDocument(id: string): Promise<string>;
async function restoreDocument(id: string): Promise<string>;
function getDocumentDownloadUrl(id: string): string;
async function downloadDocument(id: string, mimeType: string, filename?: string): Promise<void>;
```

**Uso**:
```typescript
import { 
  uploadDocument, 
  getDocuments, 
  downloadDocument 
} from '../services';

// Upload
const doc = await uploadDocument({
  name: 'Manual',
  file: fileObject,
  category: 'manual',
  visibleTo: ['director', 'user']
});

// Get
const documents = await getDocuments();

// Download
await downloadDocument(docId, 'application/pdf', 'manual.pdf');
```

## 👥 Gestión de Usuarios

### userService.ts
**Propósito**: CRUD completo de usuarios

**Patrón**: Clase singleton exportada como `userService`

**API**:
```typescript
class UserService {
  async getUsers(): Promise<IUser[]>;
  async getUserById(id: string): Promise<IUser>;
  async createUser(data: CreateUserData): Promise<IUser>;
  async updateUser(id: string, data: Partial<IUser>): Promise<IUser>;
  async changeUserRole(id: string, role: UserRole): Promise<IUser>;
  async toggleUserStatus(id: string): Promise<IUser>;
  async deleteUser(id: string): Promise<void>;
}

export const userService = new UserService();
```

**Uso**:
```typescript
import { userService } from '../services';

const users = await userService.getUsers();
await userService.changeUserRole(userId, 'director');
await userService.toggleUserStatus(userId);
```

## 🏛️ Gestión de Alianzas

### allianceService.ts
**Propósito**: Gestión de alianzas universitarias

**Patrón**: Clase singleton exportada como `allianceService`

**API**:
```typescript
class AllianceService {
  async getAlliances(): Promise<Alliance[]>;
  async getAllianceById(id: string): Promise<Alliance>;
  async createAlliance(data: CreateAllianceRequest): Promise<Alliance>;
  async updateAlliance(id: string, data: UpdateAllianceRequest): Promise<Alliance>;
  async deleteAlliance(id: string): Promise<void>;
}

export const allianceService = new AllianceService();
```

### allianceNavigationService.ts
**Propósito**: Navegación y gestión de clicks en alianzas

**Patrón**: Funciones exportadas individualmente

**API**:
```typescript
async function getResourcesBySection(sectionType: string): Promise<IResource[]>;
async function getAlliances(): Promise<Alliance[]>;
function findResourceByName(resources: IResource[], name?: string, id?: string): ResourceSearchResult;
function filterAlliances(alliances: Alliance[]): Alliance[]; // Actualmente retorna todas sin filtrar
function shouldShowModal(resource: IResource, showModal?: boolean): boolean;
function navigateToUrl(url: string): void;
function showNotification(type, title, message): void;
function findAllianceLink(resource: IResource, alliance: Alliance): Link | null;
async function handleAllianceCardClick(sectionType, resourceName?, showModal?, resourceId?): Promise<void>;
async function showAllianceSelectionModal(alliances: Alliance[], resource: IResource): Promise<void>;
```

## 🔍 Sistema de Búsqueda

### searchService.ts
**Propósito**: Búsqueda global en recursos y documentos

**Patrón**: Objeto con métodos

**API**:
```typescript
const searchService = {
  search: async (query: string): Promise<SearchResult[]>
};

function transformBackendResponse(response: BackendSearchResponse): SearchResult[];
async function searchFromBackend(query: string): Promise<BackendSearchResponse>;
```

**Uso**:
```typescript
import { searchService } from '../services';

const results = await searchService.search('portafolio');
```

## 🎨 Gestión de Logos

### logoService.ts
**Propósito**: Gestión de logos de alianzas

**Patrón**: Funciones exportadas + constante LOGO_MAP

**API**:
```typescript
function getLogoForAlliance(siglas: string): string;
function hasCustomLogo(siglas: string): boolean;
function getAvailableLogos(): string[];

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
**Propósito**: Manejo centralizado de errores con clasificación y retry

**Patrón**: Clase singleton exportada como `errorService`

**API**:
```typescript
class ErrorService {
  handleError(error: unknown, context?: string): AppError;
  async executeWithRetry(operation: () => Promise<void>, context?: string): Promise<void>;
  // ... métodos internos de clasificación
}

export const errorService = new ErrorService();
```

### loggerService.ts
**Propósito**: Sistema de logging con niveles y contexto

**Patrón**: Clase singleton exportada como `logger`

**API**:
```typescript
class LoggerService {
  info(message: string, data?: any, context?: string): void;
  warn(message: string, data?: any, context?: string): void;
  error(message: string, data?: any, context?: string): void;
  debug(message: string, data?: any, context?: string): void;
}

export const logger = new LoggerService(config);
```

### validationService.ts
**Propósito**: Validaciones de datos

**Patrón**: Clase singleton exportada como `validationService`

**API**:
```typescript
class ValidationService {
  validateEmail(email: string): boolean;
  validatePassword(password: string): ValidationResult;
  validateUrl(url: string): boolean;
  validateFile(file: File, allowedTypes: string[]): ValidationResult;
}

export const validationService = new ValidationService();
```

## 🔄 Patrones de Implementación

### 1. Clase Singleton
```typescript
class MyService {
  async getData(): Promise<Data[]> {
    const response = await api.get('/endpoint');
    return response.data.data;
  }
}

export const myService = new MyService();
```

### 2. Funciones Exportadas
```typescript
export const myFunction = async (param: string): Promise<Result> => {
  const response = await api.post('/endpoint', { param });
  return response.data.data;
};
```

### 3. Objeto con Métodos
```typescript
export const myService = {
  search: async (query: string) => {
    // Implementación
  }
};
```

## 🚀 Mejores Prácticas

### 1. Manejo de Errores
```typescript
try {
  const result = await service.getData();
  return { success: true, data: result };
} catch (error) {
  logger.error('Error en API call', error);
  throw error; // Re-lanzar para que el caller maneje
}
```

### 2. Validación de Respuestas
```typescript
const response = await api.get<ResourceListResponse>('/resources');
if (!response.data.success) {
  throw new Error(response.data.message || 'Error desconocido');
}
return response.data.data;
```

### 3. Logging Consistente
```typescript
logger.info('Operación iniciada', { param }, 'ServiceName');
// ... operación
logger.debug('Resultado obtenido', { data }, 'ServiceName');
```

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0