# 🔧 Hooks Personalizados - Scala Learning Frontend

## 📋 Descripción General

Hooks personalizados que encapsulan lógica reutilizable, manejo de estado y efectos secundarios. Organizados por funcionalidad siguiendo las mejores prácticas de React.

## 🏗️ Hooks Disponibles

```
src/hooks/
├── useAuth.ts                  # Autenticación
├── useCards.ts                 # Gestión de tarjetas
├── useResources.ts             # Recursos
├── useDocuments.ts             # Documentos
├── useUserManagement.ts        # Usuarios
├── useResponsive.ts            # Escalado responsivo
├── useNotification.ts          # Notificaciones
├── useLoadingContext.ts        # Estado de carga
├── useSearch.ts                # Búsqueda
├── useAllianceNavigation.ts    # Navegación de alianzas
├── useResourceManagement.ts    # Gestión de recursos
├── useFormValidation.ts        # Validación de formularios
├── useErrorHandler.ts          # Manejo de errores
├── useEscapeKey.ts             # Eventos de teclado
├── useDocumentActions.ts       # Acciones de documentos
├── useResourceRestoration.ts   # Restauración de recursos
├── useUserActions.ts           # Acciones de usuarios
├── useSearchResult.ts          # Resultados de búsqueda
├── useAlliances.ts             # Gestión de alianzas
├── useRegister.ts              # Registro de usuarios
├── useHeader.ts                # Header
├── usePageHeader.ts            # Page header
├── useFocusTrap.ts             # Focus trap para modales
├── useResponsiveImage.ts       # Imágenes responsivas
└── useScaledDimensions.ts      # Dimensiones escaladas
```

## 🔐 Gestión de Estado

### useAuth
**Propósito**: Acceso al contexto de autenticación

**Funcionalidades**:
- Login/logout de usuarios
- Verificación de autenticación (checkAuth)
- Datos del usuario actual
- Manejo de errores de auth

**API**:
```typescript
const {
  user,                    // Usuario actual o null
  isAuthenticated,         // Estado de autenticación
  isLoading,              // Estado de carga
  error,                  // Error de autenticación
  login,                  // Función de login
  logout,                 // Función de logout
  checkAuth,              // Verificar autenticación
  clearError              // Limpiar errores
} = useAuth();
```

### useCards
**Propósito**: Gestión de tarjetas dinámicas con datos del backend

**Funcionalidades**:
- Configuración de tarjetas por tipo de página
- Creación de iconos de acción
- Manejo de permisos por rol
- Optimización de renders

**API**:
```typescript
const {
  cards,                  // Array de tarjetas configuradas
  handleCardClick         // Función para manejar clicks
} = useCards({
  pageType: 'alianza',    // Tipo de página
  onEditClick,           // Callback para edición
  onDeleteClick          // Callback para eliminación
});
```

**Características especiales**:
- **Role-based actions**: Iconos según permisos (admin/director)
- **Responsive scaling**: Escalado automático de iconos
- **Event-driven updates**: Actualización automática vía eventos personalizados

### useResources
**Propósito**: Obtener todos los recursos educativos

**Funcionalidades**:
- Fetch de todos los recursos
- Estado de autenticación para fetch automático
- Estado de loading

**API**:
```typescript
const {
  resources,              // Lista de todos los recursos
  loading                // Estado de carga
} = useResources();
```

**Nota**: Para CRUD de recursos específicos, ver `useResourceManagement`.

### useDocuments
**Propósito**: Listar y filtrar documentos con paginación

**Funcionalidades**:
- Fetch de documentos del backend
- Filtrado por categoría
- Paginación automática
- Refetch manual

**API**:
```typescript
const {
  documents,             // Lista paginada de documentos
  allDocuments,         // Lista completa sin paginar
  loading,              // Estado de carga
  error,                // Error si existe
  refetch,              // Función para recargar
  currentPage,          // Página actual
  totalPages,           // Total de páginas
  itemsPerPage,         // Items por página
  totalItems,           // Total de items
  handlePageChange,     // Cambiar de página
  isAdmin,              // Si el usuario es admin
  categoryFilter,       // Filtro de categoría actual
  handleCategoryFilterChange // Cambiar filtro de categoría
} = useDocuments(itemsPerPage);
```

