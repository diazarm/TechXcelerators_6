# 🔐 Servicio de Autenticación

Servicio que maneja todas las operaciones de autenticación con el backend.

## 🚀 **Funciones Disponibles**

### **`login(email, password)`**
- **Parámetros**: `email` (string), `password` (string)
- **Retorna**: `Promise<User | null>`
- **Función**: Autentica usuario y retorna datos del usuario

### **`validateToken(token)`**
- **Parámetros**: `token` (string)
- **Retorna**: `Promise<User | null>`
- **Función**: Valida token JWT y retorna usuario

### **`logout()`**
- **Parámetros**: Ninguno
- **Retorna**: `Promise<void>`
- **Función**: Cierra sesión en el backend

### **`getCurrentUser()`**
- **Parámetros**: Ninguno
- **Retorna**: `Promise<User | null>`
- **Función**: Obtiene usuario actual desde el backend

## 👥 **Usuarios de Prueba**

### **Admin**
- **Email**: `admin@example.com`
- **Password**: `password123`
- **Rol**: `admin`

### **User**
- **Email**: `user@example.com`
- **Password**: `password123`
- **Rol**: `user`

## 🔧 **Simulación del Backend**

- **Delay**: 1 segundo para simular latencia de red
- **Validación**: Credenciales hardcodeadas para desarrollo
- **Tokens**: JWT simulados con expiración de 24 horas
- **Persistencia**: localStorage para simular base de datos

## 📝 **Uso en Componentes**

```tsx
import { login } from '../../services';

const handleLogin = async (email: string, password: string) => {
  try {
    const user = await login(email, password);
    if (user) {
      // Usuario autenticado exitosamente
      console.log('Usuario logueado:', user);
    }
  } catch (error) {
    console.error('Error de login:', error);
  }
};
```

## ⚠️ **Notas de Desarrollo**

- **Backend real**: Reemplazar funciones simuladas con llamadas reales
- **Mantener interfaz**: No cambiar nombres de funciones o parámetros
- **Error handling**: Implementar manejo de errores del backend real
- **Validación**: Agregar validaciones del lado del servidor

## 🔄 **Integración con Axios**

- **Instancia configurada**: `src/services/api.ts`
- **Interceptores JWT**: Inyección automática de headers
- **Base URL**: Configurable desde variables de entorno
- **Timeout**: 10 segundos por defecto
