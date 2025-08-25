# 🔐 Hook useAuth

Hook para usar el contexto de autenticación en componentes.

## 📝 **Uso Básico**

```tsx
import { useAuth } from '../hooks';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm onSubmit={login} />;
  }
  
  return <UserDashboard user={user} onLogout={logout} />;
};
```

## 🚨 **IMPORTANTE - Patrón de Imports**

### **✅ CORRECTO - Usar archivo centralizado**
```tsx
import { useAuth } from '../hooks';
```

### **❌ INCORRECTO - NO importar desde subcarpeta**
```tsx
import { useAuth } from '../hooks/useAuth';
```

## 🔄 **Funcionalidades Disponibles**

- **`user`**: Usuario logueado o `null`
- **`isAuthenticated`**: Boolean que indica si está autenticado
- **`isLoading`**: Estado de carga
- **`error`**: Mensaje de error si existe
- **`login(credentials)`**: Función para iniciar sesión
- **`logout()`**: Función para cerrar sesión
- **`clearError()`**: Función para limpiar errores

## ⚠️ **Requisitos**

- **Siempre** usar dentro de `AuthProvider`
- **Verificar** `isLoading` antes de mostrar contenido
- **Manejar** errores apropiadamente
