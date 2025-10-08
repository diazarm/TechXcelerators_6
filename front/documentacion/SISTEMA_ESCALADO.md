# 📐 Sistema de Escalado y Responsividad

## 🎯 Visión General

Sistema unificado de escalado dinámico que adapta **automáticamente** todos los componentes a cualquier tamaño de pantalla (móvil → 8K).

**Base de diseño:** 1440px  
**Factor de escalado:** 0.8x - 2.5x  
**Pantallas soportadas:** 375px (móvil) hasta 7680px (8K)

## 🏗️ Arquitectura

```
📁 context/screenSize/
├── ScreenSizeContext.ts       # Tipos del contexto
├── ScreenSizeProvider.tsx     # Provider principal
└── index.ts                   # Exportaciones

📁 hooks/
├── useResponsive.ts           # Hook de escalado base
├── useScaledDimensions.ts     # Dimensiones de componentes
└── useResponsiveImage.ts      # Imágenes responsivas
```

## 🔧 Uso Básico

### 1. En Cualquier Componente

```tsx
import { useScreenSize } from '../../context';

const MiComponente = () => {
  const { 
    scale,                    // Función de escalado
    dimensions,               // Dimensiones predefinidas
    isMobile,                 // Breakpoints
    getContainerForScreen     // Contenedores automáticos
  } = useScreenSize();

  return (
    <div className={getContainerForScreen()}>
      <div style={{ 
        width: `${scale(320)}px`,
        height: `${scale(200)}px`,
        fontSize: dimensions.fontSize.lg,
        padding: dimensions.spacing.md
      }}>
        Contenido escalado
      </div>
    </div>
  );
};
```

## 📱 Breakpoints Disponibles

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

## 📏 Dimensiones Predefinidas

### Cards
```tsx
dimensions.card.small         // scale(240)px
dimensions.card.medium        // scale(320)px
dimensions.card.rectangular   // scale(480)px
```

### Tipografía
```tsx
dimensions.fontSize.xs        // scale(14)px
dimensions.fontSize.sm        // scale(16)px
dimensions.fontSize.md        // scale(18)px
dimensions.fontSize.lg        // scale(20)px
dimensions.fontSize.xl        // scale(22)px
dimensions.fontSize['2xl']    // scale(26)px
dimensions.fontSize['3xl']    // scale(32)px
dimensions.fontSize['4xl']    // scale(36)px
dimensions.fontSize['5xl']    // scale(40)px
dimensions.fontSize['6xl']    // scale(48)px
dimensions.fontSize['8xl']    // scale(64)px
```

### Espaciado
```tsx
dimensions.spacing.xs         // scale(4)px
dimensions.spacing.sm         // scale(8)px
dimensions.spacing.md         // scale(16)px
dimensions.spacing.lg         // scale(24)px
dimensions.spacing.xl         // scale(32)px
dimensions.spacing['2xl']     // scale(48)px
dimensions.spacing['3xl']     // scale(64)px
dimensions.spacing['4xl']     // scale(80)px
dimensions.spacing['5xl']     // scale(96)px
dimensions.spacing['6xl']     // scale(128)px
dimensions.spacing['8xl']     // scale(192)px
```

### Botones
```tsx
dimensions.button.height.xs   // scale(30)px
dimensions.button.height.sm   // scale(35)px
dimensions.button.height.md   // scale(40)px
dimensions.button.height.lg   // scale(45)px
dimensions.button.minWidth.xs // scale(80)px
dimensions.button.minWidth.sm // scale(90)px
dimensions.button.minWidth.md // scale(100)px
dimensions.button.minWidth.lg // scale(120)px
```

## 🎨 Funciones Automáticas

### Contenedores
```tsx
const containerClass = getContainerForScreen();
// Móvil/Desktop: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// XLarge: "max-w-[min(2400px,98vw)] mx-auto px-4..."
// XXLarge: "max-w-[min(3600px,98vw)] mx-auto px-4..."
```

