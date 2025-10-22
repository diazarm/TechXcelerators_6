# 🛠️ Guía de Desarrollo - Scala Learning Frontend

## 📋 Descripción General

Guía para desarrolladores que trabajen en el frontend de Scala Learning. Incluye configuración del entorno, convenciones de código, patrones de desarrollo y mejores prácticas.

## 🚀 Configuración del Entorno

### Requisitos Previos
- **Node.js**: v18.0.0 o superior
- **npm**: v8.0.0 o superior
- **Git**: Para control de versiones
- **VS Code**: Editor recomendado (opcional)

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd TechXcelerators_6/front

# Instalar dependencias
npm install
```

### Variables de Entorno
El proyecto utiliza un archivo `.env` (ignorado por git) para configuración local:

```env
# .env (crear en front/)
VITE_API_URL=http://localhost:3000/api
```

**Nota**: El archivo `.env` no está en el repositorio por seguridad. Créalo localmente con las variables necesarias.

### Scripts Disponibles
```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (puerto 5173)

# Producción
npm run build        # Build: tsc -b && vite build
npm run preview      # Preview del build local

# Calidad de código
npm run lint         # Linting con ESLint
```

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas
```
front/src/
├── components/          # Componentes reutilizables
│   ├── Alliance/       # Componentes de alianzas
│   ├── Auth/           # Componentes de autenticación
│   ├── Document/       # Componentes de documentos
│   ├── Form/           # Componentes de formularios
│   ├── Layout/         # Componentes de layout
│   ├── Notification/   # Sistema de notificaciones
│   ├── Resource/       # Componentes de recursos
│   ├── Search/         # Componentes de búsqueda
│   ├── Shared/         # Componentes compartidos
│   ├── UI/             # Componentes de UI base
│   └── User/           # Componentes de usuario
├── constants/          # Constantes y configuraciones
├── context/            # Context providers de React
├── hooks/              # Custom hooks
├── pages/              # Páginas principales
├── services/           # Servicios de API
├── types/              # Definiciones de tipos TypeScript
├── utils/              # Utilidades y helpers
└── styles/             # Estilos globales
```

### Principios Arquitectónicos
1. **Separación de responsabilidades**: Cada carpeta tiene un propósito específico
2. **Composición sobre herencia**: Componentes pequeños y reutilizables
3. **Props drilling prevention**: Uso de Context API y custom hooks
4. **TypeScript first**: Tipado fuerte en toda la aplicación
5. **Mobile-first**: Diseño responsivo desde el inicio

## 📝 Convenciones de Código

### Naming Conventions
```typescript
// Componentes: PascalCase
const UserManagement = () => {};

// Hooks: camelCase con prefijo 'use'
const useUserManagement = () => {};

// Servicios: camelCase con sufijo 'Service'
const userService = new UserService();

// Tipos e interfaces: PascalCase
interface UserData {
  name: string;
  email: string;
}

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// Variables y funciones: camelCase
const userName = 'John Doe';
const getUserData = () => {};
```

### Estructura de Archivos
```typescript
// Estructura estándar de componente
import React from 'react';
import { ComponentProps } from './types';

interface ComponentNameProps {
  // Props aquí
}

const ComponentName: React.FC<ComponentNameProps> = ({ 
  prop1, 
  prop2 
}) => {
  // Estado local
  const [state, setState] = useState();
  
  // Efectos
  useEffect(() => {
    // Lógica de efecto
  }, []);
  
  // Funciones
  const handleClick = () => {
    // Lógica de click
  };
  
  // Render
  return (
    <div>
      {/* JSX aquí */}
    </div>
  );
};

export default ComponentName;
```

### Imports
```typescript
// Orden de imports
// 1. React y librerías externas
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 2. Imports internos usando archivos barrel (index.ts)
import { Button } from '../../components';
import { useAuth } from '../../hooks';
import { userService } from '../../services';

// 3. Tipos e interfaces usando barrel
import type { User } from '../../types';

// 4. Context usando barrel
import { useScreenSize } from '../../context';
```

**Convención del Proyecto**: Siempre usar archivos barrel (`index.ts`) para imports, nunca rutas directas a archivos internos.

## 🎨 Sistema de Diseño

### Tailwind CSS
El proyecto usa Tailwind CSS como framework de estilos principal.

#### Configuración
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E285F',
        secondary: '#5D5A88',
        accent: '#FF6E00',
      },
      spacing: {
        // Espaciado personalizado
      },
    },
  },
  plugins: [],
};
```

#### Uso de Clases
```typescript
// Usar constantes de colores del proyecto
import { COLORS, COLOR_CLASSES } from '../constants';

// Clases de utilidad con colores del proyecto
<div className={`flex items-center justify-center p-4 ${COLOR_CLASSES.primaryBg} text-white`}>
  <span className="text-lg font-semibold">Contenido</span>
</div>

// Clases responsivas desde useResponsive
const { text, grid, flex } = useResponsive();

<div className={grid.columns.three}>
  <p className={text.body}>Texto responsivo</p>
</div>

// Estados hover
<button className={`${COLOR_CLASSES.primaryBg} ${COLOR_CLASSES.primaryHover}`}>
  Botón
</button>
```

### Sistema de Escalado Responsivo
```typescript
// useResponsive: Escalado automático y clases responsivas
const { scale, text, grid, flex, container } = useResponsive();

// Escalado proporcional
const logoSize = scale(80); // Escala según pantalla (base: 1440px)

// Aplicación de escalado
<div style={{ width: `${logoSize}px`, height: `${logoSize}px` }}>
  Logo
</div>

// Uso de clases responsivas predefinidas
<div className={container}>
  <h1 className={text.h1}>Título</h1>
  <div className={grid.columns.three}>
    {/* Grid de 3 columnas responsive */}
  </div>
</div>
```

