# 🚀 TechXcelerators Frontend

**Proyecto base profesional para el equipo Frontend** con React, TypeScript, Vite y Tailwind CSS.



### **🏗️ Estructura Detallada con Archivos Centralizados**
```
src/
├── components/          # Componentes reutilizables
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── README.md       # Documentación del módulo
│   ├── Button/
│   │   ├── index.tsx   # Componente Button
│   │   └── types.ts    # Tipos co-locados (ButtonProps)
│   ├── LoadingSpinner/
│   │   ├── index.tsx   # Componente LoadingSpinner
│   │   └── types.ts    # Tipos co-locados (LoadingSpinnerProps)
│   ├── ErrorBoundary/
│   │   ├── index.tsx   # Componente ErrorBoundary
│   │   └── types.ts    # Tipos co-locados (ErrorBoundaryProps)
│   └── Navigation/
│       └── index.tsx   # Componente Navigation
├── context/            # Contextos de React
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── README.md       # Documentación del módulo
│   ├── auth/
│   │   ├── auth-context.ts    # Contexto de autenticación
│   │   ├── AuthProvider.tsx   # Proveedor de auth
│   │   └── types.ts           # Tipos co-locados
│   └── loading/
│       ├── loading-context.ts # Contexto de loading
│       ├── LoadingProvider.tsx # Proveedor de loading
│       └── types.ts           # Tipos co-locados
├── hooks/              # Hooks personalizados
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── README.md       # Documentación del módulo
│   ├── useResponsive.ts       # Hook de responsividad
│   ├── useAuth.ts             # Hook useAuth
│   └── useLoadingContext.ts   # Hook useLoadingContext
├── pages/              # Páginas de la aplicación
│   ├── README.md       # Documentación del módulo
│   ├── Contact/
│   │   └── index.tsx          # Página de contacto
│   └── WelcomePage/
│       ├── index.tsx          # Página de bienvenida
│       ├── types.ts           # Tipos específicos de la página
│       └── utils/
│           └── index.ts       # Utilidades de la página
├── services/           # Servicios y APIs
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── README.md       # Documentación del módulo
│   ├── api.ts                 # Configuración de Axios
│   └── authService.ts         # Servicio de autenticación
├── types/              # Tipos compartidos
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── README.md       # Documentación del módulo
│   └── shared.ts              # Tipos entre módulos
└── constants/          # Constantes de la aplicación
    ├── index.ts        ← EXPORTACIÓN CENTRALIZADA (NUEVO)
    ├── README.md       # Documentación del módulo
    └── appConstants.ts        # Constantes de la aplicación
```

## 🎯 **Características Principales**

### **📱 Responsividad Inteligente (Como un "traje a medida")**
- **Hook `useResponsive`**: Clases de Tailwind organizadas por categorías
- **Hook `useBreakpoints`**: Detección automática de breakpoints
- **Sin media queries**: Todo se maneja a través de hooks

**¿Por qué es inteligente?** Es como tener un traje que se adapta automáticamente a cualquier talla. No importa si es para un niño o un adulto, el traje siempre se ve perfecto.

### **🛡️ Manejo de Errores Global (Como un "sistema de emergencias")**
- **ErrorBoundary**: Captura errores en toda la aplicación
- **UI de fallback**: Interfaz amigable cuando algo falla

**¿Por qué es global?** Es como tener un sistema de emergencias en un edificio. Si algo falla en cualquier departamento, el sistema lo detecta y activa el protocolo de seguridad.

### **⏳ Sistema de Loading Global (Como un "indicador de progreso universal")**
- **LoadingProvider**: Estado de carga compartido
- **LoadingSpinner**: Componente reutilizable
- **Mensajes personalizados**: Loading con texto específico

**¿Por qué es universal?** Es como tener un indicador de progreso que funciona en toda la app. No importa dónde estés, siempre sabes si algo está cargando.

### **🔐 Autenticación Completa (Como un "sistema de acceso de hotel")**
- **AuthProvider**: Manejo de usuarios y sesiones
- **Roles y permisos**: Admin y User
- **Persistencia**: localStorage automático
- **JWT**: Integración con backend

**¿Por qué es completa?** Es como tener un sistema de acceso de hotel donde cada huésped tiene su llave, su nivel de acceso y su información guardada de forma segura.


## 🔧 **Comandos de Utilidad**

### **🔄 Control de Versiones (Git)**

