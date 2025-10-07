# 📋 Documentación del Ecosistema de Cards

## 🎯 Visión General

El ecosistema de cards está diseñado con **separación clara de responsabilidades** y **escalabilidad** en mente. Cada componente tiene una función específica y bien definida.

## 📁 Arquitectura del Sistema

```
📁 constants/
├── cardConfigs.ts          # SOLO configuración de cards
├── iconFactory.ts          # Factory para creación de iconos
└── index.ts               # Exportaciones centralizadas

📁 services/
├── allianceNavigationService.ts  # Lógica de navegación de alianzas
├── resourceService.ts           # CRUD de recursos
└── index.ts                    # Exportaciones centralizadas

📁 hooks/
├── useCards.ts                   # Hook coordinador de cards
├── useResourceManagement.ts      # Hook para edit/delete de recursos
├── useResourceRestoration.ts     # Hook para restaurar recursos eliminados
└── index.ts                      # Exportaciones centralizadas

📁 components/
├── Card/index.tsx                # Componente visual de card
├── AllianceSelectionModal/       # Modal de selección de alianzas
├── ResourceEditModal/            # Modal para editar recursos
├── ResourceDeleteModal/          # Modal para confirmar soft delete
├── ResourceRestoreModal/         # Modal para restaurar recursos
└── index.ts                      # Exportaciones centralizadas
```

## 🔧 Componentes Principales

### 1. **cardConfigs.ts** - Configuración Pura

**Responsabilidad**: Solo definir la estructura y contenido de las cards.

```typescript
export interface CardConfig {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  leftHeaderContent?: React.ReactNode;
  rightHeaderContent?: React.ReactNode;
  image?: string;
  href?: string;
  onClick?: () => void;
  
  // Identificadores para lógica de alianzas
  sectionType?: string;
  resourceName?: string;
  showModal?: boolean;
}
```

**Tipos de Cards**:
- **Dashboard**: Cards con navegación simple (`href`)
- **Alianza**: Cards con lógica compleja (`sectionType`, `resourceName`, `showModal`)
- **Gobernanza**: Cards con navegación simple (`href`)

### 2. **iconFactory.ts** - Factory de Iconos

**Responsabilidad**: Crear iconos escalados usando el sistema `useResponsive`.

```typescript
// Funciones disponibles
createIcon(IconComponent, baseSize, color?)
createSemiboldIcon(IconComponent, baseSize, color?)
createIconWithCircle(IconComponent, baseSize, color?)
createMultipleIcons(icons[], baseGap?)
```

### 3. **allianceNavigationService.ts** - Lógica de Navegación

**Responsabilidad**: Manejar toda la lógica de navegación de alianzas.

```typescript
// Funciones principales
handleAllianceCardClick(sectionType, resourceName?, showModal?)
showAllianceSelectionModal(alliances, resource)
getResourcesBySection(sectionType)
getAlliances()
findResourceByName(resources, resourceName?)
```

### 4. **useCards.ts** - Hook Coordinador

**Responsabilidad**: Coordinar entre configuración y lógica.

```typescript
const { cards, handleCardClick } = useCards('alianza');

// handleCardClick maneja:
// 1. Navegación simple (href)
// 2. Lógica personalizada (onClick)
// 3. Lógica de alianzas (sectionType)
```

## 🚀 Cómo Agregar una Nueva Card

### Para Navegación Simple (Dashboard/Gobernanza)

```typescript
// En cardConfigs.ts
{
  id: 'nueva-card',
  title: 'Nueva Card',
  description: 'Descripción de la card',
  image: '/img/nuevaCard.jpg',
  href: '/nueva-ruta'
}
```

### Para Lógica de Alianzas

```typescript
// En cardConfigs.ts
{
  id: 'nueva-alianza-card',
  title: 'Nueva Card de Alianza',
  description: '',
  leftHeaderContent: createSemiboldIcon(Star, 32, '#1E285F'),
  rightHeaderContent: createMultipleIcons([
    { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true },
    { component: Edit2, size: 18, color: '#5D5A88', withCircle: true }
  ]),
  sectionType: 'ID_DE_SECCION',
  resourceName: 'Nombre del Recurso',
  showModal: true // Si necesita modal de selección
}
```

## 🔗 Endpoints del Backend

### Recursos (Resources)

```typescript
// Base URL: /api/resources

GET    /                           // Obtener todos los recursos
GET    /:id                        // Obtener recurso por ID
GET    /section/:sectionId         // Obtener recursos por sección
PUT    /:id                        // Editar recurso (admin/director)
POST   /                           // Crear recurso (admin/director)
DELETE /:id                        // Soft delete (admin/director)
PATCH  /restore/:id                // Restaurar recurso (admin/director)
```

### Modelo de Recurso

```typescript
interface IResource {
  _id: string;
  sectionId: ObjectId;
  name: string;                    // ✅ EDITABLE
  description?: string;            // ✅ EDITABLE
  links: Array<{                  // ✅ EDITABLE
    label?: string;               // Ej: "EAFIT", "Directorio"
    url: string;                  // URL del recurso
  }>;
  isActive: boolean;              // Para soft delete
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;         // Para soft delete
}
```