**Nota**: Para `dimensions` (fontSize, spacing detallado), usar `useScreenSize` del context.

## 🔧 Desarrollo de Componentes

### Componente Base
```typescript
import React, { useState, useCallback } from 'react';
import type { ComponentProps } from './types';

interface MyComponentProps {
  title: string;
  onAction?: (data: any) => void;
  className?: string;
  loading?: boolean;
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onAction,
  className = '',
  loading = false
}) => {
  const [localState, setLocalState] = useState('');
  
  const handleAction = useCallback((data: any) => {
    if (onAction) {
      onAction(data);
    }
  }, [onAction]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className={`component-base ${className}`}>
      <h2 className="text-xl font-bold">{title}</h2>
      {/* Resto del componente */}
    </div>
  );
};

export default MyComponent;
```

### Custom Hooks
```typescript
// Estructura de custom hook
import { useState, useEffect, useCallback } from 'react';

interface UseCustomHookProps {
  initialValue?: string;
  onUpdate?: (value: string) => void;
}

interface UseCustomHookReturn {
  value: string;
  setValue: (value: string) => void;
  isValid: boolean;
  reset: () => void;
}

export const useCustomHook = ({
  initialValue = '',
  onUpdate
}: UseCustomHookProps): UseCustomHookReturn => {
  const [value, setValue] = useState(initialValue);
  
  const handleUpdate = useCallback((newValue: string) => {
    setValue(newValue);
    if (onUpdate) {
      onUpdate(newValue);
    }
  }, [onUpdate]);
  
  const isValid = value.length > 0;
  
  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);
  
  return {
    value,
    setValue: handleUpdate,
    isValid,
    reset
  };
};
```

### Context Providers
```typescript
// Estructura de context provider
import React, { createContext, useContext, useReducer } from 'react';

interface ContextState {
  data: any[];
  loading: boolean;
  error: string | null;
}

interface ContextActions {
  setLoading: (loading: boolean) => void;
  setData: (data: any[]) => void;
  setError: (error: string | null) => void;
}

const Context = createContext<ContextState & ContextActions | null>(null);

export const useCustomContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useCustomContext must be used within CustomProvider');
  }
  return context;
};

export const CustomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const actions = {
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setData: (data: any[]) => dispatch({ type: 'SET_DATA', payload: data }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
  };
  
  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
```

## 🌐 Desarrollo de Servicios

### Servicio Base
```typescript
import axios, { AxiosResponse } from 'axios';
import { api } from './api';

class BaseService {
  protected api = api;
  
  protected async handleRequest<T>(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<T> {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  private handleError(error: any): void {
    console.error('Service error:', error);
    // Lógica de manejo de errores
  }
}

export class MyService extends BaseService {
  async getData(): Promise<MyData[]> {
    return this.handleRequest(() => this.api.get('/my-endpoint'));
  }
  
  async createData(data: CreateDataDto): Promise<MyData> {
    return this.handleRequest(() => this.api.post('/my-endpoint', data));
  }
}
```

## 🧪 Testing

**Estado**: El proyecto actualmente **NO tiene** testing implementado. Es una mejora futura pendiente.

## 🚀 Optimizaciones Implementadas

### Performance
El proyecto implementa memoización en hooks críticos:

```typescript
// useResponsive: Memoización en hooks
const breakpoints = useMemo(() => {
  // Cálculos costosos
}, [dependencies]);

// Ejemplo de useCallback en hooks
const handleUpdate = useCallback((value: string) => {
  // Lógica de actualización
}, [dependencies]);
```

### Build Optimization
- **Minificación**: esbuild para bundling rápido
- **Code Splitting**: Separación de vendor chunk (react, react-dom)
- **Source Maps**: Deshabilitados en producción

## 🐛 Debugging

### Herramientas de Desarrollo
- **React Developer Tools**: Extensión de navegador para inspeccionar componentes
- **Console Logging**: El proyecto usa `loggerService` para logging estructurado
- **Network Tab**: Para debugging de peticiones API
- **Breakpoints en VS Code**: F9 para agregar breakpoints

### Error Boundaries
El proyecto tiene un `ErrorBoundary` implementado en `components/Shared/ErrorBoundary`:

**Características**:
- Captura errores de React
- Fallback UI personalizado con logo y diseño
- Botones de "Intentar de nuevo" e "Ir al inicio"
- Información técnica en desarrollo (toggle)
- Integrado en `App.tsx`

**Uso**:
```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## 📦 Build y Deployment

### Build de Producción
```bash
# Build optimizado
npm run build

# Verificar build
npm run preview
```

### Optimizaciones de Build
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
```

## 🔄 Git Workflow

### Convenciones de Commits
```bash
# Formato: tipo(scope): descripción
feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation guide
refactor(services): improve error handling
test(components): add unit tests for Button
```

### Branches
```bash
# Branch principal
main

# Branch de desarrollo
develop

# Feature branches
feature/user-authentication
feature/document-upload
bugfix/login-validation
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Herramientas Recomendadas
- **VS Code Extensions**:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier - Code formatter
  - ESLint

### Patrones de Diseño
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Best Practices](https://typescript-eslint.io/docs/)
- [Modern React Patterns](https://kentcdodds.com/blog/)

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0