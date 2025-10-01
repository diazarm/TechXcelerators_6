# Sistema de Responsividad Unificado - Frontend

## 📱 Visión General

Este proyecto implementa un **sistema de responsividad unificado** basado en Context API que proporciona escalado dinámico y automático para **TODAS las pantallas** (móvil, tablet, desktop, pantallas grandes, 4K).

## 🎯 Sistema de Contexto Unificado

### `ScreenSizeProvider` + `useScreenSize()`

**El sistema centralizado** que unifica toda la responsividad en un solo contexto.

```tsx
// App.tsx - Provider principal
import { ScreenSizeProvider } from './context';

function App() {
  return (
    <ScreenSizeProvider>
      {/* Toda la aplicación */}
    </ScreenSizeProvider>
  );
}

// Cualquier componente
import { useScreenSize } from '../../context';

const MiComponente = () => {
  const { 
    dimensions, 
    scale, 
    isMobile, 
    isDesktop, 
    isXLarge, 
    isXXLarge, 
    isUltraLarge,
    getContainerForScreen,
    getGridForScreen,
    getGapForScreen 
  } = useScreenSize();

  return (
    <div className={getContainerForScreen()}>
      <div 
        style={{ 
          width: scale(320), 
          height: scale(200),
          fontSize: dimensions.fontSize.lg,
          padding: dimensions.spacing.md 
        }}
      >
        Contenido escalado automáticamente
      </div>
    </div>
  );
};
```

## 🔧 API del Contexto Unificado

### Breakpoints Automáticos
```tsx
const { 
  isMobile,      // < 640px
  isTablet,      // 640px - 1024px
  isDesktop,     // 1024px - 1280px
  isLarge,       // 1280px - 1440px
  isXLarge,      // 1440px - 2560px
  isXXLarge,     // 2560px - 3840px
  isUltraLarge   // 3840px+
} = useScreenSize();
```

### Escalado Dinámico
```tsx
const { scale, scaleFactor } = useScreenSize();

// Escalado automático basado en pantalla
const width = scale(320);     // Escala según el viewport
const height = scale(200);    // Factor: 0.8x - 2.5x
const fontSize = scale(16);   // Base: 1440px
```

### Dimensiones Escaladas
```tsx
const { dimensions } = useScreenSize();

// Cards
dimensions.card.small    // scale(240)px
dimensions.card.medium   // scale(320)px  
dimensions.card.large    // scale(400)px

// Botones
dimensions.button.height.xs  // scale(30)px
dimensions.button.height.sm  // scale(35)px
dimensions.button.height.md  // scale(40)px
dimensions.button.height.lg  // scale(45)px

// Espaciado
dimensions.spacing.xs    // scale(4)px
dimensions.spacing.sm    // scale(8)px
dimensions.spacing.md    // scale(16)px
dimensions.spacing.lg    // scale(24)px
dimensions.spacing.xl    // scale(32)px
dimensions.spacing['2xl'] // scale(48)px

// Tipografía
dimensions.fontSize.xs   // scale(14)px
dimensions.fontSize.sm   // scale(16)px
dimensions.fontSize.md   // scale(18)px
dimensions.fontSize.lg   // scale(20)px
dimensions.fontSize.xl   // scale(22)px
dimensions.fontSize['2xl'] // scale(26)px
dimensions.fontSize['3xl'] // scale(32)px
```

### Contenedores Automáticos
```tsx
const { getContainerForScreen } = useScreenSize();

// Selecciona automáticamente el contenedor según la pantalla
const containerClass = getContainerForScreen();

// Resultado según pantalla:
// Móvil/Tablet: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// XLarge: "max-w-[min(2400px,98vw)] mx-auto px-4..."
// XXLarge: "max-w-[min(3600px,98vw)] mx-auto px-4..."
```

### Grids Automáticos
```tsx
const { getGridForScreen } = useScreenSize();

// Grids que se adaptan automáticamente
const gridClass = getGridForScreen('three');
// Resultado: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" + variantes para pantallas grandes
```

### Gaps Automáticos
```tsx
const { getGapForScreen } = useScreenSize();

// Gaps que escalan según la pantalla
const gapClass = getGapForScreen('medium');
// Resultado: "gap-4 sm:gap-6 lg:gap-8" + variantes para pantallas grandes
```

## 🚀 Patrones de Uso Actualizados

### 1. Componente Básico con Contexto Unificado
```tsx
import { useScreenSize } from '../../context';

const MiComponente = () => {
  const { 
    dimensions, 
    scale, 
    isMobile, 
    getContainerForScreen 
  } = useScreenSize();

  return (
    <div className={getContainerForScreen()}>
      <div 
        style={{ 
          width: scale(320),
          height: scale(200),
          fontSize: dimensions.fontSize.lg,
          padding: dimensions.spacing.md 
        }}
      >
        {isMobile ? <VistaMovil /> : <VistaDesktop />}
      </div>
    </div>
  );
};
```