## 🎨 Sistema de Gestión de Recursos (CRUD)

### Iconos de Acción Disponibles

- **EyeOff**: Soft delete (solo admin/director)
- **Edit2**: Editar recurso (solo admin/director)

### Implementación de Iconos de Acción

```typescript
// En cardConfigs.ts - Configuración de card con iconos de acción
{
  id: 'portafolio-precios',
  title: 'Portafolio y precios',
  description: '',
  leftHeaderContent: createSemiboldIcon(Star, 32, '#1E285F'),
  rightHeaderContent: createMultipleIcons([
    { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
    { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
  ]),
  sectionType: '68c9f2d8d6dbf0c558131e16',
  resourceName: 'Portafolio y Precios'  // ✅ Identificador del recurso
}
```

### Hook: useResourceManagement

**Responsabilidad**: Gestionar el estado y lógica de edición y eliminación de recursos.

```typescript
const {
  editModalOpen,           // Estado del modal de edición
  deleteModalOpen,         // Estado del modal de eliminación
  selectedResource,        // Recurso actualmente seleccionado
  handleEditClick,         // Handler para abrir modal de edición
  handleDeleteClick,       // Handler para abrir modal de eliminación
  handleUpdateResource,    // Handler para actualizar recurso
  handleSoftDeleteResource,// Handler para soft delete
  closeModals             // Cerrar todos los modales
} = useResourceManagement();
```

### Hook: useResourceRestoration

**Responsabilidad**: Gestionar la restauración de recursos eliminados con persistencia en localStorage.

```typescript
const {
  deletedResources,        // Lista de recursos eliminados
  loading,                 // Estado de carga
  restoreLoading,          // ID del recurso siendo restaurado
  handleRestoreResource,   // Handler para restaurar un recurso
  refreshDeletedResources, // Refrescar lista de recursos eliminados
  loadDeletedResources,    // Cargar recursos eliminados (lazy)
  hasCheckedResources     // Si ya se verificaron los recursos
} = useResourceRestoration();
```

### Integración en Página (Alianza)

```typescript
const Alianza: React.FC = () => {
  // Hook de gestión de recursos
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
  
  // Hook de cards con handlers de edit/delete
  const { cards, handleCardClick } = useCards({ 
    pageType: 'alianza',
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick
  });

  return (
    <div>
      {/* Modales de gestión */}
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
      
      {/* Grid de cards */}
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  );
};
```

### Sistema de Eventos Personalizados

El sistema utiliza eventos personalizados para actualización automática:

```typescript
// Evento disparado al eliminar un recurso
window.dispatchEvent(new CustomEvent('resourceDeleted', {
  detail: { resourceId, resourceName, resource }
}));

// Evento disparado al restaurar un recurso
window.dispatchEvent(new CustomEvent('resourceRestored', {
  detail: { resourceId, resourceName }
}));
```

### Persistencia en localStorage

Los recursos eliminados se persisten en localStorage para mantener el estado entre:
- Recargas de página
- Cambios de rol
- Navegación entre páginas

```typescript
// Clave en localStorage
const DELETED_RESOURCES_KEY = 'deletedResources';

// Se actualiza automáticamente en:
// - Soft delete de recurso
// - Restauración de recurso
// - Eventos personalizados
```

### Botón de Restaurar en Header

El header muestra un botón de restaurar que:
- ✅ Solo visible para Admin/Director
- ✅ Solo en páginas Alianza/Gobernanza
- ✅ Siempre visible (independiente de si hay recursos eliminados)
- ✅ Abre modal con lista de recursos para restaurar

```typescript
// En header.tsx
{shouldShowRestoreButton && (
  <Button
    variant="secondary"
    iconLeft={<RotateCcw size={18} />}
    onClick={() => setRestoreModalOpen(true)}
  >
    Restaurar
  </Button>
)}
```

## 🔧 Servicios de Recursos

### resourceManagementService.ts (Frontend)

```typescript
// ✅ Operaciones CRUD implementadas
export const getAllResources = async (): Promise<IResource[]>
export const getResourceById = async (id: string): Promise<IResource>
export const getResourcesBySection = async (sectionId: string): Promise<IResource[]>
export const createResource = async (resourceData: CreateResourceData): Promise<IResource>
export const updateResource = async (id: string, data: UpdateResourceData): Promise<IResource>
export const softDeleteResource = async (id: string): Promise<IResource>
export const restoreResource = async (id: string): Promise<IResource>
export const getDeletedResources = async (): Promise<IResource[]>

// ✅ Utilidades
export const getResourceIdByName = (resourceName: string): string | null
export const getResourceByName = async (resourceName: string): Promise<IResource | null>

// ✅ Mapeo de nombres a IDs
export const RESOURCE_NAME_TO_ID_MAP: Record<string, string> = {
  'Portafolio y Precios': '68c22af480f85343fb2bf920',
  'Fichas técnicas y Grabaciones...': '68cae80754f9344f27defc8b',
  // ... más recursos
}
```

### Modales Implementados

