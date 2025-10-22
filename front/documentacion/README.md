# 📚 Documentación Frontend - Scala Learning

## 📋 Descripción General

Frontend de Scala Learning construido con React 19, TypeScript, Vite y Tailwind CSS. Sistema de gestión de recursos educativos con alianzas universitarias.

## 🏗️ Arquitectura

### Tecnologías
- **React 19** + TypeScript + Vite
- **Tailwind CSS** + **Axios** + **React Router**

### Estructura
```
src/
├── components/     # Componentes por funcionalidad
├── hooks/         # Custom hooks
├── services/      # API services
├── pages/         # Páginas principales
├── types/         # Tipos TypeScript
├── context/       # Context providers
├── constants/     # Configuraciones
└── utils/         # Utilidades
```

## 🔧 Sistema de Tarjetas (Cards)

### **Fusión Backend + Frontend:**
Las cards combinan configuración estática (iconos, layout) con datos dinámicos (título, descripción) del backend.

**Componentes:**
- **useCards**: Hook que gestiona configuración y comportamiento
- **getCardConfig**: Obtiene configuración estática de `cardConfigs.ts`
- **createMultipleIcons**: Crea iconos de acción (edit/delete)

**Flujo de Actualización:**
1. `cardConfigs.ts` define estructura base (iconos, resourceId)
2. Al montar, páginas consultan backend por `sectionId`
3. Se fusionan: iconos estáticos + título/descripción dinámicos
4. Eventos en tiempo real actualizan las cards automáticamente

### Gestión de Recursos
- **ResourceEditModal**: Modal de edición con footer sticky
- **ResourceDeleteModal**: Modal de confirmación para soft delete
- **ResourceRestoreModal**: Modal para restaurar recursos eliminados

### Sistema de Alianzas
- **AllianceSlider**: Slider infinito de logos con sistema de escalado
- **AllianceSelectionModal**: Modal para seleccionar alianzas
- **logoService**: Mapeo centralizado de logos por siglas

## 🌐 Servicios API

### Principales
- **resourceService**: CRUD de recursos
- **documentService**: Gestión de documentos
- **userService**: Gestión de usuarios
- **allianceService**: Gestión de alianzas

### Patrones Implementados
- **Event-driven**: Actualizaciones en tiempo real vía eventos personalizados
  - `resourceUpdated`: Cuando se edita un recurso
  - `resourceDeleted`: Cuando se elimina (soft delete)
  - `resourceRestored`: Cuando se restaura
  - `userRoleChanged`: Cuando cambia el rol de un usuario
- **Error handling**: Manejo centralizado con `errorService`
- **Request/Response**: Interceptors de Axios para tokens JWT

## 🎨 Responsive Design

- **useResponsive**: Hook con función `scale()` para escalado proporcional
- **useScreenSize**: Context en `context/screenSize` para dimensiones globales
- **Tailwind CSS**: Framework de utilidades con clases responsivas

### Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Características Implementadas

- ✅ Gestión completa de recursos y documentos
- ✅ Sistema de usuarios con roles (user, director, admin)
- ✅ Búsqueda global con filtros
- ✅ Autenticación JWT con refresh en tiempo real
- ✅ Responsive design con escalado automático
- ✅ Notificaciones toast
- ✅ Soft delete con restauración
- ✅ Actualizaciones en tiempo real vía eventos

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Desarrollo (puerto 5173)
npm run build        # Producción (tsc -b && vite build)
npm run lint         # Linting con ESLint
npm run preview      # Preview del build local

# Análisis de Proyecto
npm run analyze:circular  # Detectar dependencias circulares
npm run analyze:deps      # Ver todas las dependencias
npm run analyze:graph     # Generar gráfico visual (SVG)
npm run analyze:bundle    # Analizar tamaño del bundle
```

Ver [ANALISIS.md](../ANALISIS.md) para guía completa de análisis.

## 📚 Documentación Detallada

- **[Componentes](componentes.md)**: Componentes, props y patrones
- **[Hooks](hooks.md)**: Custom hooks y su funcionalidad
- **[Servicios](servicios.md)**: API services y comunicación con backend
- **[Desarrollo](desarrollo.md)**: Guía para desarrolladores
- **[Tipos](tipos.md)**: Definiciones TypeScript y barrel exports

---

**Versión**: 1.0.0 | **Estado**: Producción