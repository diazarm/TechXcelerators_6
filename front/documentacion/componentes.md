# 🧩 Componentes - Scala Learning Frontend

## 📋 Descripción General

Componentes organizados en módulos funcionales con responsabilidades específicas. Todos siguen principios de diseño responsivo, accesibilidad y reutilización.

## 🏗️ Estructura de Componentes

```
src/components/
├── Alliance/          # Gestión de alianzas universitarias
├── Auth/              # Autenticación y autorización
├── Document/          # Gestión de documentos
├── Form/              # Componentes de formularios
├── Layout/            # Estructura de la aplicación
├── Notification/      # Sistema de notificaciones
├── Resource/          # Gestión de recursos
├── Search/            # Sistema de búsqueda
├── Shared/            # Componentes compartidos
├── UI/                # Componentes base reutilizables
└── User/              # Gestión de usuarios
```

## 🏛️ Alliance Components

### AllianceSlider
**Propósito**: Slider infinito con logos de universidades aliadas

**Características**:
- Animación continua de logos
- Sistema de escalado para logos específicos (ej: Uninorte más grande)
- Enlaces a sitios web de universidades
- Responsive design

**Props**:
```typescript
interface AllianceSliderProps {
  className?: string;
}
```

### AllianceSelectionModal
**Propósito**: Modal para seleccionar alianzas específicas

**Características**:
- Grid de alianzas con logos
- Búsqueda y filtrado
- Selección múltiple
- Logos escalados (Uninorte más grande)

**Props**:
```typescript
interface AllianceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  alliances: Alliance[];
  onSelect: (alliance: Alliance) => void;
  sectionTitle: string;
}
```

## 🔐 Auth Components

### AuthGuard
**Propósito**: Protección de rutas basada en autenticación

**Características**:
- Verificación de token JWT
- Redirección automática
- Loading states

### LoginForm
**Propósito**: Formulario de inicio de sesión

**Características**:
- Validación en tiempo real
- Manejo de errores
- Estados de loading
- Responsive design

### RegisterForm
**Propósito**: Formulario de registro de usuarios

**Características**:
- Validación completa
- Confirmación de contraseña
- Manejo de errores
- Integración con backend

## 📄 Document Components

### DocumentEditModal
**Propósito**: Modal para editar documentos existentes

**Características**:
- Formulario de edición
- Upload de nuevos archivos
- Validación de tipos de archivo
- Estados de loading

### DocumentUploadModal
**Propósito**: Modal para subir nuevos documentos

**Características**:
- Drag & drop de archivos
- Validación de tipos
- Preview de archivos
- Progress indicators

### DocumentTable
**Propósito**: Tabla de documentos con funcionalidades CRUD

**Características**:
- Paginación
- Filtros y búsqueda
- Acciones por fila
- Responsive design

**Subcomponentes**:
- `DocumentTableHeader`: Encabezado con filtros
- `DocumentTableRow`: Fila individual de documento
- `DocumentTableEmpty`: Estado vacío

### DocumentManagement
**Propósito**: Componente principal de gestión de documentos

**Características**:
- CRUD completo
- Filtros avanzados
- Búsqueda global
- Gestión de permisos

## 📝 Form Components

### Button
**Propósito**: Componente de botón reutilizable

**Variantes**:
- `primary`: Botón principal (azul)
- `secondary`: Botón secundario (gris)
- `danger`: Botón de peligro (rojo)
- `success`: Botón de éxito (verde)

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### FilterDropdown
**Propósito**: Dropdown para filtros

**Características**:
- Opciones dinámicas
- Búsqueda interna
- Selección múltiple
- Estados vacíos

### ValidationErrors
**Propósito**: Mostrar errores de validación

**Características**:
- Lista de errores
- Estilos de error
- Animaciones
- Accesibilidad

## 🏗️ Layout Components

### MainLayout
**Propósito**: Layout principal de la aplicación

**Características**:
- Header fijo
- Navegación lateral
- Footer
- Responsive design

### Header
**Propósito**: Encabezado de la aplicación

**Características**:
- Logo de la aplicación
- Navegación principal
- Menú de usuario
- Notificaciones

### Navbar
**Propósito**: Barra de navegación

**Características**:
- Navegación por secciones
- Indicador de página actual
- Responsive menu
- Accesibilidad

### Footer
**Propósito**: Pie de página

**Características**:
- Información de contacto
- Enlaces útiles
- Copyright
- Responsive design

## 🔔 Notification Components

### NotificationContainer
**Propósito**: Contenedor de notificaciones

**Características**:
- Posicionamiento fijo
- Stack de notificaciones
- Auto-dismiss
- Animaciones

### Notification
**Propósito**: Componente individual de notificación

