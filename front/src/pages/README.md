# 📄 Patrón de Páginas con Backend

Este documento describe el **patrón estandarizado** para páginas que se conectan al backend y gestionan recursos dinámicos.

---

## 📋 Tabla de Contenidos

1. [Páginas que Siguen el Patrón](#páginas-que-siguen-el-patrón)
2. [Estructura del Patrón](#estructura-del-patrón)
3. [Componentes del Patrón](#componentes-del-patrón)
4. [Sistema de Eventos](#sistema-de-eventos)
5. [Flujo de Datos](#flujo-de-datos)
6. [Ejemplo Completo](#ejemplo-completo)

---

## 📍 Páginas que Siguen el Patrón

| Página | Ruta | Cards | Columnas | Backend |
|--------|------|-------|----------|---------|
| **Alianza** | `/alianza` | 6 | 3 | ✅ |
| **Gestión** | `/gestion` | 6 | 3 | ✅ |
| **Iniciativas** | `/iniciativas` | 2 | 2 | ✅ |

> **Nota:** Dashboard es una página de navegación simple (sin gestión de recursos).

---

## 🏗️ Estructura del Patrón

### **1. Imports Requeridos**
```typescript
import React, { useEffect, useState } from 'react';
import { CardGrid, ResourceEditModal, ResourceDeleteModal } from '../../components';
import { useCards, usePageHeader, useResourceManagement } from '../../hooks';
import { useScreenSize } from '../../context';
import type { CardConfig } from '../../constants';
```

### **2. Hooks en Orden**
```typescript
const PageName: React.FC = () => {
  // 1. Context hooks
  const { getContainerForScreen, dimensions } = useScreenSize();
  
  // 2. Resource management (modales)
  const { 
    editModalOpen, deleteModalOpen, selectedResource,
    closeModals, handleEditClick, handleDeleteClick,
    handleUpdateResource, handleSoftDeleteResource
  } = useResourceManagement();
  
  // 3. Cards configuration
  const { cards: baseCards, handleCardClick } = useCards({ 
    pageType: 'pageName',
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick
  });
  
  // 4. Local state
  const [cards, setCards] = useState<CardConfig[]>(baseCards);
  
  // 5. Page header
  usePageHeader();
```

### **3. Effects (Sincronización y Eventos)**
```typescript
  // Mount: sincronizar cards
  useEffect(() => {
    setCards(baseCards);
  }, []);

  // Evento 1: Recurso eliminado
  useEffect(() => {
    const handleResourceDeleted = (event: CustomEvent) => {
      const { resource } = event.detail;
      setCards(prevCards => 
        prevCards.map(card => 
          card.resourceName === resource.name 
            ? { ...card, isActive: false }
            : card
        )
      );
    };
    window.addEventListener('resourceDeleted', handleResourceDeleted as EventListener);
    return () => window.removeEventListener('resourceDeleted', handleResourceDeleted as EventListener);
  }, []);

  // Evento 2: Recurso restaurado
  useEffect(() => {
    const handleResourceRestored = (event: CustomEvent) => {
      const { resourceName } = event.detail;
      setCards(prevCards => 
        prevCards.map(card => 
          card.resourceName === resourceName 
            ? { ...card, isActive: true }
            : card
        )
      );
    };
    window.addEventListener('resourceRestored', handleResourceRestored as EventListener);
    return () => window.removeEventListener('resourceRestored', handleResourceRestored as EventListener);
  }, []);

  // Evento 3: Recurso actualizado
  useEffect(() => {
    const handleResourceUpdated = (event: CustomEvent) => {
      const { oldName, newName } = event.detail;
      setCards(prevCards => 
        prevCards.map(card => 
          card.resourceName === oldName 
            ? { ...card, title: newName, resourceName: newName }
            : card
        )
      );
    };
    window.addEventListener('resourceUpdated', handleResourceUpdated as EventListener);
    return () => window.removeEventListener('resourceUpdated', handleResourceUpdated as EventListener);
  }, []);
```

### **4. Render**
```typescript
  return (
    <div className={`${getContainerForScreen()}`}>
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
      {cards.length > 0 ? (
        <CardGrid 
          cards={cards} 
          onCardClick={handleCardClick}
          defaultCardSize="medium"
        />
      ) : (
        <div className="text-center py-12">
          {/* Estado vacío */}
        </div>
      )}
    </div>
  );
};
```

---

## 🧩 Componentes del Patrón

### **useResourceManagement()**
Gestiona el estado de los modales de edición y eliminación.

**Retorna:**
- `editModalOpen`, `deleteModalOpen`: Estados de modales
- `selectedResource`: Recurso seleccionado actualmente
- `closeModals()`: Cierra todos los modales
- `handleEditClick(resourceName)`: Abre modal de edición
- `handleDeleteClick(resourceName)`: Abre modal de eliminación
- `handleUpdateResource(data)`: Actualiza recurso en backend
- `handleSoftDeleteResource()`: Elimina (soft delete) recurso

### **useCards({ pageType, onEditClick, onDeleteClick })**
Obtiene configuración de cards desde `cardConfigs.ts` y gestiona permisos.

**Parámetros:**
- `pageType`: Tipo de página (`'alianza'`, `'gestion'`, `'iniciativas'`)
- `onEditClick`: Callback para botón de editar
- `onDeleteClick`: Callback para botón de eliminar

**Retorna:**
- `cards`: Array de configuración de cards
- `handleCardClick(card)`: Función para manejar clicks en cards

### **usePageHeader()**
Configura automáticamente el título del header según la ruta actual usando `pageHeaders.ts`.

---

## 📡 Sistema de Eventos

### **Eventos Globales (CustomEvent)**

| Evento | Payload | Propósito |
|--------|---------|-----------|
| `resourceDeleted` | `{ resource: IResource }` | Notifica eliminación de recurso |
| `resourceRestored` | `{ resourceName: string }` | Notifica restauración de recurso |
| `resourceUpdated` | `{ oldName: string, newName: string }` | Notifica actualización de nombre |

### **¿Por qué CustomEvent?**
- ✅ **Comunicación desacoplada** entre componentes
- ✅ **Sincronización visual** inmediata sin recargar
- ✅ **Múltiples listeners** pueden reaccionar al mismo evento
- ✅ **Tipado fuerte** con TypeScript

### **Flujo de Eventos:**
```
[Modal] → dispatch(CustomEvent) → [window] → [useEffect listeners] → setState → Re-render
```

---

## 🔄 Flujo de Datos

```
1. Mount Component
   ↓
2. useCards obtiene configuración estática (cardConfigs.ts)
   ↓
3. useState inicializa con baseCards
   ↓
4. useEffect sincroniza cards (mount)
   ↓
5. Usuario interactúa (edit/delete)
   ↓
6. Modal actualiza backend
   ↓
7. Modal dispara CustomEvent
   ↓
8. useEffect listener captura evento
   ↓
9. setState actualiza cards localmente
   ↓
10. Re-render con nueva información
```

---

## 📝 Ejemplo Completo

Ver implementación de referencia en:
- **`src/pages/Alianza/index.tsx`** - Patrón completo con backend
- **`src/pages/Gestion/index.tsx`** - Mismo patrón, 6 cards
- **`src/pages/iniciativas/index.tsx`** - Mismo patrón, 2 cards centradas

---

## ✅ Checklist de Implementación

Al crear una nueva página con backend, verifica:

- [ ] Imports correctos (CardGrid, modales, hooks)
- [ ] useResourceManagement() configurado
- [ ] useCards() con pageType correcto
- [ ] useState para cards locales
- [ ] usePageHeader() para título dinámico
- [ ] 3 useEffect para eventos (deleted, restored, updated)
- [ ] CustomEvent con destructuring limpio
- [ ] Cleanup en cada useEffect
- [ ] Modales en el render
- [ ] CardGrid con defaultCardSize="medium"
- [ ] Estado vacío implementado
- [ ] Sin código duplicado o inalcanzable

---

## 🔗 Referencias

- **Cards Config:** `src/constants/cardConfigs.ts`
- **Section Mapping:** `src/constants/sectionMapping.ts`
- **Page Headers:** `src/constants/pageHeaders.ts`
- **Resource Management:** `src/hooks/useResourceManagement.ts`
- **Cards Hook:** `src/hooks/useCards.ts`

---

**Última actualización:** Estandarización completa del ecosistema de cards

