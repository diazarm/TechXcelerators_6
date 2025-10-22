# 📝 Tipos TypeScript - Scala Learning Frontend

## 📋 Descripción General

Definiciones de tipos TypeScript que proporcionan tipado fuerte para toda la aplicación. Los tipos están organizados en archivos específicos y centralizados mediante el patrón barrel.

## 🏗️ Estructura de Tipos

```
src/types/
├── alliance.ts          # Tipos de alianzas
├── api.ts              # Tipos de API
├── document.ts         # Tipos de documentos
├── error.ts            # Tipos de errores
├── global.d.ts         # Tipos globales
├── index.ts            # Exportaciones centralizadas (barrel)
├── resource.ts         # Tipos de recursos
├── shared.ts           # Tipos compartidos
└── validation.ts       # Tipos de validación
```

## 📦 Archivo Barrel (`index.ts`)

El proyecto utiliza un archivo barrel para centralizar las exportaciones de tipos compartidos:

```typescript
// Importar tipos desde el barrel
import type { 
  User, 
  AuthContextType, 
  LoginCredentials,
  IResource,
  Alliance
} from '../../types';
```

### Tipos Exportados

#### **Tipos Compartidos** (`shared.ts`)
- `User`, `UserRole`, `AuthState`
- `LoginCredentials`, `AuthContextType`, `AuthProviderProps`
- `SearchResult`

#### **Tipos de Error** (`error.ts`)
- `AppError`, `ValidationError`, `ApiError`
- `NetworkError`, `BusinessError`, `ErrorState`
- `RetryConfig`, `LogLevelType`, `LogEntry`

#### **Tipos de Validación** (`validation.ts`)
- `ValidationRule`, `ValidationResult`, `ValidationContext`
- `FieldValidation`, `FormValidation`, `ValidationState`

#### **Tipos de Alianzas** (`alliance.ts`)
- `Alliance`, `CreateAllianceRequest`, `UpdateAllianceRequest`
- `AllianceApiResponse`, `AllianceListApiResponse`
- `AllianceFilters`, `AllianceState`, `AllianceActions`

#### **Tipos de Recursos** (`resource.ts`)
- `IResource`

#### **Tipos de API** (`api.ts`)
- `ApiResponse`, `ResourceResponse`, `ResourceListResponse`

## 🎯 Uso Práctico

### Importación desde Barrel
```typescript
// ✅ Correcto: Importar tipos compartidos desde el barrel
import type { User, IResource, Alliance } from '../../types';
```

### Importación de Tipos Co-locados
```typescript
// ✅ Correcto: Importar tipos co-locados desde archivos barrel
import type { ButtonProps } from '../components';
import type { CardConfig } from '../constants';
```

## 📚 Convenciones

### Naming
- **Interfaces**: PascalCase (`User`, `IResource`)
- **Types**: PascalCase (`UserRole`, `NotificationType`)
- **Prefijo "I"**: Para interfaces de datos del backend (`IResource`, `IDocument`)

### Generic Types
```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
}
```

### Union Types
```typescript
type UserRole = 'user' | 'director' | 'admin';
type NotificationType = 'success' | 'error' | 'warning' | 'info';
```

### Optional Properties
```typescript
interface User {
  _id: string;
  name: string;
  email?: string; // Opcional
}
```

## 📖 Referencia Completa

Para ver las definiciones completas de cada tipo, consulta los archivos fuente:

- **`front/src/types/shared.ts`** - Tipos compartidos (User, Auth, etc.)
- **`front/src/types/error.ts`** - Manejo de errores y logs
- **`front/src/types/validation.ts`** - Validación de formularios
- **`front/src/types/alliance.ts`** - Alianzas universitarias
- **`front/src/types/resource.ts`** - Recursos educativos
- **`front/src/types/document.ts`** - Documentos
- **`front/src/types/api.ts`** - Respuestas de API
- **`front/src/types/global.d.ts`** - Tipos globales y extensiones

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0