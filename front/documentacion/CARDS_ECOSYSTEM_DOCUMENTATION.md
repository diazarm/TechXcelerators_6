# 📋 Sistema de Cards

## 🎯 Visión General

Sistema de cards modular con tres tamaños, gestión de recursos (CRUD), navegación automática de alianzas y escalado responsive.

## 📁 Arquitectura

```
constants/cardConfigs.ts          → Configuración de cards
constants/iconFactory.ts          → Iconos escalados
services/allianceNavigationService.ts  → Navegación de alianzas
services/resourceManagementService.ts  → CRUD de recursos
hooks/useCards.ts                 → Coordinador de cards
hooks/useResourceManagement.ts    → Gestión edit/delete
hooks/useResourceRestoration.ts   → Restaurar recursos eliminados
components/Card/                  → Componente visual
components/CardGrid/              → Grid de cards
components/AllianceSelectionModal/→ Modal selector de alianzas
components/ResourceEditModal/     → Modal para editar
components/ResourceDeleteModal/   → Modal para eliminar
components/ResourceRestoreModal/  → Modal para restaurar
```

## 📐 Tamaños de Cards

### Small (240x240px base)
- **Uso:** Galerías (9 cards en 3x3)
- **Características:** Sin botón, iconos 20px, formato cuadrado
- **Grid:** `<CardGrid columns={3} defaultCardSize="small" />`
- **Responsive:** 1 col móvil → 2 cols tablet → 3 cols desktop

```tsx
{
  id: 'galeria-1',
  title: 'EAFIT',
  description: 'Universidad EAFIT',
  leftHeaderContent: createIcon(Camera, 20, '#5D5A88'),
  href: '/galeria/eafit',
  size: 'small'
}
```

### Medium (320x320px base) - DEFAULT
- **Uso:** Navegación estándar (Dashboard, Alianza, Gobernanza)
- **Características:** Con botón "Ir", iconos 32px, formato cuadrado
- **Grid:** `<CardGrid columns={3} defaultCardSize="medium" />`
- **Responsive:** 1 col móvil → 2 cols tablet → 3 cols desktop

```tsx
{
  id: 'recursos',
  title: 'Recursos',
  description: 'Gestión de recursos',
  leftHeaderContent: createSemiboldIcon(BookOpen, 32, '#1E285F'),
  href: '/recursos',
  size: 'medium' // Opcional, es el default
}
```

### Rectangular (480x280px base)
- **Uso:** Elementos destacados (4 cards en 2x2, ej: Planeación)
- **Características:** Con botón "Ir", iconos 32px, formato horizontal
- **Grid:** `<CardGrid columns={2} defaultCardSize="rectangular" />`
- **Responsive:** 1 col móvil → 2 cols desktop

```tsx
{
  id: 'budget',
  title: 'Budget',
  description: 'Análisis y proyección financiera',
  leftHeaderContent: createSemiboldIcon(Database, 32, '#1E285F'),
  href: '/budget',
  size: 'rectangular'
}
```

## 📊 Comparativa

| Característica | Small | Medium | Rectangular |
|---------------|-------|--------|-------------|
| Formato | Cuadrado | Cuadrado | Horizontal |
| Base | 240x240px | 320x320px | 480x280px |
| Botón | ❌ | ✅ | ✅ |
| Icono | 20px | 32px | 32px |
| Función icono | `createIcon()` | `createSemiboldIcon()` | `createSemiboldIcon()` |
| Color | `#5D5A88` | `#1E285F` | `#1E285F` |
| Prop columns | 3 | 3 | 2 |
| Layout típico | 3x3 (9) | Variable | 2x2 (4) |

## 🔧 Sistema de Recursos (Backend)

### Modelo IResource
```typescript
interface IResource {
  _id: string;
  sectionId: ObjectId;
  name: string;              // Editable
  description?: string;      // Editable
  links: Array<{            // Editable
    label?: string;
    url: string;
  }>;
  isActive: boolean;        // Soft delete
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;   // Soft delete
}
```

### Endpoints
```
GET    /resources                    → Todos los recursos
GET    /resources/section/:id        → Recursos por sección
PUT    /resources/:id                → Editar (admin/director)
DELETE /resources/:id                → Soft delete (admin/director)
PATCH  /resources/restore/:id        → Restaurar (admin/director)
```

### Iconos de Acción
- **Edit (Edit2):** Solo admin y director
- **Soft Delete (EyeOff):** Solo admin y director

```typescript
// En useCards.ts
const canSeeActions = Boolean(user?.isAdmin || user?.role === 'director');
```

## 🚀 Uso en Páginas

