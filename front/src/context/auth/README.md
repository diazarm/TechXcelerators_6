# 🔐 Contexto de Autenticación

Sistema completo de autenticación para la aplicación.

## 🏗️ **Componentes**

### **AuthContext** (`auth-context.ts`)
- Contexto de React con estado tipado
- Valor inicial `undefined` para detectar uso incorrecto

### **AuthProvider** (`AuthProvider.tsx`)
- Proveedor que implementa toda la lógica de autenticación
- Maneja login, logout, verificación automática y persistencia

## 🔄 **Flujo de Autenticación**

1. **Inicio**: Verifica sesión guardada automáticamente
2. **Login**: Valida credenciales y llama al servicio
3. **Verificación**: Valida token con el backend
4. **Logout**: Limpia estado y localStorage

## 📊 **Estados del Contexto**

- **Inicial**: `user: null, isLoading: false, error: null`
- **Autenticado**: `user: {...}, isLoading: false, error: null`
- **Carga**: `user: null, isLoading: true, error: null`
- **Error**: `user: null, isLoading: false, error: "mensaje"`

## 💾 **Persistencia**

- **localStorage**: Token JWT y datos del usuario
- **Restauración**: Automática al cargar la aplicación
- **Limpieza**: Automática si el token es inválido

## 🔒 **Seguridad**

- **Validaciones**: Email básico, contraseña no vacía
- **Roles**: Admin (acceso completo) y User (acceso limitado)
- **Token**: Formato JWT válido

## 📝 **Uso en Componentes**

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

## ⚠️ **Importante**

- **Siempre** importar desde `../../hooks` para hooks
- **Siempre** importar desde `../../context` para contextos
- **Verificar** `isLoading` antes de mostrar contenido
- **Manejar** errores apropiadamente en los componentes

## 🔄 **Patrón de Imports**

```tsx
// ✅ CORRECTO
import { useAuth } from '../../hooks';
import { AuthContext } from '../../context';

// ❌ INCORRECTO
import { useAuth } from '../../hooks/useAuth';
import { AuthContext } from '../../context/auth/auth-context';
```
