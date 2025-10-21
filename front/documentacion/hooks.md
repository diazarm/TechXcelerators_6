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
**Propósito**: Manejo de autenticación y autorización

**Funcionalidades**:
- Login/logout de usuarios
- Verificación de tokens JWT
- Datos del usuario actual
- Manejo de roles y permisos

**API**:
```typescript
const {
  user,                    // Usuario actual
  isAuthenticated,         // Estado de autenticación
  isLoading,              // Estado de carga
  login,                  // Función de login
  logout,                 // Función de logout
  register                // Función de registro
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
- **Role-based actions**: Iconos según permisos
- **Responsive scaling**: Escalado automático de iconos

### useResources
**Propósito**: Gestión de recursos educativos

**Funcionalidades**:
- CRUD completo de recursos
- Filtrado por sección
- Estados de loading

**API**:
```typescript
const {
  resources,              // Lista de recursos
  loading,               // Estado de carga
  error,                 // Errores
  createResource,        // Crear recurso
  updateResource,        // Actualizar recurso
  deleteResource,        // Eliminar recurso
  searchResources        // Buscar recursos
} = useResources();
```

### useDocuments
**Propósito**: Gestión de documentos

**Funcionalidades**:
- Upload de documentos
- Gestión de archivos
- Control de visibilidad
- Restauración de eliminados

**API**:
```typescript
const {
  documents,             // Lista de documentos
  loading,              // Estado de carga
  uploadDocument,       // Subir documento
  updateDocument,       // Actualizar documento
  deleteDocument,       // Eliminar documento
  restoreDocument       // Restaurar documento
} = useDocuments();
```

### useUserManagement
**Propósito**: Gestión de usuarios y roles

**Funcionalidades**:
- CRUD de usuarios
- Cambio de roles
- Gestión de permisos
- Activación/desactivación

**API**:
```typescript
const {
  users,                 // Lista de usuarios
  loading,              // Estado de carga
  createUser,           // Crear usuario
  updateUser,           // Actualizar usuario
  changeUserRole,       // Cambiar rol
  toggleUserStatus      // Activar/desactivar
} = useUserManagement();
```

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
**Propósito**: Sistema de búsqueda global

**Funcionalidades**:
- Búsqueda en tiempo real
- Debounce para optimización
- Filtros múltiples
- Resultados paginados

**API**:
```typescript
const {
  searchQuery,          // Query de búsqueda
  searchResults,        // Resultados
  isLoading,           // Estado de carga
  search,              // Función de búsqueda
  clearSearch,         // Limpiar búsqueda
  setFilters           // Establecer filtros
} = useSearch();
```

### useAllianceNavigation
**Propósito**: Navegación entre alianzas

**Funcionalidades**:
- Manejo de clicks en alianzas
- Navegación a modales
- Gestión de estado de selección
- Integración con backend

**API**:
```typescript
const {
  handleAllianceClick,  // Manejar click en alianza
  selectedAlliance,     // Alianza seleccionada
  navigateToAlliance,   // Navegar a alianza
  resetSelection        // Resetear selección
} = useAllianceNavigation();
```

### useResourceManagement
**Propósito**: Gestión avanzada de recursos

**Funcionalidades**:
- CRUD con optimistic updates
- Manejo de modales
- Validación de datos
- Sincronización en tiempo real

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
**Propósito**: Manejo centralizado de errores

**Funcionalidades**:
- Captura de errores
- Logging de errores
- Notificaciones de error
- Recovery automático

**API**:
```typescript
const {
  handleError,          // Manejar error
  clearError,          // Limpiar error
  error,               // Error actual
  isError              // Hay error
} = useErrorHandler();
```

### useEscapeKey
**Propósito**: Manejo de tecla Escape

**Funcionalidades**:
- Cerrar modales con Escape
- Limpiar selecciones
- Resetear estados
- Navegación de teclado

**API**:
```typescript
const {
  isEscapePressed,      // Escape presionado
  resetEscapeState,     // Resetear estado
  onEscape              // Callback para Escape
} = useEscapeKey(callback);
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