### Grids
```tsx
const gridClass = getGridForScreen('three');
// Normal: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
// XLarge: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5"
```

### Gaps
```tsx
const gapClass = getGapForScreen('medium');
// Normal: "gap-6 sm:gap-8 lg:gap-12"
// XLarge: "gap-8 sm:gap-12 lg:gap-16 xl:gap-18 2xl:gap-20 3xl:gap-24"
```

## ⚡ Reglas Importantes

### ✅ HACER:
```tsx
// 1. Usar useScreenSize() en todos los componentes
const { scale, dimensions, isMobile } = useScreenSize();

// 2. Escalar dimensiones dinámicamente
style={{ width: `${scale(320)}px` }}

// 3. Usar dimensiones predefinidas
style={{ fontSize: dimensions.fontSize.lg }}

// 4. Usar funciones automáticas
className={getContainerForScreen()}
```

### ❌ NO HACER:
```tsx
// 1. NO usar valores fijos
style={{ width: '320px' }}  // ❌ No escala

// 2. NO usar media queries CSS
@media (max-width: 768px) { ... }  // ❌ Usar breakpoints

// 3. NO importar hooks individuales
const { scale } = useResponsive();  // ❌ Usar useScreenSize()

// 4. NO usar contenedores fijos
className="max-w-7xl"  // ❌ Usar getContainerForScreen()
```

## 📊 Ejemplo de Escalado Real

| Pantalla | Ancho | ScaleFactor | Card 320px | Fuente 16px |
|----------|-------|-------------|------------|-------------|
| Móvil    | 375px | 0.8x        | 256px      | 12.8px      |
| Tablet   | 768px | 0.8x        | 256px      | 12.8px      |
| Desktop  | 1440px| 1.0x        | 320px      | 16px        |
| XLarge   | 1920px| 1.33x       | 426px      | 21.3px      |
| 4K       | 3840px| 2.5x        | 800px      | 40px        |

## 🎨 Clases Responsive Disponibles

### Tipografía
```tsx
text.h1    // "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
text.h2    // "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
text.h3    // "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold"
text.body  // "text-base sm:text-lg lg:text-xl"
```

### Espaciado
```tsx
spacing.py.medium  // "py-12 sm:py-16 lg:py-20"
spacing.px.large   // "px-8 sm:px-12 lg:px-16"
```

### Grids
```tsx
grid.columns.three  // "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
grid.gap.medium     // "gap-6 sm:gap-8 lg:gap-12"
```

## 💡 Patrones Comunes

### Página con Cards
```tsx
const MiPagina = () => {
  const { getContainerForScreen } = useScreenSize();
  
  return (
    <div className={getContainerForScreen()}>
      <CardGrid 
        cards={cards}
        columns={3}
        defaultCardSize="medium"
      />
    </div>
  );
};
```

### Componente con Dimensiones Personalizadas
```tsx
const MiComponente = () => {
  const { scale, dimensions } = useScreenSize();
  
  return (
    <div style={{
      width: `${scale(400)}px`,
      padding: dimensions.spacing.lg,
      fontSize: dimensions.fontSize.md
    }}>
      Contenido
    </div>
  );
};
```

### Condicionales por Breakpoint
```tsx
const MiComponente = () => {
  const { isMobile, isDesktop } = useScreenSize();
  
  return (
    <>
      {isMobile && <VersionMovil />}
      {isDesktop && <VersionDesktop />}
    </>
  );
};
```

## 🔍 Verificación

**Sistema funcionando correctamente cuando:**
- ✅ Componentes se ven proporcionados en todas las pantallas
- ✅ Texto es legible (no demasiado grande ni pequeño)
- ✅ Espaciado es consistente
- ✅ No hay scroll horizontal inesperado
- ✅ Botones y cards mantienen proporciones

---

**💡 Regla de oro:** Si necesitas dimensiones, usa `scale()` o `dimensions`. Si necesitas breakpoints, usa los booleanos (`isMobile`, etc.). Si necesitas contenedores, usa `getContainerForScreen()`.

