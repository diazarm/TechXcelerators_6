# TechXcelerators Frontend

## 🏗️ Estructura del Proyecto

Este proyecto sigue una arquitectura simple y mantenible basada en React + Vite + TypeScript + Tailwind CSS.

### 📁 Estructura de Directorios

```
src/
├── components/          # Componentes reutilizables
│   ├── [NombreComponente]/
│   │   ├── index.tsx           # Exportación principal del componente
│   │   └── types.ts            # Tipos específicos del componente (opcional)
│   ├── [OtroComponente]/
│   │   └── index.tsx
│   └── [CategoriaComponentes]/ # Componentes relacionados agrupados
│       ├── [Componente1].tsx
│       ├── [Componente2].tsx
│       └── [Componente3].tsx
├── constants/           # Constantes globales
│   └── appConstants.ts
├── context/             # Contextos de React
│   ├── [nombre]-context.ts     # Definición del contexto
│   ├── [Nombre]Provider.tsx    # Proveedor del contexto
│   └── use[Nombre]Context.ts   # Hook para acceder al contexto
├── hooks/               # Hooks personalizados
│   ├── use[Nombre].ts
│   ├── use[Otro].ts
│   └── use[Algo].ts
├── pages/               # Páginas principales
│   ├── [NombrePagina]/
│   │   ├── index.tsx           # Componente principal de la página
│   │   ├── types.ts            # Tipos específicos de la página
│   │   └── utils/              # Utilidades específicas de la página (opcional)
│   │       └── [util].ts
│   └── [OtraPagina]/
│       └── index.tsx
├── services/            # Servicios de API
│   ├── [nombre]Service.ts
│   └── [otro]Service.ts
├── styles/              # Estilos globales mínimos
│   └── globals.css             # Variables CSS básicas y estilos específicos
├── types/               # Tipos globales
│   └── [nombre]Types.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── [config].d.ts
```

## 🎯 Patrones de Organización

### 📦 Componentes
- **Carpeta con `index.tsx`**: Cada componente tiene su propia carpeta
- **Subcarpetas para componentes relacionados**: Agrupa componentes que comparten funcionalidad
- **Tailwind CSS**: Usa clases de utilidad de Tailwind para estilos
- **Exportación centralizada**: Usa `index.tsx` para exportar el componente principal

**Ejemplo:**
```tsx
// src/components/Button/index.tsx
export const Button = ({ children, variant = 'primary' }) => {
  const classes = "px-4 py-2 rounded-lg font-medium";
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white"
  };
  
  return <button className={`${classes} ${variantClasses[variant]}`}>{children}</button>;
};

// Uso: import { Button } from './components/Button';
```

### 📄 Páginas
- **Carpeta con `index.tsx`**: Cada página tiene su propia carpeta
- **Subcarpeta `utils/`**: Para utilidades específicas de la página
- **Tipos específicos**: Archivo `types.ts` para interfaces de la página
- **Estilos con Tailwind**: Usa clases de utilidad para el layout y estilos

**Ejemplo:**
```tsx
// src/pages/Dashboard/index.tsx
export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">Dashboard Content</div>
    </div>
  );
};

// Uso: import { Dashboard } from './pages/Dashboard';
```

### 🪝 Hooks
- **Archivos individuales con prefijo `use`**: Convención de React
- **Lógica reutilizable**: Extrae lógica compleja de componentes
- **Tipado fuerte**: Usa TypeScript para interfaces claras

**Ejemplo:**
```tsx
// src/hooks/useAuth.ts
export const useAuth = () => {
  // Lógica de autenticación
  return { user, login, logout };
};

// Uso: const { user, login } = useAuth();

### 🔧 Servicios
- **Archivos individuales con sufijo `Service`**: Para operaciones de API
- **Clases estáticas**: Usa métodos estáticos para operaciones CRUD
- **Manejo de errores**: Implementa manejo consistente de errores

**Ejemplo:**
```tsx
// src/services/authService.ts
export class AuthService {
  static async login(email: string, password: string) {
    // Lógica de login
  }
}

// Uso: await AuthService.login(email, password);

