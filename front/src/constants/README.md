# 🎴 Ecosistema de Cards y Configuraciones

Este documento describe el sistema de configuración de cards, secciones y mapeos centralizados.

---

## 📋 Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Card Configs](#card-configs)
3. [Section Mapping](#section-mapping)
4. [Page Headers](#page-headers)
5. [Flujo de Datos](#flujo-de-datos)
6. [Guía de Uso](#guía-de-uso)

---

## 🏗️ Arquitectura General

```
constants/
├── cardConfigs.ts      → Configuración de cards por página
├── sectionMapping.ts   → Mapeo de rutas ↔ secciones del backend
├── pageHeaders.ts      → Títulos y descripciones de páginas
├── iconFactory.ts      → Factory para crear iconos
├── allianceData.ts     → Datos de alianzas (logos, URLs)
└── index.ts           → Exportaciones centralizadas
```

---

## 🎴 Card Configs

**Archivo:** `cardConfigs.ts`

### **Propósito**
Define la configuración visual y funcional de todas las cards del sistema.

### **Estructura**
```typescript
export interface CardConfig {
  id: string;                      // Identificador único
  title: string;                   // Título de la card
  description: string;             // Descripción
  icon?: React.ReactNode;          // Icono principal
  leftHeaderContent?: React.ReactNode;  // Contenido izquierdo del header
  rightHeaderContent?: React.ReactNode; // Acciones (editar/eliminar)
  image?: string;                  // Imagen de fondo
  href?: string;                   // Navegación interna (React Router)
  onClick?: () => void;            // Click handler personalizado
  sectionType?: string;            // ID de sección (para backend)
  resourceName?: string;           // Nombre del recurso en backend
  showModal?: boolean;             // Mostrar modal de alianzas
  isActive?: boolean;              // Estado del recurso (soft delete)
}
```

### **Sistema de Tamaños de Cards**

**IMPORTANTE:** El tamaño se define a nivel de página, NO por card individual.

```typescript
// En las páginas
<CardGrid 
  cards={cards} 
  onCardClick={handleCardClick}
  defaultCardSize="medium"  // ← Todas las cards usan este tamaño
/>
```

#### **Tamaños Disponibles:**

| Tamaño | Dimensiones | Uso | Características |
|--------|-------------|-----|-----------------|
| **small** | 240x240px | Galerías, listas compactas | Sin botón, iconos 20px |
| **medium** | 320x320px (DEFAULT) | Navegación estándar | Con botón "Ir", iconos 32px |
| **rectangular** | 480x280px | Contenido extenso | Con botón, iconos 32px, formato horizontal |

#### **Ejemplos de Uso:**

```typescript
// Página con cards pequeñas (galería)
<CardGrid defaultCardSize="small" columns={3} />

// Página estándar (Dashboard, Alianza, etc.)
<CardGrid defaultCardSize="medium" columns={3} />

// Página con cards rectangulares (contenido extenso)
<CardGrid defaultCardSize="rectangular" columns={2} />
```

### **Configuraciones por Página**

```typescript
// Dashboard (navegación)
export const dashboardPageCards: CardConfig[] = [
  { id: 'nueva-alianza', title: 'Nuestra alianza', href: '/alianza', ... },
  { id: 'gobernanza', title: 'Gobernanzas', href: '/gobernanza', ... },
  // ... 6 cards totales
];

// Alianza (con backend)
export const alianzaPageCards: CardConfig[] = [
  {
    id: 'portafolio-precios',
    title: 'Portafolio y Precios',
    sectionType: SECTION_IDS.ALIANZA,          // ← Vinculado a sección
    resourceName: 'Portafolio y Precios',      // ← Vinculado a recurso
    rightHeaderContent: /* Iconos editar/eliminar */
  },
  // ... 6 cards totales
];

// Gestión (con backend)
export const gestionPageCards: CardConfig[] = [
  {
    id: 'tablero-pbi-ventas',
    title: 'Tablero PBI ventas',
    sectionType: SECTION_IDS.GESTION,
    resourceName: 'Tablero PBI Ventas',
    showModal: true  // ← Múltiples alianzas
  },
  // ... 6 cards totales
];

// Iniciativas (con backend)
export const iniciativasPageCards: CardConfig[] = [
  { /* ... */ },  // 2 cards totales
];
```

### **Exportación Principal**

```typescript
export const cardConfigs = {
  dashboard: dashboardPageCards,
  alianza: alianzaPageCards,
  gobernanza: gobernanzaPageCards,
  gestion: gestionPageCards,
  iniciativas: iniciativasPageCards
} as const;

export type PageType = keyof typeof cardConfigs;

export const getCardConfig = (pageType: PageType): CardConfig[] => {
  return cardConfigs[pageType] || [];
};
```

---

## 🗺️ Section Mapping

**Archivo:** `sectionMapping.ts`

### **Propósito**
Centraliza el mapeo entre rutas del frontend y secciones del backend, evitando hardcodear IDs.

### **Estructura Principal**

```typescript
export const ROUTE_TO_SECTION_MAP = {
  '/alianza': {
    sectionId: '68c9f2d8d6dbf0c558131e16',
    title: 'Nuestra Alianza'
  },
  '/gobernanza': {
    sectionId: '68cadb4f54f9344f27defc7b',
    title: 'Gobernanza'
  },
  '/gestion': {
    sectionId: '68cadccc54f9344f27defc7f',
    title: 'Gestión'
  },
  '/iniciativas': {
    sectionId: '68cadd0154f9344f27defc81',
    title: 'Iniciativas'
  }
} as const;
```

### **IDs Centralizados**

```typescript
export const SECTION_IDS = {
  ALIANZA: ROUTE_TO_SECTION_MAP['/alianza'].sectionId,
  GOBERNANZA: ROUTE_TO_SECTION_MAP['/gobernanza'].sectionId,
  GESTION: ROUTE_TO_SECTION_MAP['/gestion'].sectionId,
  INICIATIVAS: ROUTE_TO_SECTION_MAP['/iniciativas'].sectionId,
} as const;
```

**✅ Uso correcto:**
```typescript
// En cardConfigs.ts
{
  sectionType: SECTION_IDS.ALIANZA  // ✅ Centralizado
}

// ❌ Evitar:
{
  sectionType: '68c9f2d8d6dbf0c558131e16'  // ❌ Hardcoded
}
```

### **Funciones Útiles**

```typescript
// Obtener configuración por ruta
getSectionByRoute('/alianza')  // → { sectionId: '...', title: '...' }

// Obtener todas las secciones
getAllSections()  // → [{ route: '/alianza', sectionId: '...', title: '...' }, ...]

// Verificar si ruta tiene sección
hasSection('/alianza')  // → true

// Obtener título por ID
getSectionTitleById('68c9f2d8d6dbf0c558131e16')  // → 'Nuestra Alianza'
```

### **Uso en Búsqueda**

```typescript
// En useSearchResult.ts
case 'Sección': {
  const sectionRoute = Object.entries(ROUTE_TO_SECTION_MAP).find(
    ([, config]) => config.sectionId === result.id
  );
  targetPath = sectionRoute ? sectionRoute[0] : '/dashboard';
  break;
}
```

---

## 📰 Page Headers

**Archivo:** `pageHeaders.ts`

### **Propósito**
Define títulos y descripciones dinámicas para cada página.

### **Estructura**

```typescript
export const pageHeaders = {
  '/': {
    title: 'Inicio',
  },
  '/dashboard': {
    title: 'Conoce nuestros beneficios y funcionalidades',
  },
  '/alianza': {
    title: 'Nuestra alianza',
    description: 'Información básica del acuerdo...'
  },
  '/gestion': {
    title: 'Gestión',
    description: 'Tableros de gestión y calendario académico'
  },
  '/iniciativas': {
    title: 'Iniciativas',
    description: 'Planes de acción con las alianzas internas'
  },
  // ...
} as const;
```

### **Uso**

```typescript
// Automático con usePageHeader()
const PageName: React.FC = () => {
  usePageHeader();  // ← Configura título según ruta actual
  
  return <div>...</div>;
};
```

---

## 🔄 Flujo de Datos

### **1. Configuración de Cards**

```
cardConfigs.ts (static config)
         ↓
   getCardConfig(pageType)
         ↓
   useCards({ pageType })
         ↓
   Página (useState<CardConfig[]>)
         ↓
   CardGrid (render)
```

### **2. Vinculación con Backend**

```
Card Config
   ├── sectionType: SECTION_IDS.ALIANZA
   │      ↓
   │   Backend: GET /resources?sectionType=68c9f2d8d6dbf0c558131e16
   │      ↓
   │   Recursos de la sección
   │
   └── resourceName: 'Portafolio y Precios'
          ↓
       Backend: Busca recurso por nombre
          ↓
       Abre modal de alianzas o navega directo
```

### **3. Section Mapping en Búsqueda**

```
Usuario busca "gestión"
         ↓
Backend retorna: { id: '68cadccc54f9344f27defc7f', ... }
         ↓
useSearchResult.ts mapea: sectionId → ruta
         ↓
ROUTE_TO_SECTION_MAP['/gestion'].sectionId === result.id
         ↓
navigate('/gestion')
```

---

## 📚 Guía de Uso

### **Agregar Nueva Sección**

**1. Actualizar `sectionMapping.ts`:**
```typescript
export const ROUTE_TO_SECTION_MAP = {
  // ...
  '/planeacion': {
    sectionId: '68cadba054f9344f27defc7d',  // ← ID del backend
    title: 'Planeación'
  }
} as const;

export const SECTION_IDS = {
  // ...
  PLANEACION: ROUTE_TO_SECTION_MAP['/planeacion'].sectionId,
} as const;
```

**2. Crear cards en `cardConfigs.ts`:**
```typescript
export const planeacionPageCards: CardConfig[] = [
  {
    id: 'metas',
    title: 'Metas',
    sectionType: SECTION_IDS.PLANEACION,  // ← Usar constante
    resourceName: 'Metas Proyectadas'
  },
  // ...
];

export const cardConfigs = {
  // ...
  planeacion: planeacionPageCards
} as const;
```

**3. Agregar header en `pageHeaders.ts`:**
```typescript
export const pageHeaders = {
  // ...
  '/planeacion': {
    title: 'Planeación',
    description: 'Metas proyectadas más desarrollo de productos'
  }
} as const;
```

**4. Crear página en `src/pages/Planeacion/index.tsx`:**
```typescript
// Seguir el patrón de Alianza (ver src/pages/README.md)
```

### **Modificar Card Existente**

```typescript
// cardConfigs.ts
{
  id: 'portafolio-precios',
  title: 'Nuevo Título',  // ← Cambiar solo aquí
  sectionType: SECTION_IDS.ALIANZA,  // ← No cambiar (viene de backend)
  resourceName: 'Portafolio y Precios'  // ← Debe coincidir con backend
}
```

---

## 🔗 Referencias

- **Patrón de Páginas:** `src/pages/README.md`
- **Implementación Referencia:** `src/pages/Alianza/index.tsx`
- **Hooks:** `src/hooks/useCards.ts`, `src/hooks/usePageHeader.ts`
- **Componentes:** `src/components/CardGrid/`, `src/components/Card/`

---

**Última actualización:** Sistema de section mapping y estandarización completa

