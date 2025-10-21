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
└── constants/     # Configuraciones
```

## 🔧 Componentes Clave

### Sistema de Tarjetas
- **useCards**: Hook para configuración de tarjetas
- **getCardConfig**: Configuración estática de tarjetas
- **createMultipleIcons**: Creación de iconos de acción

### Gestión de Recursos
- **ResourceEditModal**: Edición con footer sticky
- **ResourceDeleteModal**: Confirmación de eliminación
- **ResourceRestoreModal**: Restauración de eliminados

### Sistema de Alianzas
- **AllianceSlider**: Slider infinito de logos
- **AllianceSelectionModal**: Selección de alianzas
- **logoService**: Gestión centralizada de logos

## 🌐 Servicios API

### Principales
- **resourceService**: CRUD de recursos
- **documentService**: Gestión de documentos
- **userService**: Gestión de usuarios
- **allianceService**: Gestión de alianzas

### Patrones
- **Event-driven**: Actualizaciones en tiempo real
- **Optimistic updates**: UI inmediata
- **Error handling**: Centralizado

## 🎨 Responsive Design

- **useResponsive**: Escalado proporcional
- **useScreenSize**: Context para dimensiones (en context/screenSize)
- **Tailwind CSS**: Clases responsivas

## 🚀 Características

### Implementadas
- ✅ Gestión completa de recursos y documentos
- ✅ Sistema de usuarios con roles
- ✅ Búsqueda global
- ✅ Autenticación JWT
- ✅ Responsive design
- ✅ Notificaciones toast

### Scripts
```bash
npm run dev          # Desarrollo
npm run build        # Producción (tsc + vite build)
npm run lint         # Linting
npm run preview      # Preview del build
```

## 📚 Documentación

- **[Componentes](componentes.md)**: Componentes y props
- **[Hooks](hooks.md)**: Custom hooks
- **[Servicios](servicios.md)**: API services
- **[Desarrollo](desarrollo.md)**: Guía de desarrollo
- **[Tipos](tipos.md)**: Definiciones TypeScript

---

**Versión**: 1.0.0 | **Estado**: Producción