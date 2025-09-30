# Sistema de Responsividad - Frontend

## 📱 Visión General

Este proyecto implementa un **sistema de responsividad dinámico** basado en hooks personalizados que se adapta automáticamente a diferentes tamaños de pantalla y proporciona escalado dinámico de componentes.

## 🎯 Hooks Principales

### `useResponsive()`
Hook principal que proporciona clases de Tailwind CSS responsive y escalado dinámico.

```tsx
const { spacing, fontSize, container, scale } = useResponsive();

// Uso
<div className={`${spacing.px.small} ${fontSize.xl}`}>
  <div style={{ width: scale(200) }}>Contenido escalado</div>
</div>
```

**Características:**
- Factor de escalado automático (0.8x - 1.2x)
- Base de diseño: 1440px
- Escalado limitado para evitar extremos

### `useBreakpoints()`
Detecta automáticamente el tamaño de pantalla actual.

```tsx
const { isMobile, isTablet, isDesktop, isLarge } = useBreakpoints();

// Uso
{isMobile && <ComponenteMobile />}
{isDesktop && <ComponenteDesktop />}
```

**Breakpoints:**
- `isMobile`: < 640px
- `isTablet`: 640px - 1024px
- `isDesktop`: 1024px - 1280px
- `isLarge`: > 1280px

### `useComponentDimensions()`
Proporciona dimensiones escaladas para componentes específicos.

```tsx
const dimensions = useComponentDimensions();

// Uso
<div style={{
  width: dimensions.card.medium,
  height: dimensions.card.medium,
  padding: dimensions.spacing.md
}}>
  Tarjeta responsiva
</div>
```

### `useScaledDimensions(options)`
Genera dimensiones escaladas personalizadas.

```tsx
const scaledDimensions = useScaledDimensions({
  buttonHeight: 44,
  cardWidth: 300
});

// Uso
<button style={{ height: scaledDimensions.buttonHeight }}>
  Botón escalado
</button>
```

## 🖼️ Sistema de Imágenes Responsivas

### `useResponsiveImage(options)`
Hook especializado para manejar imágenes y fondos de manera responsiva.

```tsx
const { backgroundStyles, backgroundClasses } = useResponsiveImage({
  type: 'background-login',
  aspectRatio: '16/9',
  responsive: true
});

// Uso
<div 
  className={backgroundClasses}
  style={{ backgroundImage: 'url(/img/bg.jpg)', ...backgroundStyles }}
>
  Contenido
</div>
```

**Tipos de imagen disponibles:**
- `background`: Fondo general
- `background-login`: Fondo específico para login
- `background-login-full`: Fondo completo para login
- `background-login-admin`: Fondo específico para admin
- `card`: Imagen de tarjeta
- `content`: Imagen de contenido
- `hero`: Imagen hero

## 📐 Clases y Estilos Responsivos

### Clases de Espaciado
```tsx
const { spacing } = useResponsive();

// Padding/Margin horizontal
spacing.px.small    // Padding horizontal pequeño
spacing.px.medium   // Padding horizontal mediano
spacing.px.large    // Padding horizontal grande

// Espaciado general
spacing.sm, spacing.md, spacing.lg, spacing.xl, spacing['2xl'], etc.
```

### Clases de Tamaño de Fuente
```tsx
const { fontSize } = useResponsive();

fontSize.xs, fontSize.sm, fontSize.md, fontSize.lg, fontSize.xl, fontSize['2xl'], etc.
```

### Contenedor Responsivo
```tsx
const { container } = useResponsive();

<div className={container}>
  Contenido centrado y responsivo
</div>
```

## 🔧 Patrones de Uso

### 1. Componente Básico Responsivo
```tsx
import { useResponsive, useBreakpoints, useComponentDimensions } from '../hooks';

const MiComponente = () => {
  const responsive = useResponsive();
  const { isMobile } = useBreakpoints();
  const dimensions = useComponentDimensions();

  return (
    <div 
      className={`${responsive.container} ${responsive.spacing.px.medium}`}
      style={{ 
        fontSize: dimensions.fontSize.lg,
        padding: dimensions.spacing.md 
      }}
    >
      {isMobile ? <VistaMovil /> : <VistaDesktop />}
    </div>
  );
};
```

### 2. Imagen de Fondo Responsiva
```tsx
import { useResponsiveImage } from '../hooks';

const PaginaConFondo = () => {
  const { backgroundStyles, backgroundClasses } = useResponsiveImage({
    type: 'background-login',
    aspectRatio: '16/9'
  });

  return (
    <div 
      className={`min-h-screen ${backgroundClasses}`}
      style={{ 
        backgroundImage: 'url(/img/bg.jpg)', 
        ...backgroundStyles 
      }}
    >
      <Contenido />
    </div>
  );
};
```

### 3. Botón Escalado
```tsx
import { useScaledDimensions } from '../hooks';

const BotonResponsivo = () => {
  const scaledDimensions = useScaledDimensions({
    buttonHeight: 44,
    buttonWidth: 200
  });

  return (
    <button 
      className="bg-blue-500 text-white rounded-lg"
      style={{
        height: scaledDimensions.buttonHeight,
        width: scaledDimensions.buttonWidth
      }}
    >
      Botón Escalado
    </button>
  );
};
```

## ⚠️ Consideraciones Importantes

### 1. **Siempre usar hooks de responsividad**
❌ **Evitar:**
```tsx
<div className="w-64 h-32 p-4 text-lg">  // Tamaños fijos
```

✅ **Usar:**
```tsx
<div style={{ 
  width: dimensions.card.medium, 
  height: dimensions.card.medium,
  padding: dimensions.spacing.md,
  fontSize: dimensions.fontSize.lg 
}}>
```

### 2. **Combinar hooks apropiadamente**
```tsx
// ✅ Correcto: Combinar múltiples hooks
const responsive = useResponsive();
const { isMobile } = useBreakpoints();
const dimensions = useComponentDimensions();

// ✅ Correcto: Usar breakpoints para lógica condicional
{isMobile ? <MenuHamburguesa /> : <MenuDesktop />}
```

### 3. **Evitar media queries CSS**
❌ **No usar:**
```css
@media (max-width: 768px) { ... }
```

✅ **Usar hooks:**
```tsx
const { isMobile } = useBreakpoints();
```

## 🚀 Beneficios del Sistema

1. **Consistencia**: Todos los componentes escalan de manera uniforme
2. **Mantenibilidad**: Cambios centralizados en los hooks
3. **Flexibilidad**: Fácil ajuste de breakpoints y escalado
4. **Performance**: Cálculos optimizados y memoización
5. **Desarrollador**: API simple e intuitiva

## 📚 Ejemplos Prácticos

Ver implementaciones reales en:
- `src/components/Layout/navbar.tsx` - Navbar responsivo
- `src/components/Card/index.tsx` - Tarjetas escaladas
- `src/pages/Login/index.tsx` - Fondo responsivo
- `src/components/Notification/index.tsx` - Notificaciones adaptativas

---

**💡 Tip:** Siempre importa los hooks desde el archivo barrel: `import { useResponsive, useBreakpoints } from '../hooks';`