### 🏷️ Tipos
- **Archivos individuales con sufijo `Types`**: Para interfaces globales
- **Reutilización**: Tipos compartidos entre componentes
- **Generics**: Usa generics para tipos flexibles

**Ejemplo:**
```tsx
// src/types/globalTypes.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Uso: ApiResponse<User>

### 🔄 Contextos
- **Archivos con sufijo `-context.ts`**: Definición de tipos del contexto
- **Archivos con sufijo `Provider.tsx`**: Proveedor del contexto
- **Archivos con sufijo `use[Nombre]Context.ts`**: Hook para acceder al contexto
- **Archivo `index.ts`**: Exportaciones centralizadas

**Ejemplo:**
```tsx
// src/context/auth-context.ts
export interface AuthContextType { ... }

// src/context/AuthContext.tsx
export const AuthProvider = ({ children }) => { ... }

// src/context/useAuthContext.ts
export const useAuthContext = () => { ... }

// Uso: const { user } = useAuthContext();

### 🎨 Estilos Globales (Carpeta `styles/`)
- **`globals.css`**: Variables CSS básicas y estilos específicos
- **Uso mínimo**: Solo para casos que Tailwind no puede manejar

**¿Cuándo usar `styles/`?**
```css
/* ✅ SÍ usar para: */
/* - Variables CSS personalizadas */
:root {
  --brand-primary: #3b82f6;
}

/* - Estilos específicos (scrollbar, etc.) */
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}

/* ❌ NO usar para: */
/* - Estilos de componentes (usar clases de Tailwind) */
/* - Layouts básicos (usar clases de Tailwind) */
/* - Colores estándar (usar palette de Tailwind) */
```

## 🚀 Beneficios de esta Estructura

### ✅ Escalabilidad
- **Separación clara**: Cada directorio tiene una responsabilidad específica
- **Fácil navegación**: Estructura intuitiva para el equipo
- **Crecimiento organizado**: Fácil agregar nuevos componentes/páginas

### ✅ Mantenibilidad
- **Código modular**: Componentes independientes y reutilizables
- **Dependencias claras**: Imports organizados y predecibles
- **Refactoring seguro**: Cambios localizados en directorios específicos

### ✅ Colaboración
- **Convenciones claras**: Patrones consistentes en todo el proyecto
- **Conflictos reducidos**: Estructura que minimiza conflictos de Git
- **Onboarding rápido**: El equipo u otro desarrolaldores entienden la estructura rápidamente

### ✅ Performance
- **Lazy loading**: Fácil implementar carga diferida por páginas
- **Code splitting**: Estructura que facilita la división de código
- **Tree shaking**: Imports específicos para optimización

## 📋 Convenciones de Nomenclatura

### 🎯 Archivos
- **Componentes**: `PascalCase` (ej: `Button.tsx`, `UserProfile.tsx`)
- **Hooks**: `camelCase` con prefijo `use` (ej: `useAuth.ts`, `useLocalStorage.ts`)
- **Servicios**: `camelCase` con sufijo `Service` (ej: `authService.ts`, `userService.ts`)
- **Tipos**: `camelCase` con sufijo `Types` (ej: `globalTypes.ts`, `userTypes.ts`)
- **Constantes**: `camelCase` (ej: `appConstants.ts`, `apiEndpoints.ts`)

### 🗂️ Directorios
- **Componentes**: `PascalCase` (ej: `Button/`, `UserProfile/`)
- **Páginas**: `PascalCase` (ej: `Dashboard/`, `UserProfile/`)
- **Otros**: `camelCase` (ej: `hooks/`, `services/`, `types/`)

### 📝 Imports
- **Absolutos**: Usa `@/` para imports desde `src/`
- **Relativos**: Para imports dentro del mismo directorio
- **Barrel exports**: Usa `index.ts` para exportaciones múltiples

## 🔧 Configuración Recomendada

### 📁 Imports Simples
```tsx
// Usar imports relativos simples:
import { Button } from './components/Button';
import { useAuth } from './hooks/useAuth';
import { AuthService } from './services/authService';

// No usar path mapping complejo - mantener simple
```

