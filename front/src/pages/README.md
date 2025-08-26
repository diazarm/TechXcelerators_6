# 📄 Páginas

**Guía práctica de páginas disponibles y cómo crearlas.**

## 🎯 **¿Qué Son las Páginas?**

Las páginas son componentes que representan rutas completas de la aplicación. Cada página tiene su propia lógica, estado y puede usar otros componentes, hooks y servicios. **Son el punto de entrada** para cada sección de tu aplicación.

## 📱 **Páginas Disponibles**

### **Contact - Página de Contacto**
**¿Para qué sirve?** Demuestra el uso del sistema de loading global y spinners locales.

**Características:**
- Formulario de contacto funcional
- Ejemplos de loading global
- Demostración de diferentes tipos de spinners
- Uso del hook `useLoadingContext`

**Cómo usarla:**
```tsx
import { Contact } from '../../pages';

// En tu router
<Route path="/contact" element={<Contact />} />
```

**Casos de uso:**
- 📝 **Formularios de contacto** - Para usuarios que quieren comunicarse
- 🎯 **Demostración de features** - Mostrar capacidades del sistema
- 🔄 **Testing de loading** - Probar estados de carga

### **WelcomePage - Página de Bienvenida**
**¿Para qué sirve?** Demuestra el uso del hook `useResponsive` para diseño adaptativo.

**Características:**
- Diseño completamente responsive
- Ejemplos de contenedores, espaciado, tipografía
- Grids y flexbox adaptativos
- Información del equipo y características

**Cómo usarla:**
```tsx
import { WelcomePage } from '../../pages';

// En tu router
<Route path="/" element={<WelcomePage />} />
```

**Casos de uso:**
- 🏠 **Página principal** - Landing page de la aplicación
- 📱 **Demo responsive** - Mostrar capacidades adaptativas
- 👥 **Presentación del equipo** - Información sobre desarrolladores

## 🏗️ **Cómo Crear una Nueva Página**

### **Paso 1: Crear la carpeta de la página**
```
src/pages/MiNuevaPagina/
├── index.tsx       # Página principal
└── utils.ts        # Funciones auxiliares (opcional)
```

### **Paso 2: Crear la página principal**
```tsx
// src/pages/MiNuevaPagina/index.tsx
import React from 'react';
import { useResponsive } from '../../hooks';

const MiNuevaPagina: React.FC = () => {
  const { container, text, spacing } = useResponsive();
  
  return (
    <div className={`${container} ${spacing.py.large}`}>
      <h1 className={text.h1}>Mi Nueva Página</h1>
      <p className={text.body}>Contenido de la página</p>
    </div>
  );
};

export default MiNuevaPagina;
```

### **Paso 3: Exportar centralmente**
```tsx
// src/pages/index.ts
export { default as MiNuevaPagina } from './MiNuevaPagina';
```

### **Paso 4: Agregar a las rutas**
```tsx
// En tu router principal
import { MiNuevaPagina } from '../../pages';

<Route path="/mi-pagina" element={<MiNuevaPagina />} />
```

## 🎨 **Patrones de Diseño Recomendados**

### **1. Usar useResponsive (OBLIGATORIO)**
```tsx
const { container, text, spacing, grid } = useResponsive();

return (
  <div className={`${container} ${spacing.py.large}`}>
    <h1 className={text.h1}>Título</h1>
    <div className={`${grid.columns.two} ${grid.gap.large}`}>
      {/* Contenido */}
    </div>
  </div>
);
```

**¿Por qué es obligatorio?**
- 🚫 **No media queries** - Todo se maneja automáticamente
- 🔄 **Consistencia** - Mismos breakpoints en toda la app
- 📱 **Responsive automático** - Se adapta a cualquier dispositivo

### **2. Estructura de Layout Estándar**
```tsx
const MiPagina: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header>...</header>
      
      {/* Contenido principal */}
      <main className="flex-1">
        {/* Contenido de la página */}
      </main>
      
      {/* Footer */}
      <footer>...</footer>
    </div>
  );
};
```

**Ventajas de esta estructura:**
- 🎯 **Semántica HTML** - Header, main, footer claros
- 📱 **Responsive por defecto** - Se adapta a cualquier pantalla
- 🔄 **Reutilizable** - Patrón consistente en todas las páginas

### **3. Manejo de Estados Estandarizado**
```tsx
const MiPagina: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  // Lógica de la página
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {/* Renderizar datos */}
    </div>
  );
};
```

**Patrón de estados:**
- 🔄 **Loading** - Mostrar spinner mientras carga
- 🚫 **Error** - Mostrar mensaje de error si falla
- ✅ **Success** - Mostrar datos cuando todo va bien

## 🚨 **Reglas Importantes**

1. **Siempre** usar `useResponsive` para diseño responsive
2. **Siempre** exportar páginas desde `src/pages/index.ts`
3. **Siempre** usar nomenclatura `PascalCase` para páginas
4. **Siempre** estructurar con header, main y footer cuando sea apropiado
5. **Nunca** definir interfaces en archivos de páginas
6. **Siempre** importar tipos compartidos desde `../../types` (centralizado)
7. **Nunca** usar media queries directamente

## 🔗 **Referencias**

- **README principal**: Ver `../README.md`
- **Hooks**: Ver `../hooks/README.md`
- **Componentes**: Ver `../components/README.md`
- **Sistema de tipos**: Ver `../types/README.md`