#### **Flujo Básico de Trabajo**
```bash
# 1. Obtener cambios más recientes
git pull origin developer

# 2. Crear y cambiar a nueva rama para tu issue
git checkout -b feature/nombre-de-la-funcionalidad

# 3. Hacer cambios y commits
git add .
git commit -m "feat: implementa funcionalidad X"

# 4. Subir rama al repositorio
git push origin feature/nombre-de-la-funcionalidad

# 5. Crear Pull Request en GitHub
# Ir a GitHub > Pull Requests > New Pull Request > Verificar que va a rama developer
```

#### **Comandos Git Útiles**
```bash
# Ver estado del repositorio
git status

# Ver historial de commits
git log --oneline

# Ver diferencias
git diff

# Descartar cambios en archivo
git checkout -- nombre-archivo

# Cambiar entre ramas
git checkout nombre-rama

# Ver todas las ramas
git branch -a
```

### **🧪 Verificación del Proyecto**

#### **TypeScript - Verificar Tipos**
```bash
# Verificar tipos sin generar archivos
npx tsc --noEmit --project tsconfig.app.json

# Verificar tipos específicos
npx tsc --noEmit src/components/ComponentName.tsx
```

#### **ESLint - Verificar Calidad de Código**
```bash
# Verificar todo el proyecto
npm run lint

# Verificar archivo específico
npx eslint src/components/ComponentName.tsx

# Corregir errores automáticamente
npx eslint --fix src/
```

### **📦 Gestión de Dependencias**

#### **Instalar Nuevas Dependencias**
```bash
# Dependencia de producción
npm install nombre-paquete

# Dependencia de desarrollo
npm install --save-dev nombre-paquete

# Dependencia global
npm install -g nombre-paquete
```

#### **Actualizar Dependencias**
```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Actualizar dependencias específicas
npm install nombre-paquete@latest
```

### **🚀 Scripts del Proyecto**

#### **Desarrollo y Build**
```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Limpiar build
npm run clean
```

### **🔍 Debugging y Troubleshooting**

#### **Verificar Configuración**
```bash
# Ver configuración de TypeScript
npx tsc --showConfig

# Ver configuración de Vite
npx vite --config vite.config.ts

# Ver configuración de Tailwind
npx tailwindcss --config tailwind.config.js
```

#### **Limpiar Caché**
```bash
# Limpiar caché de npm
npm cache clean --force

# Limpiar node_modules y reinstalar (Windows PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Limpiar caché de Vite (Windows PowerShell)
Remove-Item -Recurse -Force node_modules\.vite
```

## 📚 **Uso de Hooks**

**Para ejemplos detallados de uso, consulta la documentación específica:**

- **🔐 Hook useAuth**: Ver `src/hooks/README.md` para autenticación
- **📱 Hook useResponsive**: Ver `src/pages/WelcomePage` para responsividad
- **🔄 Hook useLoadingContext**: Ver `src/pages/Contact` para loading global

**Todos los hooks siguen el mismo patrón de import:**
```tsx
import { useAuth, useResponsive, useLoadingContext } from '../../hooks';
```

## 🔧 **Patrones de Import y Exportación Centralizada**

### **🎯 ¿Por Qué Archivos Centralizados?**

**Los archivos `index.ts` centralizan todas las exportaciones para:**
- ✅ **Facilitar imports** - Un solo lugar para importar (como tener una "agenda central")
- ✅ **Evitar imports circulares** - Control de dependencias 
- ✅ **Mantener consistencia** - Patrón unificado en todo el proyecto (como usar el mismo idioma en toda la empresa)
- ✅ **Facilitar refactoring** - Cambios en un solo lugar

**¿Por qué se llama "centralizada"?** Es como tener una **"oficina central"** donde todos van a buscar la información que necesitan. En lugar de que cada departamento tenga su propia copia, todos van a la misma oficina.

### **📦 ¿Cómo Funcionan los Archivos Centralizados? (Con Ejemplos)**

#### **1. `src/components/index.ts` (Como una "biblioteca central")**
```tsx
// Re-exporta todos los componentes
export { Button } from './Button';
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as Navigation } from './Navigation';
```

**¿Qué hace?** Es como tener una biblioteca donde todos los libros están catalogados en un solo lugar. No necesitas ir a cada estante, todo está en el catálogo principal.

#### **2. `src/context/index.ts` (Como un "directorio de contactos")**
```tsx
// Re-exporta todos los contextos
export { AuthProvider } from './auth/AuthProvider';
export { AuthContext } from './auth/auth-context';
export { LoadingProvider } from './loading/LoadingProvider';
export { LoadingContext } from './loading/loading-context';
```

**¿Qué hace?** Es como tener un directorio de contactos donde están todos los números importantes. No necesitas recordar números individuales, solo vas al directorio.