### 🎨 Estilos con Tailwind CSS
- **Clases de utilidad**: Usa las clases predefinidas de Tailwind para el 90% de estilos
- **Componentes**: Estilos encapsulados usando clases de Tailwind
- **Responsive**: Aprovecha las clases responsive de Tailwind (`sm:`, `md:`, `lg:`)
- **Hook de responsividad**: Usa `useResponsive()` para evitar repetición de clases responsive
- **Carpeta `styles/`**: Solo para casos específicos que Tailwind no cubre:
  - Variables CSS personalizadas (colores de marca)
  - Estilos específicos (scrollbar personalizado)
  - Overrides muy específicos

### 📦 Barrel Exports
```tsx
// src/components/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';

// Uso: import { Button, Input, Modal } from './components';
```

### 🎯 Hook de Responsividad
Para evitar la repetición de clases responsive de Tailwind, usa el hook `useResponsive()`:

```tsx
import { useResponsive, useBreakpoints } from './hooks/useResponsive';

const { container, text, spacing, grid, shadow, border } = useResponsive();
const { isMobile, isTablet, isDesktop } = useBreakpoints();

// Uso: clases responsive predefinidas
<div className={`${container} ${spacing.py.large}`}>
  <h1 className={text.h1}>Título</h1>
  <div className={grid.columns.auto}>Contenido</div>
</div>

// Uso: lógica condicional
{isDesktop && <Sidebar />}
<div className={isMobile ? 'p-4' : 'p-8'}>
```

**📱 Revisa la página de ejemplo** en `src/pages/WelcomePage/` para ver todas las funcionalidades del hook en acción.

## 🧭 Navegación y Enrutamiento

### 📍 React Router DOM
El proyecto incluye navegación entre páginas usando React Router:

```tsx
// Configuración básica en App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>
```

### 🧭 Componente de Navegación
- **Ubicación**: `src/components/Navigation/`
- **Características**: 
  - Navegación responsive con `useResponsive()`
  - Indicador de página activa
  - Enlaces con íconos y transiciones

### 🛡️ Manejo Global de Errores

### ⚠️ ErrorBoundary
El proyecto incluye un **ErrorBoundary global** que captura automáticamente todos los errores de React:

**Características:**
- ✅ **Captura automática** de errores en cualquier componente
- ✅ **UI amigable** para el usuario cuando algo falla
- ✅ **Información técnica** visible solo en desarrollo
- ✅ **Botones de recuperación** (reintentar/ir al inicio)
- ✅ **Integrado con `useResponsive()`** para estilos consistentes

**¿Qué significa esto para el equipo?**
- 🎯 **No te preocupes por errores inesperados**: El ErrorBoundary los captura automáticamente
- 🎯 **Enfócate en tu issue**: El manejo de errores ya está configurado
- 🎯 **Experiencia de usuario protegida**: Los usuarios nunca verán pantallas rotas

```tsx
// Ya está configurado globalmente en App.tsx
<ErrorBoundary>
  <LoadingProvider>
    <BrowserRouter>
      {/* Tu aplicación aquí */}
    </BrowserRouter>
  </LoadingProvider>
</ErrorBoundary>
```

## 🔄 Sistema de Loading Global

### ⏳ LoadingSpinner y LoadingProvider
El proyecto incluye un **sistema de loading completo** que maneja estados de carga de forma automática:

**Características:**
- ✅ **5 tipos de spinner** (default, dots, pulse, bars, ring)
- ✅ **4 tamaños** (small, medium, large, xl)
- ✅ **Loading global** con overlay de pantalla completa
- ✅ **Loading local** para componentes específicos
- ✅ **Configuración flexible** (colores, mensajes, overlay)
- ✅ **Integrado con `useResponsive()`** para consistencia visual

**¿Qué significa esto para el equipo?**
- 🎯 **No programes spinners**: El sistema ya está listo
- 🎯 **Solo llama las funciones**: `showLoading()` y `hideLoading()`
- 🎯 **Múltiples opciones**: Elige el tipo de spinner que prefieras
- 🎯 **UX consistente**: Todos los loading se ven igual

