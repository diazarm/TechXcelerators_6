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

# Configurar variables de entorno
cp .env.example .env.local
```

### Variables de Entorno
```env
# .env.local
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Scala Learning
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
```

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

// 2. Imports internos (componentes, hooks, servicios)
import { Button } from '../../components/UI/Button';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/userService';

// 3. Tipos e interfaces
import type { User, UserProps } from '../../types/user';

// 4. Estilos (si es necesario)
import './ComponentName.css';
```

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
// Clases de utilidad
<div className="flex items-center justify-center p-4 bg-primary text-white">
  <span className="text-lg font-semibold">Contenido</span>
</div>

// Clases responsivas
<div className="w-full md:w-1/2 lg:w-1/3">
  <p className="text-sm md:text-base lg:text-lg">Texto responsivo</p>
</div>

// Estados hover y focus
<button className="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
  Botón
</button>
```

### Sistema de Escalado Responsivo
```typescript
// Hook useResponsive para escalado automático
const { scale, dimensions } = useResponsive();

// Uso en componentes
const logoSize = scale(80); // Escala proporcionalmente según pantalla
const fontSize = dimensions.fontSize.lg;

// Aplicación en estilos
<div style={{ 
  width: `${logoSize}px`, 
  height: `${logoSize}px`,
  fontSize: `${fontSize}px`
}}>
  Logo
</div>
```

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

## 🧪 Testing (Futuro)

### Configuración de Testing
```bash
# Instalar dependencias de testing (cuando se implemente)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Estructura de Tests
```
src/
├── components/
│   └── MyComponent/
│       ├── index.tsx
│       ├── types.ts
│       └── __tests__/
│           └── MyComponent.test.tsx
├── hooks/
│   └── __tests__/
│       └── useCustomHook.test.ts
└── services/
    └── __tests__/
        └── myService.test.ts
```

### Ejemplo de Test
```typescript
// MyComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MyComponent from '../index';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
  
  it('calls onAction when button is clicked', () => {
    const mockAction = vi.fn();
    render(<MyComponent title="Test" onAction={mockAction} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockAction).toHaveBeenCalled();
  });
});
```

## 🚀 Optimizaciones

### Performance
```typescript
// Memoización de componentes
const MyComponent = React.memo(({ data }: { data: any[] }) => {
  return <div>{/* Render data */}</div>;
});

// Memoización de valores calculados
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// Memoización de funciones
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);
```

### Lazy Loading
```typescript
// Lazy loading de componentes
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
};
```

### Code Splitting
```typescript
// Code splitting por rutas
const HomePage = lazy(() => import('../pages/Home'));
const AboutPage = lazy(() => import('../pages/About'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
```

## 🐛 Debugging

### Herramientas de Desarrollo
```typescript
// React Developer Tools
// Instalar extensión del navegador

// Console logging
console.log('Debug info:', { data, state });

// Breakpoints en VS Code
// Usar F9 para agregar breakpoints

// Network debugging
// Usar DevTools Network tab
```

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal.</h1>;
    }
    
    return this.props.children;
  }
}
```

## 📦 Build y Deployment

### Build de Producción
```bash
# Build optimizado
npm run build

# Verificar build
npm run preview

# Análisis de bundle
npm run build:analyze
```

### Optimizaciones de Build
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', 'lucide-react'],
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