**Nota**: Para acciones de documentos (upload, edit, delete), ver `useDocumentActions`.

### useUserManagement
**Propósito**: Gestión de usuarios con paginación y filtros

**Funcionalidades**:
- Fetch de usuarios (excluye admins)
- Paginación automática
- Filtros por rol y estado
- Refetch manual

**API**:
```typescript
const {
  users,                 // Lista paginada de usuarios
  loading,              // Estado de carga
  currentPage,          // Página actual
  totalPages,           // Total de páginas
  itemsPerPage,         // Items por página
  handlePageChange,     // Cambiar de página
  roleFilter,           // Filtro de rol actual
  statusFilter,         // Filtro de estado actual
  handleRoleFilterChange, // Cambiar filtro de rol
  handleStatusFilterChange, // Cambiar filtro de estado
  refetch               // Recargar usuarios
} = useUserManagement();
```

**Nota**: Para acciones de usuarios (cambio de rol, toggle status), ver `useUserActions`.

## 🎨 UI/UX Hooks

### useResponsive
**Propósito**: Sistema de escalado responsivo

**Funcionalidades**:
- Escalado proporcional según pantalla
- Breakpoints responsivos
- Dimensiones calculadas
- Memoización para performance

**API**:
```typescript
const {
  scale,                 // Función de escalado
  dimensions,           // Dimensiones de pantalla
  isMobile,             // Es móvil
  isTablet,             // Es tablet
  isDesktop             // Es desktop
} = useResponsive();
```

### useScreenSize (Context)
**Propósito**: Manejo de dimensiones de pantalla mediante Context

**Ubicación**: `context/screenSize/ScreenSizeContext.ts`

**Funcionalidades**:
- Dimensiones en tiempo real
- Breakpoints responsivos
- Utilities de layout
- Animaciones

**API**:
```typescript
const {
  dimensions,           // Dimensiones calculadas
  getContainerForScreen, // Contenedor apropiado
  flex,                 // Utilidades flex
  animation            // Utilidades de animación
} = useScreenSize();
```

### useNotification
**Propósito**: Sistema de notificaciones

**Funcionalidades**:
- Mostrar notificaciones
- Diferentes tipos (success, error, warning, info)
- Auto-dismiss
- Stack de notificaciones

**API**:
```typescript
const {
  showNotification,      // Mostrar notificación
  hideNotification,      // Ocultar notificación
  notifications          // Lista de notificaciones activas
} = useNotification();
```

### useLoadingContext
**Propósito**: Estado global de carga

**Funcionalidades**:
- Loading states globales
- Indicadores de progreso
- Estados de operaciones
- Sincronización entre componentes

**API**:
```typescript
const {
  isLoading,           // Estado global de carga
  setLoading,          // Establecer estado de carga
  loadingMessage       // Mensaje de carga
} = useLoadingContext();
```

## 🔍 Funcionalidad Hooks

### useSearch
**Propósito**: Sistema de búsqueda global con debounce

**Funcionalidades**:
- Búsqueda en backend con debounce (500ms)
- Resultados en tiempo real
- Estadísticas de búsqueda
- Limpieza de resultados

**API**:
```typescript
const {
  searchQuery,          // Query de búsqueda actual
  isLoading,           // Estado de carga
  results,             // Resultados de búsqueda
  error,               // Error si existe
  handleSearchChange,  // Actualizar búsqueda con debounce
  clearSearch,         // Limpiar búsqueda
  hasResults,          // Booleano si hay resultados
  isSearchActive,      // Booleano si búsqueda está activa
  searchStats          // Estadísticas (totalItems, etc.)
} = useSearch();
```

### useAllianceNavigation
**Propósito**: Navegación entre alianzas y recursos

**Funcionalidades**:
- Manejo de clicks en cards de alianza
- Muestra modal de selección de alianzas
- Navegación directa o condicional según `showModal`
- Busca enlaces por alianza en recursos