### 📋 Uso del Sistema de Loading

**Loading Global (pantalla completa):**
```tsx
import { useLoadingContext } from './context';

const MyComponent = () => {
  const { showLoading, hideLoading, showLoadingWithMessage } = useLoadingContext();
  
  // Loading básico
  const handleSave = async () => {
    showLoading();
    try {
      await saveData();
    } finally {
      hideLoading();
    }
  };
  
  // Loading con mensaje personalizado
  const handleUpload = async () => {
    showLoadingWithMessage('Subiendo archivo...', { 
      type: 'bars', 
      size: 'large' 
    });
    try {
      await uploadFile();
    } finally {
      hideLoading();
    }
  };
};
```

**Loading Local (dentro de componentes):**
```tsx
import LoadingSpinner from './components/LoadingSpinner';

// Spinner pequeño en botón
<LoadingSpinner type="dots" size="small" />

// Spinner con mensaje
<LoadingSpinner 
  type="pulse" 
  size="medium" 
  message="Cargando datos..." 
/>
```

**📱 Revisa la página de ejemplo** en `/contact` para ver todos los tipos de spinners en acción.

## 🪝 **Importancia de los Hooks - Guía para el Equipo**

### 🎯 **¿Por qué usar Hooks?**

Los hooks son **fundamentales** en React moderno y este proyecto los utiliza extensivamente por estas razones:

**✅ Beneficios principales:**
- **🔄 Reutilización de lógica**: Una vez escrito, se usa en múltiples componentes
- **🧹 Código más limpio**: Separa lógica de presentación
- **🧪 Testing más fácil**: Lógica aislada es más fácil de probar
- **📱 Consistencia**: Mismo comportamiento en toda la aplicación
- **🚀 Performance**: Evita recrear lógica en cada render

**❌ Sin hooks (ANTES):**
```tsx
// ❌ MAL: Lógica duplicada en cada componente
const Component1 = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <div className={isMobile ? 'p-4' : 'p-8'}>...</div>;
};

const Component2 = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <div className={isMobile ? 'text-sm' : 'text-lg'}>...</div>;
};
```

**✅ Con hooks (AHORA):**
```tsx
// ✅ BIEN: Lógica centralizada y reutilizable
import { useBreakpoints } from './hooks/useResponsive';

const Component1 = () => {
  const { isMobile } = useBreakpoints();
  return <div className={isMobile ? 'p-4' : 'p-8'}>...</div>;
};

const Component2 = () => {
  const { isMobile } = useBreakpoints();
  return <div className={isMobile ? 'text-sm' : 'text-lg'}>...</div>;
};
```

### 🎨 **Hooks Principales del Proyecto**

#### **1. `useResponsive()` - Responsividad Centralizada**
```tsx
const { container, text, spacing, grid, shadow, border } = useResponsive();

// En lugar de escribir esto en cada componente:
// className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-2xl sm:text-3xl lg:text-4xl"

// Escribes esto:
className={`${container} ${text.h1}`}
```

**¿Por qué es importante?**
- 🎯 **Consistencia visual**: Todos los contenedores se ven igual
- 🔄 **Cambios centralizados**: Modificas un lugar, cambia en toda la app
- 📱 **Responsive automático**: No te olvidas de breakpoints

#### **2. `useBreakpoints()` - Lógica Condicional**
```tsx
const { isMobile, isTablet, isDesktop } = useBreakpoints();

// En lugar de:
// className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Puedes hacer:
className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}
```

**¿Por qué es importante?**
- 🎮 **Lógica compleja**: Renderizado condicional avanzado
- 📱 **UX personalizada**: Diferentes experiencias por dispositivo
- 🧹 **Código legible**: Fácil entender qué pasa en cada breakpoint

#### **3. `useLoadingContext()` - Estados Globales**
```tsx
const { showLoading, hideLoading } = useLoadingContext();

// En lugar de:
// const [isLoading, setIsLoading] = useState(false);
// const [loadingMessage, setLoadingMessage] = useState('');

// Simplemente:
showLoading({ message: 'Guardando...' });
// ... operación async
hideLoading();
```

