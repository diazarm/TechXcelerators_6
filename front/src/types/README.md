# 🏷️ Sistema de Tipos

**Guía práctica del sistema de tipos y cuándo usar cada patrón.**

## 🎯 **¿Qué Es el Sistema de Tipos?**

TypeScript te permite definir la estructura de datos que esperas. En este proyecto usamos dos patrones: **tipos co-locados** (junto al código) y **tipos compartidos** (para múltiples módulos). **Mejora** la calidad del código y previene errores en tiempo de compilación.

## 🚀 **¿Para Qué Se Usa?**

El sistema de tipos te permite:
- **Definir estructuras** - Especificar qué datos espera cada función
- **Prevenir errores** - TypeScript te avisa antes de que la app falle
- **Documentar código** - Los tipos explican qué hace cada función
- **Mejorar IDE** - Autocompletado, navegación y refactoring automático
- **Organizar datos** - Estructuras claras para entidades del dominio

## ⭐ **¿Por Qué Es Importante?**

- **🚫 Sin tipos** - Errores en tiempo de ejecución (crash de la app)
- **🔄 Refactoring seguro** - TypeScript te avisa si rompes algo
- **📝 Documentación automática** - Los tipos se autodocumentan
- **🧪 Testing mejorado** - Sabes exactamente qué datos esperar
- **👥 Trabajo en equipo** - Otros desarrolladores entienden tu código
- **📱 Mantenibilidad** - Cambios coordinados y seguros
- **🎯 Calidad del código** - Menos bugs, más robustez

## 🤔 **¿Cuándo Usar Cada Patrón? (Explicación Simple)**

### **📍 Tipos Co-locados (Como "planos de tu casa")**
**¿Cuándo?** Cuando el tipo solo se usa en UN módulo específico.

**¿Por qué?** Es como tener los planos de tu casa junto a tu casa. Si quieres cambiar algo, tienes todo en un lugar.

**Ejemplos reales del proyecto:**
- `ButtonProps` → Solo se usa en `Button` → `src/components/Button/types.ts`
- `LoadingSpinnerProps` → Solo se usa en `LoadingSpinner` → `src/components/LoadingSpinner/types.ts`
- `LoadingProviderProps` → Solo se usa en `LoadingProvider` → `src/context/loading/types.ts`

**Ventajas:**
- 🔒 **Todo junto** - Tipos junto a su implementación (como tener la receta junto a la cocina)
- 🔄 **Fácil cambiar** - Cambios coordinados (como renovar una habitación completa)
- 📁 **Fácil encontrar** - Todo en un lugar (como tener tu ropa organizada por temporada)

### **🔄 Tipos Compartidos (Como "reglas del edificio")**
**¿Cuándo?** Cuando el tipo se usa en MÚLTIPLES módulos no relacionados.

**¿Por qué?** Es como las reglas del edificio que todos los departamentos deben seguir. Si cambias una regla, afecta a todos.

**Ejemplos reales del proyecto:**
- `User` → Se usa en auth, components, services → `src/types/shared.ts`
- `AuthContextType` → Se usa en auth, hooks, pages → `src/types/shared.ts`

**Ventajas:**
- 🔄 **Una sola vez** - Cambias en un lugar y se actualiza en todos lados
- 📱 **Consistencia** - Todos usan la misma información
- 🚫 **Sin duplicación** - No tienes que escribir lo mismo varias veces

## 🔄 **Flujo de Decisión: ¿Dónde Poner Este Tipo?**

```
¿El tipo se usa en UN SOLO módulo?
├─ SÍ → Tipos co-locados (./types.ts)
└─ NO → ¿Se usa en MÚLTIPLES módulos no relacionados?
    ├─ SÍ → Tipos compartidos (src/types/shared.ts)
    └─ NO → Tipos co-locados en el módulo principal
```

## 📝 **Ejemplos Prácticos**

### **Ejemplo 1: Tipos Co-locados**
```tsx
// src/components/Button/types.ts
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

// src/components/Button/index.tsx
import type { ButtonProps } from './types';
```

### **Ejemplo 2: Tipos Compartidos**
```tsx
// src/types/shared.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// src/context/auth/AuthProvider.tsx
import type { User } from '../../types';

// src/components/UserProfile.tsx
import type { User } from '../../types';
```

## 🏗️ **Cómo Crear Tipos**

### **Paso 1: Tipos Co-locados**
```
src/components/MiComponente/
├── index.tsx       # Componente
└── types.ts        # Tipos del componente
```

```tsx
// src/components/MiComponente/types.ts
export interface MiComponenteProps {
  titulo: string;
  onClick?: () => void;
}

// src/components/MiComponente/index.tsx
import type { MiComponenteProps } from './types';
```

### **Paso 2: Tipos Compartidos**
```tsx
// src/types/shared.ts
export interface MiTipoCompartido {
  id: string;
  nombre: string;
}

// src/types/index.ts
export type { MiTipoCompartido } from './shared';
```

### **Paso 3: Usar en Componentes**
```tsx
// Desde cualquier lugar
import type { MiTipoCompartido } from '../../types';
```

## 📚 **Tipos Disponibles en shared.ts**

### **User y Autenticación**
```tsx
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
  password: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}
```

### **Características de los Tipos Compartidos**
- 🔄 **Reutilizables** - Se usan en múltiples lugares
- 🎯 **Bien definidos** - Estructura clara y consistente
- 📝 **Documentados** - JSDoc para entender su propósito
- 🔒 **Inmutables** - No se modifican después de la creación

## 🔧 **Cómo Importar Tipos**

### **✅ CORRECTO - Tipos co-locados**
```tsx
// Desde el mismo módulo
import type { ButtonProps } from './types';
```

### **✅ CORRECTO - Tipos compartidos**
```tsx
// Desde cualquier lugar
import type { User, AuthContextType } from '../../types';
```

### **❌ INCORRECTO**
```tsx
// NO hacer esto
import type { ButtonProps } from '../../types';
```

## 🚨 **Reglas Importantes**

1. **Siempre** crear `types.ts` para componentes con props
2. **Siempre** usar `import type` para importar tipos
3. **Siempre** exportar tipos compartidos desde `src/types/index.ts`
4. **Nunca** definir interfaces en archivos de componentes
5. **Verificar** que el tipo no exista antes de crear uno nuevo
6. **Documentar** tipos complejos con JSDoc

## 🔗 **Referencias**

- **README principal**: Ver `../README.md`
- **Componentes**: Ver `../components/README.md`
- **Hooks**: Ver `../hooks/README.md`
- **Contextos**: Ver `../context/README.md`