#### **3. `src/hooks/index.ts` (Como una "caja de herramientas")**
```tsx
// Re-exporta todos los hooks
export { useResponsive } from './useResponsive';
export { useAuth } from './useAuth';
export { useLoadingContext } from './useLoadingContext';
```

**¿Qué hace?** Es como tener una caja de herramientas donde todas las herramientas están organizadas. No necesitas buscar en diferentes cajones, todo está en la caja principal.

#### **4. `src/types/index.ts` (Como un "catálogo de piezas")**
```tsx
// Re-exporta tipos compartidos y de módulos
export type { User, AuthContextType } from './shared';
export type { ButtonProps } from '../components/Button/types';
export type { LoadingSpinnerProps } from '../components/LoadingSpinner/types';
```

**¿Qué hace?** Es como tener un catálogo de piezas donde están todas las especificaciones. No necesitas ir a cada proveedor, todo está en el catálogo principal.

### **✅ CORRECTO - Usar archivos centralizados**
```tsx
// Hooks
import { useResponsive, useAuth } from '../../hooks';

// Contextos
import { AuthProvider, LoadingProvider } from '../../context';

// Servicios
import { login, api } from '../../services';

// Tipos
import type { User, AuthContextType } from '../../types';
```

### **❌ INCORRECTO - Importar desde subcarpetas**
```tsx
// NO hacer esto
import { useResponsive } from '../hooks/useResponsive.ts';
import { AuthProvider } from '../context/AuthProvider.tsx';
```

**💡 Para ejemplos detallados de cada módulo, consulta sus READMEs específicos.**

## 🏷️ **Sistema de Tipos**

**Para información detallada sobre tipos, consulta:**
- **📁 Tipos co-locados vs compartidos**: `src/types/README.md`
- **🔧 Criterios de decisión**: `src/types/README.md`
- **📚 Ejemplos prácticos**: `src/types/README.md`

### **📁 Estructura de Tipos**

#### **1. Tipos Co-locados (en cada módulo)**
```
src/components/Button/
├── index.tsx           # Componente
└── types.ts            # ButtonProps (co-locado)

src/context/auth/
├── auth-context.ts     # Contexto
├── AuthProvider.tsx    # Proveedor
└── types.ts            # AuthProviderProps (co-locado)
```

#### **2. Tipos Compartidos (entre módulos)**
```
src/types/
├── index.ts            # Re-exporta todo
└── shared.ts           # User, AuthContextType, etc.
```

### **📝 Ejemplos de Uso**

**Para ejemplos detallados de tipos, consulta:**
- **Tipos co-locados**: Ver `src/components/Button/types.ts`
- **Tipos compartidos**: Ver `src/types/shared.ts`
- **Patrones de import**: Ver `src/types/index.ts`
- **¿Co-locado o compartido?**: Ver `src/types/README.md`

## 📖 **Documentación Detallada**

**Cada módulo tiene su propia documentación especializada:**

- **🔐 Sistema de Auth**: `src/context/README.md`
- **🔄 Hook useAuth**: `src/hooks/README.md`
- **📡 Servicios**: `src/services/README.md`
- **📱 Hook useResponsive**: Ver `src/pages/WelcomePage` para ejemplos
- **🔄 Hook useLoadingContext**: Ver `src/pages/Contact` para ejemplos

## 🎨 **Tecnologías**

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP

## 🚨 **Reglas del Proyecto**

### **📦 Patrones de Import **
1. **Siempre** usar hooks centralizados (`../../hooks`)
2. **Siempre** usar contextos centralizados (`../../context`)
3. **Siempre** usar servicios centralizados (`../../services`)
4. **Siempre** usar tipos centralizados (`../../types`)

### **🏷️ Sistema de Tipos **
5. **Siempre** definir tipos co-locados en `./types.ts`
6. **Siempre** usar `import type { Props } from './types'` para tipos locales
7. **Siempre** usar `import type { Type } from '../../types'` para tipos compartidos
8. **Nunca** definir interfaces en archivos de componentes

### **🎨 Desarrollo **
9. **Nunca** usar media queries - solo `useResponsive`
10. **Siempre** considerar ErrorBoundary en componentes críticos
11. **Siempre** usar TypeScript con tipos estrictos
12. **Siempre** seguir el patrón de componentes funcionales

### **📁 Estructura de Archivos **
13. **Siempre** crear `index.ts` en carpetas principales
14. **Siempre** crear `types.ts` en módulos con tipos
15. **Siempre** usar nomenclatura `PascalCase` para componentes
16. **Siempre** usar nomenclatura `camelCase` para funciones y variables

---

**¡Listo para desarrollar! 🎉**
