# 🚀 TechXcelerators Frontend

Proyecto base para el equipo Frontend con React, TypeScript, Vite y Tailwind CSS.

## 🏗️ **Estructura del Proyecto**

```
src/
├── components/          # Componentes reutilizables
├── context/            # Contextos de React (Auth, Loading)
├── hooks/              # Hooks personalizados
├── pages/              # Páginas de la aplicación
├── services/           # Servicios y APIs
└── types/              # Tipos de TypeScript
```

## 🎯 **Características Principales**

### **Responsividad Inteligente**
- **Hook `useResponsive`**: Clases de Tailwind organizadas por categorías
- **Hook `useBreakpoints`**: Detección automática de breakpoints
- **Sin media queries**: Todo se maneja a través de hooks

### **Manejo de Errores Global**
- **ErrorBoundary**: Captura errores en toda la aplicación
- **UI de fallback**: Interfaz amigable cuando algo falla

### **Sistema de Loading Global**
- **LoadingProvider**: Estado de carga compartido
- **LoadingSpinner**: Componente reutilizable
- **Mensajes personalizados**: Loading con texto específico

### **Autenticación Completa**
- **AuthProvider**: Manejo de usuarios y sesiones
- **Roles y permisos**: Admin y User
- **Persistencia**: localStorage automático
- **JWT**: Integración con backend

## 🚀 **Inicio Rápido**

### **Instalación**
```bash
npm install
```

### **Desarrollo**
```bash
npm run dev
```

### **Compilación**
```bash
npm run build
```

## 🔧 **Comandos de Utilidad**

### **🔄 Control de Versiones (Git)**

#### **Flujo Básico de Trabajo**
```bash
# 1. Obtener cambios más recientes
git pull origin main

# 2. Crear y cambiar a nueva rama para tu issue
git checkout -b feature/nombre-de-la-funcionalidad

# 3. Hacer cambios y commits
git add .
git commit -m "feat: implementa funcionalidad X"

# 4. Subir rama al repositorio
git push origin feature/nombre-de-la-funcionalidad

# 5. Crear Pull Request en GitHub
# Ir a GitHub > Pull Requests > New Pull Request
```

#### **Comandos Git Útiles**
```bash
# Ver estado del repositorio
git status

# Ver historial de commits
git log --oneline

# Ver diferencias
git diff

# Descartar cambios en archivo
git checkout -- nombre-archivo

# Cambiar entre ramas
git checkout nombre-rama

# Ver todas las ramas
git branch -a
```

### **🧪 Verificación del Proyecto**

#### **TypeScript - Verificar Tipos**
```bash
# Verificar tipos sin generar archivos
npx tsc --noEmit --project tsconfig.app.json

# Verificar tipos específicos
npx tsc --noEmit src/components/ComponentName.tsx
```

#### **ESLint - Verificar Calidad de Código**
```bash
# Verificar todo el proyecto
npm run lint

# Verificar archivo específico
npx eslint src/components/ComponentName.tsx

# Corregir errores automáticamente
npx eslint --fix src/
```

#### **Prettier - Formatear Código**
```bash
# Formatear todo el proyecto
npm run format

# Formatear archivo específico
npx prettier --write src/components/ComponentName.tsx

# Verificar formato sin cambiar
npx prettier --check src/
```

### **📦 Gestión de Dependencias**

#### **Instalar Nuevas Dependencias**
```bash
# Dependencia de producción
npm install nombre-paquete

# Dependencia de desarrollo
npm install --save-dev nombre-paquete

# Dependencia global
npm install -g nombre-paquete
```

#### **Actualizar Dependencias**
```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Actualizar dependencias específicas
npm install nombre-paquete@latest
```

### **🚀 Scripts del Proyecto**

#### **Desarrollo y Build**
```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Limpiar build
npm run clean
```

### **🔍 Debugging y Troubleshooting**

#### **Verificar Configuración**
```bash
# Ver configuración de TypeScript
npx tsc --showConfig

# Ver configuración de Vite
npx vite --config vite.config.ts

# Ver configuración de Tailwind
npx tailwindcss --config tailwind.config.js
```

#### **Limpiar Caché**
```bash
# Limpiar caché de npm
npm cache clean --force

# Limpiar node_modules y reinstalar (Windows PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Limpiar caché de Vite (Windows PowerShell)
Remove-Item -Recurse -Force node_modules\.vite
```

## 📚 **Uso de Hooks**

### **Responsividad**
```tsx
import { useResponsive, useBreakpoints } from '../../hooks';

const MyComponent = () => {
  const { container, text, spacing } = useResponsive();
  const { isMobile, isDesktop } = useBreakpoints();
  
  return (
    <div className={`${container} ${spacing.py.large}`}>
      <h1 className={isMobile ? text.h2 : text.h1}>Título</h1>
    </div>
  );
};
```

### **Loading Global**
```tsx
import { useLoadingContext } from '../../hooks';

const MyComponent = () => {
  const { showLoading, hideLoading } = useLoadingContext();
  
  const handleSubmit = async () => {
    showLoading('Procesando...');
    // ... lógica
    hideLoading();
  };
};
```

### **Autenticación**
```tsx
import { useAuth } from '../../hooks';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm onSubmit={login} />;
  }
  
  return <UserDashboard user={user} onLogout={logout} />;
};
```

## 🔧 **Patrones de Import**

### **✅ CORRECTO - Usar archivos centralizados**
```tsx
// Hooks
import { useResponsive, useAuth } from '../../hooks';

// Contextos
import { AuthProvider, LoadingProvider } from '../../context';

// Servicios
import { login, api } from '../../services';

// Tipos
import type { User, AuthContextType } from '../../types';
```

### **❌ INCORRECTO - Importar desde subcarpetas**
```tsx
// NO hacer esto
import { useResponsive } from '../hooks/useResponsive';
import { AuthProvider } from '../context/auth/AuthProvider';
```

## 📖 **Documentación Detallada**

- **Hook useResponsive**: Ver `src/pages/WelcomePage` para ejemplos completos
- **Sistema de Auth**: Ver `src/context/auth/README.md`
- **Servicios**: Ver `src/services/authService/README.md`

## 🎨 **Tecnologías**

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP

## 🚨 **Reglas del Proyecto**

1. **Siempre** usar hooks centralizados (`../hooks`)
2. **Siempre** usar contextos centralizados (`../context`)
3. **Siempre** usar servicios centralizados (`../services`)
4. **Siempre** usar tipos centralizados (`../types`)
5. **Nunca** usar media queries - solo `useResponsive`
6. **Siempre** considerar ErrorBoundary en componentes críticos
7. **Siempre** usar TypeScript con tipos estrictos
8. **Siempre** seguir el patrón de componentes funcionales

---

**¡Listo para desarrollar! 🎉**
