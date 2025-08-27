# 🎭 Contextos

**Guía práctica de contextos disponibles y cómo usarlos.**

## 🎯 **¿Qué Son los Contextos?**

Los contextos de React te permiten compartir datos entre componentes sin pasar props manualmente. Son útiles para datos globales como autenticación, temas, o estado de carga. **Evitan** el "prop drilling" (pasar props a través de múltiples niveles).

**¿Por qué se llaman "contextos"?** Es como tener un "ambiente compartido" donde todos los componentes pueden acceder a la misma información. Imagina que es como el clima: todos en la ciudad saben si está lloviendo sin tener que preguntarse entre ellos.

**En la vida real:** Es como tener un sistema de megafonía en un edificio. En lugar de que cada persona tenga que ir a cada departamento a dar la misma información, el megafonía la transmite a todos al mismo tiempo. Los contextos son como ese sistema de megafonía para tu app.

## 🔐 **Contexto de Autenticación**

### **¿Para Qué Sirve?**
Maneja el estado global de autenticación del usuario (login, logout, verificar sesión). **Centraliza** toda la lógica de autenticación en un solo lugar.

### **Cómo Configurarlo**
```tsx
// En App.tsx o layout principal
import { AuthProvider } from '../../context';

const App = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
        {/* Resto de la aplicación */}
      </LoadingProvider>
    </AuthProvider>
  );
};
```

### **Cómo Usarlo en Componentes**
```tsx
import { useAuth } from '../../hooks';

const MiComponente = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Por favor, inicia sesión</p>;
  }
  
  return (
    <div>
      <p>Hola, {user?.name}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};
```

### **Qué Te Da**
- **user** - Datos del usuario logueado o `null`
- **isAuthenticated** - `true` si hay sesión activa
- **login(credentials)** - Función para iniciar sesión
- **logout()** - Función para cerrar sesión
- **checkAuth()** - Verificar si hay sesión válida
- **clearError()** - Limpiar mensajes de error

### **Características del Contexto**
- 🔒 **Persistencia automática** - Guarda sesión en localStorage
- 🚫 **Manejo de errores** - Captura y muestra errores de login
- 🔄 **Verificación automática** - Revisa sesión al cargar la app
- 👥 **Gestión de roles** - Diferencia entre admin y user

## 🔄 **Contexto de Loading**

### **¿Para Qué Sirve?**
Maneja estados de carga global en toda la aplicación. **Permite** mostrar/ocultar loadings desde cualquier componente sin pasar props.

### **Cómo Configurarlo**
```tsx
// En App.tsx
import { LoadingProvider } from '../../context';

const App = () => {
  return (
    <LoadingProvider>
      {/* Resto de la aplicación */}
    </LoadingProvider>
  );
};
```

### **Cómo Usarlo en Componentes**
```tsx
import { useLoadingContext } from '../../hooks';

const MiComponente = () => {
  const { showLoading, hideLoading, isLoading } = useLoadingContext();
  
  const handleSubmit = async () => {
    showLoading('Procesando...');
    
    try {
      // Hacer algo que tome tiempo
      await algunaOperacion();
    } finally {
      hideLoading();
    }
  };
  
  return (
    <div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Procesando...' : 'Enviar'}
      </button>
    </div>
  );
};
```

### **Qué Te Da**
- **showLoading(message)** - Mostrar loading con mensaje
- **hideLoading()** - Ocultar loading
- **isLoading** - `true` si hay loading activo
- **loadingItems** - Lista de items de loading activos

### **Ventajas del Contexto**
- 🌐 **Estado global** - Accesible desde cualquier lugar
- 🎯 **Mensajes personalizados** - "Guardando...", "Cargando..."
- 🔄 **Múltiples loadings** - Diferentes operaciones simultáneas
- ⚡ **Performance** - No re-renders innecesarios

## 🏷️ **Tipos Co-locados**

### **¿Por Qué Solo Loading Tiene Types?**

**LoadingProvider** necesita props (`children`), por eso tiene su propio `types.ts`.

**AuthProvider** no necesita props especiales, por eso no tiene `types.ts`.

### **Estructura de Tipos**
```tsx
// src/context/loading/types.ts
export interface LoadingProviderProps {
  children: ReactNode;
}

// src/context/loading/LoadingProvider.tsx
import type { LoadingProviderProps } from './types';
```

## 🚨 **Reglas Importantes**

1. **Siempre** usar contextos desde `../../context`
2. **Siempre** usar hooks (`useAuth`, `useLoadingContext`) en lugar de contextos directamente
3. **Siempre** configurar providers en el nivel más alto de la app
4. **Verificar** que estés dentro del provider correcto antes de usar hooks
5. **Siempre** importar tipos compartidos desde `../../types` (centralizado)
6. **Siempre** importar tipos co-locados desde `./types` (del mismo módulo)

## 🔗 **Referencias**

- **README principal**: Ver `../README.md`
- **Hooks**: Ver `../hooks/README.md`
- **Componentes**: Ver `../components/README.md`