1. **ResourceEditModal**: Modal para editar recursos
   - Campos: name, description, links
   - Validación de campos requeridos
   - Diseño consistente con la app

2. **ResourceDeleteModal**: Modal de confirmación para soft delete
   - Muestra nombre del recurso
   - Confirmación explícita
   - Diseño con gradiente rojo

3. **ResourceRestoreModal**: Modal para restaurar recursos eliminados
   - Lista de recursos eliminados
   - Información de sección y fecha
   - Botón individual para restaurar cada recurso
   - Persistencia en localStorage

## 📱 Sistema de Escalado

### useResponsive Hook

```typescript
const { scale } = useResponsive();

// Todos los tamaños usan scale()
style={{ 
  fontSize: `${scale(16)}px`,
  padding: `${scale(24)}px`,
  borderRadius: `${scale(12)}px`
}}
```

### Modal de Alianzas - Escalado

```typescript
// La modal usa escalado dinámico
style={{ 
  maxWidth: `${scale(768)}px`,
  maxHeight: `calc(100vh - ${scale(32)}px)`
}}
```

## 🔐 Permisos y Roles

### Iconos de Acción

- **Edit (Edit2)**: Todos los usuarios autenticados
- **Soft Delete (EyeOff)**: Solo admin y director

### Implementación de Permisos

```typescript
// En useCards.ts
const { user } = useAuth();

const canEdit = true; // Todos los usuarios
const canDelete = Boolean(user?.isAdmin || user?.role === 'director');
```

## 🚀 Flujo Completo de una Card de Alianza

1. **Usuario hace click** en card
2. **useCards.handleCardClick** detecta `sectionType`
3. **allianceNavigationService.handleAllianceCardClick** se ejecuta
4. **Obtiene recursos** de la sección
5. **Busca recurso específico** por `resourceName`
6. **Si `showModal: true`**:
   - Obtiene alianzas
   - Filtra alianzas (excluye UNINORTE)
   - Muestra `AllianceSelectionModal`
7. **Si `showModal: false`**:
   - Navega directamente al primer link
8. **Usuario selecciona alianza** → Navega a URL específica

## 🔧 Cómo Implementar Iconos de Acción

### 1. Actualizar CardConfig Interface

```typescript
export interface CardConfig {
  // ... campos existentes
  
  // Nuevos campos para iconos de acción
  resourceId?: string;        // ID del recurso específico
  canEdit?: boolean;          // Si el usuario puede editar
  canDelete?: boolean;        // Si el usuario puede hacer soft delete
}
```

### 2. Crear Servicios de Recursos

```typescript
// En services/resourceService.ts
export const updateResource = async (id: string, data: Partial<IResource>) => {
  const response = await api.put(`/resources/${id}`, data);
  return response.data.data;
};

export const softDeleteResource = async (id: string) => {
  const response = await api.delete(`/resources/${id}`);
  return response.data.data;
};
```

### 3. Crear Modales

```typescript
// ResourceEditModal.tsx
// DeleteConfirmationModal.tsx
```

### 4. Actualizar useCards Hook

```typescript
const handleCardClick = (card: CardConfig) => {
  if (card.href) {
    navigate(card.href);
  } else if (card.onClick) {
    card.onClick();
  } else if (card.sectionType) {
    handleAllianceCardClick(card.sectionType, card.resourceName, card.showModal);
  }
};

const handleIconClick = (action: 'edit' | 'delete', card: CardConfig) => {
  if (action === 'edit' && card.resourceId) {
    showResourceEditModal(card.resourceId);
  } else if (action === 'delete' && card.resourceId) {
    showDeleteConfirmationModal(card.resourceId);
  }
};
```

## 📋 Checklist para Implementar Iconos de Acción

- [ ] Actualizar `CardConfig` interface
- [ ] Crear servicios de recursos en frontend
- [ ] Crear `ResourceEditModal`
- [ ] Crear `DeleteConfirmationModal`
- [ ] Actualizar `useCards` hook
- [ ] Agregar `onClick` handlers a iconos
- [ ] Implementar permisos por rol
- [ ] Agregar `resourceId` a cards existentes
- [ ] Probar funcionalidad completa

## 🎯 Beneficios del Sistema Actual

1. **Separación de responsabilidades**: Cada archivo tiene una función específica
2. **Escalabilidad**: Fácil agregar nuevos tipos de cards
3. **Mantenibilidad**: Lógica centralizada y bien organizada
4. **Reutilización**: Servicios y hooks reutilizables
5. **Sistema de escalado**: Responsive en todas las pantallas
6. **Permisos flexibles**: Control granular de acceso

## 🔄 Flujo de Desarrollo

1. **Agregar nueva card**: Solo modificar `cardConfigs.ts`
2. **Cambiar lógica**: Modificar servicios correspondientes
3. **Agregar iconos**: Usar `iconFactory.ts`
4. **Cambiar comportamiento**: Modificar hooks
5. **Agregar modales**: Crear componentes independientes

---

**Esta documentación proporciona una guía completa para entender y extender el ecosistema de cards de manera eficiente y mantenible.**