**¿Por qué es importante?**
- 🌍 **Estado global**: Loading visible desde cualquier componente
- 🎯 **Sin prop drilling**: No pasas estados por 5 niveles de componentes
- 🎨 **UX consistente**: Todos los loading se ven igual

### 📋 **Reglas de Oro para Hooks**

#### **✅ SIEMPRE haz esto:**
1. **📁 Crea hooks en `src/hooks/`** para lógica reutilizable
2. **🔄 Usa hooks existentes** antes de crear nuevos
3. **📝 Documenta con JSDoc** todos los hooks nuevos
4. **🧪 Nombra con prefijo `use`** (ej: `useUserData`, `useFormValidation`)

#### **❌ NUNCA hagas esto:**
1. **🔄 Recrear lógica** que ya existe en un hook
2. **📱 Escribir media queries** cuando existe `useResponsive()`
3. **🎨 Duplicar estilos** cuando existen clases predefinidas
4. **🌍 Crear estados locales** para cosas que deberían ser globales

### 🎯 **Cuándo Crear un Nuevo Hook**

**✅ Crea un hook cuando:**
- 🔄 **Lógica se repite** en 2+ componentes
- 📱 **Manejo de estado complejo** (formularios, paginación)
- 🌐 **Llamadas a APIs** con loading/error states
- 🎨 **Lógica de UI** (modales, tooltips, etc.)

**❌ NO crees un hook para:**
- 📝 **Lógica simple** de un solo componente
- 🎨 **Estilos específicos** de un componente
- 🔢 **Cálculos matemáticos** simples

### 📚 **Ejemplos de Hooks Útiles para Crear**

```tsx
// src/hooks/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};

// Uso:
const [user, setUser] = useLocalStorage('user', null);
```

### 🚀 **Resumen para el Equipo**

**🎯 Tu trabajo es:**
1. **Usar** los hooks existentes (`useResponsive`, `useLoadingContext`)
2. **Crear** hooks cuando veas lógica repetida
3. **Documentar** cada hook nuevo con JSDoc
4. **Mantener** la consistencia en toda la app

**🎯 NO es tu trabajo:**
1. **Preocuparte** por responsive (ya está resuelto)
2. **Programar** loading states (ya está resuelto)
3. **Manejar** errores inesperados (ya está resuelto)
4. **Crear** estilos desde cero (usa Tailwind + hooks)

**💡 Recuerda: Los hooks son tu amigo. Úsalos, créalos, pero nunca los dupliques.**

## 🚨 Reglas Importantes

1. **Usa** imports relativos simples (`./components/Button`)
2. **Siempre** usa Tailwind CSS para estilos de componentes
3. **Usa** el hook `useResponsive()` para clases responsive
4. **Mantén** un archivo `index.tsx` en cada carpeta de componente
5. **Usa** TypeScript para todos los archivos nuevos
6. **Sigue** las convenciones de nomenclatura establecidas
7. **Documenta** componentes complejos con JSDoc
8. **Mantén** la estructura de carpetas consistente

## 🔄 Flujo de Desarrollo

1. **Crear componente**: Nueva carpeta en `components/` con `index.tsx`
2. **Agregar tipos**: Interfaces en `types/` si son globales
3. **Implementar lógica**: Hooks personalizados en `hooks/` si es necesario
4. **Conectar servicios**: APIs en `services/` para datos externos
5. **Estilos**: Tailwind CSS + hook `useResponsive()` para responsividad
6. **Testing**: Tests en la misma carpeta del componente

Esta estructura garantiza un código simple, mantenible y fácil de entender para el equipo de desarrollo.

## 📚 Recursos de Aprendizaje

- **📱 Hook de Responsividad**: Revisa `src/pages/WelcomePage/` para ver ejemplos completos
- **🎨 Tailwind CSS**: [Documentación oficial](https://tailwindcss.com/docs)
- **⚛️ React + TypeScript**: [Guía oficial](https://react.dev/learn/typescript)