**API**:
```typescript
const {
  handleAllianceCardClick,     // Manejar click en card de alianza
  showAllianceSelectionModal   // Mostrar modal de selección
} = useAllianceNavigation();
```

### useResourceManagement
**Propósito**: Gestión avanzada de recursos

**Funcionalidades**:
- CRUD de recursos con eventos personalizados
- Manejo de modales (edit, delete)
- Consulta de recursos por nombre
- Sincronización en tiempo real vía eventos

**API**:
```typescript
const {
  editModalOpen,        // Modal de edición abierto
  deleteModalOpen,      // Modal de eliminación abierto
  selectedResource,     // Recurso seleccionado
  handleEditClick,      // Manejar click de edición
  handleDeleteClick,    // Manejar click de eliminación
  handleUpdateResource, // Actualizar recurso
  handleSoftDeleteResource, // Eliminar recurso
  closeModals          // Cerrar modales
} = useResourceManagement();
```

## 🛠️ Utilidades Hooks

### useFormValidation
**Propósito**: Validación de formularios

**Funcionalidades**:
- Validación en tiempo real
- Múltiples reglas de validación
- Mensajes de error
- Estados de validación

**API**:
```typescript
const {
  errors,               // Errores de validación
  isValid,             // Formulario válido
  validate,            // Función de validación
  clearErrors,         // Limpiar errores
  setError,            // Establecer error
  removeError          // Remover error
} = useFormValidation(rules);
```

### useErrorHandler
**Propósito**: Manejo centralizado de errores con logging y notificaciones

**Funcionalidades**:
- Clasificación de errores (validación, red, API, negocio)
- Notificaciones automáticas según tipo de error
- Retry automático con estrategia configurable
- Logging centralizado

**API**:
```typescript
const {
  errorState,           // Estado completo de errores
  hasErrors,           // Booleano si hay errores
  criticalError,       // Error crítico actual
  addError,            // Agregar error manualmente
  removeError,         // Remover error por código
  clearErrors,         // Limpiar todos los errores
  handleError,         // Manejar error genérico
  retryOperation       // Reintentar operación fallida
} = useErrorHandler(options);
```

### useEscapeKey
**Propósito**: Cerrar modales con tecla Escape

**Funcionalidades**:
- Event listener para tecla Escape
- Cierre automático de modales
- Cleanup automático al desmontar

**API**:
```typescript
// No retorna nada, es un hook de efecto
useEscapeKey(isOpen, onClose);

// Parámetros:
// - isOpen: boolean (estado del modal)
// - onClose: () => void (función de cierre)
```

## 🎯 Patrones de Implementación

### 1. Custom Hook Pattern
```typescript
export const useCustomHook = (initialValue: any) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Lógica de efecto
  }, [dependencies]);
  
  const customFunction = useCallback(() => {
    // Lógica de función
  }, [dependencies]);
  
  return {
    state,
    customFunction,
  };
};
```

### 2. Event-Driven Pattern
```typescript
useEffect(() => {
  const handleCustomEvent = (event: CustomEvent) => {
    updateState(event.detail);
  };
  
  window.addEventListener('customEvent', handleCustomEvent);
  
  return () => {
    window.removeEventListener('customEvent', handleCustomEvent);
  };
}, []);
```

## 🚀 Mejores Prácticas

### 1. Memoización
```typescript
const handleClick = useCallback(() => {
  // Lógica de click
}, [dependencies]);

const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);
```

### 2. Dependencies
```typescript
useEffect(() => {
  // Lógica que depende de 'value'
}, [value]); // ✅ Correcto

useEffect(() => {
  // Lógica que no depende de nada
}, []); // ✅ Correcto para efectos de montaje
```

### 3. TypeScript
```typescript
interface UseCustomHookProps {
  initialValue: string;
  onUpdate?: (value: string) => void;
}

interface UseCustomHookReturn {
  value: string;
  updateValue: (value: string) => void;
  isValid: boolean;
}

export const useCustomHook = (
  props: UseCustomHookProps
): UseCustomHookReturn => {
  // Implementación
};
```

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0