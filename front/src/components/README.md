# 🧩 Componentes

**Guía práctica de componentes disponibles y cómo crearlos.**

## 🎯 **¿Qué Son los Componentes?**

Los componentes son piezas reutilizables de la interfaz de usuario. Cada componente tiene su propia lógica y se puede usar en diferentes partes de la aplicación. **Son los bloques de construcción** de tu interfaz de usuario.

## 🧩 **Componentes Disponibles**

### **Button - Botón Reutilizable**
**¿Para qué sirve?** Botón con diferentes estilos y tamaños. **Ideal** para acciones principales, secundarias y outline.

**Cómo usarlo:**
```tsx
import { Button } from '../../components';

const MiComponente = () => {
  return (
    <div>
      <Button onClick={() => alert('Click!')}>
        Botón Normal
      </Button>
      
      <Button variant="secondary" size="sm">
        Botón Pequeño
      </Button>
      
      <Button variant="outline" disabled>
        Botón Deshabilitado
      </Button>
    </div>
  );
};
```

**Opciones disponibles:**
- **variant**: `'primary'` | `'secondary'` | `'outline'`
- **size**: `'sm'` | `'md' | `'lg'`
- **disabled**: `true` | `false`

**Casos de uso:**
- 🚀 **Acciones principales** - Submit, Guardar, Continuar
- 🔄 **Acciones secundarias** - Cancelar, Volver, Editar
- 📱 **Navegación** - Enlaces que parecen botones
- 🎯 **Formularios** - Submit, Reset, Validar

### **LoadingSpinner - Indicador de Carga**
**¿Para qué sirve?** Muestra diferentes tipos de spinners de carga. **Perfecto** para indicar que algo está procesándose.

**Cómo usarlo:**
```tsx
import { LoadingSpinner } from '../../components';

const MiComponente = () => {
  return (
    <div>
      <LoadingSpinner type="default" size="medium" />
      <LoadingSpinner type="dots" message="Cargando..." />
      <LoadingSpinner type="pulse" size="large" />
    </div>
  );
};
```

**Opciones disponibles:**
- **type**: `'default'` | `'dots'` | `'pulse'` | `'bars'` | `'ring'`
- **size**: `'small'` | `'medium'` | `'large'` | `'xl'`

**Casos de uso:**
- 📤 **Envío de formularios** - "Guardando..."
- 🔄 **Carga de datos** - "Cargando usuarios..."
- 📥 **Subida de archivos** - "Subiendo imagen..."
- 🌐 **Llamadas a API** - "Procesando..."

### **ErrorBoundary - Manejo de Errores**
**¿Para qué sirve?** Captura errores en componentes y muestra una pantalla de error amigable. **Previene** que la app se rompa completamente.

**Cómo usarlo:**
```tsx
import { ErrorBoundary } from '../../components';

const MiApp = () => {
  return (
    <ErrorBoundary>
      <ComponenteQuePuedeFallar />
    </ErrorBoundary>
  );
};
```

**Casos de uso:**
- 🚫 **Errores de renderizado** - Componentes que fallan
- 🔄 **Errores de API** - Fallos en llamadas externas
- 📱 **Errores de estado** - Estados inconsistentes
- 🎯 **Fallbacks elegantes** - UI de error amigable

### **Navigation - Navegación Principal**
**¿Para qué sirve?** Barra de navegación principal de la aplicación. **Proporciona** acceso a todas las secciones importantes.

**Cómo usarlo:**
```tsx
import { Navigation } from '../../components';

const Layout = () => {
  return (
    <div>
      <Navigation />
      {/* Resto del contenido */}
    </div>
  );
};
```

**Características:**
- 🧭 **Navegación clara** - Enlaces a todas las páginas
- 📱 **Responsive** - Se adapta a móviles
- 🎨 **Consistente** - Mismo estilo en toda la app
- 🔒 **Condicional** - Muestra enlaces según autenticación

## 🏗️ **Cómo Crear un Nuevo Componente**

### **Paso 1: Crear la carpeta**
```
src/components/MiComponente/
├── index.tsx       # Componente principal
└── types.ts        # Tipos del componente
```

### **Paso 2: Definir tipos**
```tsx
// src/components/MiComponente/types.ts
export interface MiComponenteProps {
  titulo: string;
  onClick?: () => void;
  disabled?: boolean;
}
```

### **Paso 3: Crear el componente**
```tsx
// src/components/MiComponente/index.tsx
import React from 'react';
import type { MiComponenteProps } from './types';

export const MiComponente: React.FC<MiComponenteProps> = ({
  titulo,
  onClick,
  disabled = false
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {titulo}
    </button>
  );
};
```

### **Paso 4: Exportar centralmente**
```tsx
// src/components/index.ts
export { MiComponente } from './MiComponente';
```

## 🎨 **Patrones de Diseño Recomendados**

### **1. Props con Valores por Defecto**
```tsx
export const MiComponente: React.FC<MiComponenteProps> = ({
  titulo,
  onClick,
  disabled = false,  // Valor por defecto
  size = 'medium'    // Valor por defecto
}) => {
  // Componente
};
```

**Ventajas:**
- 🎯 **Fácil de usar** - No necesitas especificar todas las props
- 🔄 **Flexible** - Puedes personalizar solo lo que necesites
- 📱 **Consistente** - Mismo comportamiento por defecto

### **2. Tipado Estricto**
```tsx
export interface MiComponenteProps {
  titulo: string;           // Requerido
  onClick?: () => void;     // Opcional
  disabled?: boolean;       // Opcional con valor por defecto
  size?: 'small' | 'medium' | 'large';  // Union types
}
```

**Beneficios:**
- 🚫 **Sin errores** - TypeScript te avisa si algo está mal
- 📝 **Documentación** - Las props se autodocumentan
- 🔄 **Refactoring seguro** - Cambios coordinados

### **3. Componentes Controlados**
```tsx
export const MiComponente: React.FC<MiComponenteProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
```

**¿Por qué componentes controlados?**
- 🔄 **Estado predecible** - El padre controla el estado
- 🧪 **Testing fácil** - Puedes simular cambios
- 📱 **Integración simple** - Funciona con cualquier estado

## 🚨 **Reglas Importantes**

1. **Siempre** crear `types.ts` para componentes con props
2. **Siempre** importar tipos co-locados desde `./types` (del mismo módulo)
3. **Siempre** importar tipos compartidos desde `../../types` (centralizado)
4. **Siempre** exportar desde `src/components/index.ts`
5. **Siempre** usar nomenclatura `PascalCase` para componentes
6. **Nunca** definir interfaces en archivos de componentes
7. **Siempre** usar valores por defecto para props opcionales

## 🔗 **Referencias**

- **README principal**: Ver `../README.md`
- **Sistema de tipos**: Ver `../types/README.md`
- **Hooks**: Ver `../hooks/README.md`