**Tipos**:
- `success`: Notificación de éxito
- `error`: Notificación de error
- `warning`: Notificación de advertencia
- `info`: Notificación informativa

## 📚 Resource Components

### ResourceEditModal
**Propósito**: Modal para editar recursos

**Características**:
- Formulario completo
- Gestión de enlaces
- Validación en tiempo real
- Footer sticky

### ResourceDeleteModal
**Propósito**: Modal de confirmación para eliminar recursos

**Características**:
- Confirmación de acción
- Información del recurso
- Botones de acción
- Prevención de eliminación accidental

### ResourceRestoreModal
**Propósito**: Modal para restaurar recursos eliminados

**Características**:
- Lista de recursos eliminados
- Filtros por sección
- Acciones de restauración
- Confirmaciones

## 🔍 Search Components

### SearchBar
**Propósito**: Barra de búsqueda global

**Características**:
- Búsqueda en tiempo real
- Debounce
- Autocompletado
- Historial de búsquedas

### SearchModal
**Propósito**: Modal de búsqueda avanzada

**Características**:
- Filtros múltiples
- Resultados paginados
- Vista previa
- Acciones rápidas

### SectionFilter
**Propósito**: Filtro por secciones

**Características**:
- Lista de secciones
- Contadores
- Selección múltiple
- Estados activos

## 🎨 UI Components

### Card
**Propósito**: Componente base para tarjetas

**Características**:
- Variantes de tamaño
- Estados hover
- Acciones integradas
- Responsive design

### CardGrid
**Propósito**: Grid responsivo de tarjetas

**Características**:
- Layouts adaptativos
- Paginación
- Lazy loading
- Animaciones

### LoadingSpinner
**Propósito**: Spinner de carga

**Tipos**:
- `default`: Spinner circular
- `dots`: Puntos animados
- `pulse`: Pulso
- `bars`: Barras animadas
- `ring`: Anillo rotatorio

### OptimizedImage
**Propósito**: Imagen optimizada

**Características**:
- Lazy loading
- Fallback images
- Responsive sizing
- WebP support

### ResponsiveImage
**Propósito**: Imagen completamente responsiva

**Características**:
- Múltiples breakpoints
- Auto-scaling
- Aspect ratio preservation
- Performance optimization

## 👥 User Components

### UserManagement
**Propósito**: Gestión completa de usuarios

**Características**:
- Tabla de usuarios
- Filtros y búsqueda
- Acciones CRUD
- Gestión de roles

### UserTable
**Propósito**: Tabla de usuarios

**Subcomponentes**:
- `UserTableHeader`: Encabezado con filtros
- `UserTableRow`: Fila individual
- `UserTableEmpty`: Estado vacío

### RoleChangeModal
**Propósito**: Modal para cambiar roles de usuario

**Características**:
- Selección de rol
- Confirmación
- Validaciones
- Logout forzado

### UserStatusModal
**Propósito**: Modal para cambiar estado de usuario

**Características**:
- Activar/desactivar usuarios
- Confirmaciones
- Estados visuales
- Notificaciones

## 🔧 Shared Components

### ErrorBoundary
**Propósito**: Manejo de errores de React

**Características**:
- Captura de errores
- Fallback UI
- Logging de errores
- Recovery options

## 📝 Patrones de Diseño

### Props Interface
Todos los componentes siguen un patrón consistente de props:

```typescript
interface ComponentProps {
  // Props requeridas
  requiredProp: string;
  
  // Props opcionales
  optionalProp?: string;
  className?: string;
  
  // Event handlers
  onClick?: () => void;
  onSubmit?: (data: any) => void;
  
  // Estados
  loading?: boolean;
  disabled?: boolean;
}
```

### Styling Pattern
```typescript
// Uso consistente de Tailwind CSS
const baseClasses = "base-styles";
const variantClasses = {
  primary: "primary-styles",
  secondary: "secondary-styles"
};
const className = `${baseClasses} ${variantClasses[variant]}`;
```

### Responsive Pattern
```typescript
// Uso del hook useResponsive
const { scale, dimensions } = useResponsive();
const scaledSize = scale(80); // Escala proporcionalmente
```

## 🎯 Mejores Prácticas

### 1. Composición sobre Herencia
- Componentes pequeños y enfocados
- Composición de funcionalidades
- Reutilización de lógica

### 2. Props Drilling Prevention
- Uso de Context API
- Custom hooks para estado compartido
- Props interfaces bien definidas

### 3. Performance
- Memoización con React.memo
- useCallback para funciones
- useMemo para cálculos costosos

### 4. Accesibilidad
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support

### 5. Testing
- Componentes testables
- Props bien tipadas
- Separación de lógica

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0