### Navegación Simple (Dashboard/Gobernanza)
```tsx
const MiPagina = () => {
  const { getContainerForScreen } = useScreenSize();
  const { cards, handleCardClick } = useCards({ pageType: 'dashboard' });
  
  return (
    <div className={getContainerForScreen()}>
      <CardGrid 
        cards={cards}
        onCardClick={handleCardClick}
        columns={3}
        defaultCardSize="medium"
      />
    </div>
  );
};
```

### Con Gestión de Recursos (Alianza)
```tsx
const Alianza = () => {
  const { 
    editModalOpen, 
    deleteModalOpen, 
    selectedResource, 
    closeModals,
    handleEditClick, 
    handleDeleteClick,
    handleUpdateResource,
    handleSoftDeleteResource
  } = useResourceManagement();
  
  const { cards, handleCardClick } = useCards({ 
    pageType: 'alianza',
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick
  });

  return (
    <div className={getContainerForScreen()}>
      <ResourceEditModal
        isOpen={editModalOpen}
        onClose={closeModals}
        resource={selectedResource}
        onSave={handleUpdateResource}
      />
      
      <ResourceDeleteModal
        isOpen={deleteModalOpen}
        onClose={closeModals}
        resource={selectedResource}
        onConfirm={handleSoftDeleteResource}
      />
      
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  );
};
```

## 🔄 Flujos de Interacción

### Click en Card (Navegación)
1. Usuario click en botón "Ir"
2. `handleCardClick` detecta `sectionType`
3. `allianceNavigationService` obtiene recursos del backend
4. Si `showModal: true` → Muestra selector de alianzas
5. Si `showModal: false` → Navega directamente al link

### Click en Iconos (Edit/Delete)
**Solo admin y director:**
1. Click en icono Edit/Delete
2. `useResourceManagement` obtiene recurso del backend
3. Abre modal correspondiente
4. Usuario confirma → Operación en backend
5. Dispara evento (`resourceUpdated`/`resourceDeleted`)
6. UI se actualiza automáticamente

## 🎨 Iconos con iconFactory

**Siempre usar iconFactory**, no react-feather directamente:

```tsx
// ✅ CORRECTO
import { createSemiboldIcon } from './iconFactory';
import { Database } from 'react-feather';
leftHeaderContent: createSemiboldIcon(Database, 32, '#1E285F')

// ❌ INCORRECTO
import { Database } from 'react-feather';
icon={<Database className="w-8 h-8 text-purple-600" />}
```

**Beneficios:** Escalado automático, colores estandarizados, mantenibilidad.

## 📝 Configurar Cards en cardConfigs.ts

```tsx
// Card con navegación simple
{
  id: 'mi-card',
  title: 'Mi Card',
  description: 'Descripción',
  leftHeaderContent: createSemiboldIcon(BookOpen, 32, '#1E285F'),
  href: '/ruta',
  size: 'medium'
}

// Card con lógica de alianzas
{
  id: 'alianza-card',
  title: 'Portafolio y Precios',
  description: '',
  leftHeaderContent: createSemiboldIcon(Star, 32, '#1E285F'),
  rightHeaderContent: createMultipleIcons([
    { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
    { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
  ]),
  sectionType: 'ID_SECCION',
  resourceName: 'Portafolio y Precios',
  showModal: true,
  size: 'medium'
}
```

**Nota:** Usar misma lógica para gobernanza, planeacion, iniciativa, gestion, entorno a llamada de backend (recurso/link). Verificar con excel si debe abrir modal (selector de alianza), y considerar que no todas las cards usaran la logica de softDelete/edit, por ejemplo las de galeria usaran solo edit, pero no softDelete (preguntar antes de incorporar).

## 💾 Sistema de Persistencia

**localStorage:** Recursos eliminados se guardan temporalmente para:
- Mantener estado entre recargas
- Permitir restauración sin refresh
- Mejor UX

**Eventos personalizados:**
```typescript
window.dispatchEvent(new CustomEvent('resourceDeleted', { detail: { resourceId } }));
window.dispatchEvent(new CustomEvent('resourceRestored', { detail: { resourceId } }));
```

## 🔐 Botón Restaurar en Header

**Aparece cuando:**
- ✅ Usuario es admin o director
- ✅ Página es Alianza o Gobernanza (actualmente implementadas)
- ✅ Hay recursos eliminados en el backend
- ❌ Se oculta si no hay recursos eliminados

## 🎯 Beneficios

1. Separación de responsabilidades clara
2. Escalabilidad para nuevos tipos de cards
3. Lógica centralizada y mantenible
4. Servicios y hooks reutilizables
5. Sistema de escalado responsive (móvil → 4K)
6. Permisos flexibles por rol
7. Múltiples tamaños automáticos
8. Desarrollador solo especifica `size`, el sistema maneja todo

---

**💡 Para agregar nueva card:** Modificar solo `cardConfigs.ts` con la configuración apropiada según el tipo de interacción necesaria.