### 2. Card Responsiva
```tsx
import { useScreenSize } from '../../context';

const Card = () => {
  const { dimensions, scale } = useScreenSize();

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm"
      style={{
        width: dimensions.card.medium,
        height: dimensions.card.medium,
        padding: dimensions.spacing.lg
      }}
    >
      <h3 style={{ fontSize: dimensions.fontSize.lg }}>
        Título
      </h3>
      <p style={{ fontSize: dimensions.fontSize.md }}>
        Descripción
      </p>
      <button 
        style={{ 
          minWidth: scale(110),
          height: dimensions.button.height.sm,
          fontSize: scale(12)
        }}
      >
        Ir
      </button>
    </div>
  );
};
```

### 3. Grid Responsivo
```tsx
import { useScreenSize } from '../../context';

const CardGrid = () => {
  const { getGridForScreen, getGapForScreen } = useScreenSize();

  return (
    <div className={`grid ${getGridForScreen('three')} ${getGapForScreen('medium')}`}>
      {/* Cards que escalan automáticamente */}
    </div>
  );
};
```

### 4. Botón con Escalado
```tsx
import { useScreenSize } from '../../context';
import { Button } from '../Button';

const MiBoton = () => {
  const { scale } = useScreenSize();

  return (
    <Button
      variant="primary"
      size="lg"
      style={{ minWidth: scale(150) }}
    >
      Botón Escalado
    </Button>
  );
};
```

## 📐 Configuración del Sistema

### Factor de Escalado
- **Base**: 1440px (tamaño de diseño)
- **Rango**: 0.8x - 2.5x
- **Cálculo**: `scaleFactor = width / 1440px`
- **Limitado**: Para evitar extremos

### Breakpoints Optimizados
```tsx
// Configuración actual
isMobile: width < 640
isTablet: 640px - 1024px
isDesktop: 1024px - 1280px
isLarge: 1280px - 1440px
isXLarge: 1440px - 2560px     // Pantallas grandes
isXXLarge: 2560px - 3840px    // 4K
isUltraLarge: 3840px+         // Ultra 4K
```

### Contenedores por Pantalla
```tsx
// Selección automática según breakpoint
container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
containerXLarge: "max-w-[min(2400px,98vw)] mx-auto px-4..."
containerXXLarge: "max-w-[min(3600px,98vw)] mx-auto px-4..."
```

## ⚠️ Reglas Importantes

### 1. **SIEMPRE usar `useScreenSize()`**
❌ **NO usar hooks individuales:**
```tsx
// ❌ OBSOLETO
const responsive = useResponsive();
const { isMobile } = useBreakpoints();
const dimensions = useComponentDimensions();
```

✅ **Usar contexto unificado:**
```tsx
// ✅ CORRECTO
const { dimensions, isMobile, scale } = useScreenSize();
```

### 2. **SIEMPRE usar `scale()` para dimensiones**
❌ **Evitar valores fijos:**
```tsx
<div style={{ width: '320px', height: '200px' }}>  // ❌ Fijo
```

✅ **Usar escalado dinámico:**
```tsx
<div style={{ width: scale(320), height: scale(200) }}>  // ✅ Escalado
```

### 3. **SIEMPRE usar `getContainerForScreen()`**
❌ **No usar contenedores fijos:**
```tsx
<div className="max-w-7xl mx-auto">  // ❌ Fijo
```

✅ **Usar contenedores automáticos:**
```tsx
<div className={getContainerForScreen()}>  // ✅ Automático
```

### 4. **NO usar media queries CSS**
❌ **Evitar CSS:**
```css
@media (max-width: 768px) { ... }
```

✅ **Usar breakpoints del contexto:**
```tsx
const { isMobile } = useScreenSize();
{isMobile && <ComponenteMobile />}
```

## 🎯 Beneficios del Sistema Unificado

1. **Una sola fuente de verdad**: Todo en `useScreenSize()`
2. **Escalado uniforme**: Funciona en TODAS las pantallas
3. **Automático**: No necesitas calcular breakpoints
4. **Consistente**: Todos los componentes escalan igual
5. **Mantenible**: Cambios centralizados en el contexto
6. **Performance**: Cálculos optimizados y memoización

## 📱 Soporte de Pantallas

✅ **Móvil** (375px): Escalado perfecto
✅ **Tablet** (768px): Escalado perfecto  
✅ **Desktop** (1440px): Escalado perfecto
✅ **Pantallas grandes** (2560px): Escalado perfecto
✅ **4K** (3840px): Escalado perfecto
✅ **Ultra 4K** (7680px): Escalado perfecto

## 📚 Ejemplos Reales

Ver implementaciones en:
- `src/components/Card/index.tsx` - Cards escaladas
- `src/components/Button/index.tsx` - Botones escalados
- `src/components/Layout/navbar.tsx` - Navbar responsivo
- `src/components/HeroSection/index.tsx` - Hero escalado
- `src/pages/Login/index.tsx` - Formularios escalados
- `src/components/Layout/MainLayout.tsx` - Layout principal

## 🔄 Migración Completada

**TODO el sistema** ha sido migrado al nuevo contexto unificado:
- ✅ Todos los componentes usan `useScreenSize()`
- ✅ Todos los elementos escalan uniformemente
- ✅ Todas las pantallas funcionan correctamente
- ✅ Sistema completamente unificado

---

**💡 Importante:** Siempre importa desde el contexto: `import { useScreenSize } from '../../context';`

**🚀 El sistema está listo y funcionando en TODAS las dimensiones de pantalla.**