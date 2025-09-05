# 📡 Servicios

**Guía práctica de servicios disponibles y cómo usarlos.**

## 🎯 **¿Qué Son los Servicios?**

Los servicios son funciones que manejan la comunicación con APIs externas o lógica de negocio. En este proyecto, se encargan de operaciones como autenticación, llamadas HTTP, etc. **Separan** la lógica de negocio de los componentes.

**¿Por qué se llaman "servicios"?** Es como tener "empleados especializados" que se encargan de tareas específicas. Imagina que tu app es un restaurante: los servicios son como los cocineros, meseros y cajeros que cada uno tiene su función.

**En la vida real:** Es como tener un equipo de trabajo donde cada persona se especializa en algo. El cocinero no sirve las mesas, el mesero no cocina. Cada servicio tiene su responsabilidad específica y trabaja de manera independiente.

## 🚀 **¿Para Qué Se Usan?**

Los servicios te permiten:
- **Comunicarte con APIs** - Hacer peticiones HTTP al backend
- **Manejar lógica de negocio** - Validaciones, cálculos, transformaciones
- **Centralizar operaciones** - Toda la lógica relacionada en un lugar
- **Reutilizar funcionalidad** - Misma lógica en múltiples componentes
- **Separar responsabilidades** - Componentes solo se encargan de la UI

## ⭐ **¿Por Qué Son Importantes?**

- **🚫 Sin servicios** - La lógica estaría mezclada en los componentes (difícil de mantener)
- **🔄 Reutilización** - Misma función de login en login, registro, etc.
- **🧪 Testing fácil** - Puedes probar la lógica sin renderizar componentes
- **📱 Mantenimiento** - Cambios en un solo lugar afectan toda la app
- **🔒 Seguridad** - Validaciones y autenticación centralizadas
- **📊 Performance** - Lógica optimizada y cacheable

## 🌐 **Configuración de API**

### **¿Para Qué Sirve?**
Configura Axios (cliente HTTP) con interceptores para JWT y manejo de errores. **Centraliza** toda la configuración HTTP en un solo lugar.

### **Cómo Usarlo**
```tsx
import { api } from '../../services';

const MiComponente = () => {
  const fetchData = async () => {
    try {
      const response = await api.get('/users');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return <button onClick={fetchData}>Obtener datos</button>;
};
```

### **Qué Te Da**
- **api.get(url)** - Hacer petición GET
- **api.post(url, data)** - Hacer petición POST
- **api.put(url, data)** - Hacer petición PUT
- **api.delete(url)** - Hacer petición DELETE

**Características automáticas:**
- Headers JWT se inyectan automáticamente
- Timeout de 10 segundos
- Manejo de errores centralizado

### **Ventajas de la Configuración**
- 🔐 **JWT automático** - No necesitas agregar headers manualmente
- ⏱️ **Timeout consistente** - Mismo timeout en toda la app
- 🚫 **Manejo de errores** - Errores capturados automáticamente
- 🔄 **Interceptores** - Lógica centralizada para todas las peticiones

## 🔐 **Servicio de Autenticación**

### **¿Para Qué Sirve?**
Maneja todas las operaciones de autenticación (login, logout, validar tokens). **Simula** un backend real para desarrollo.

### **Cómo Usarlo**
```tsx
import { login, validateToken } from '../../services';

const MiComponente = () => {
  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login({ email, password });
      console.log('Usuario logueado:', result.user);
      console.log('Token:', result.token);
    } catch (error) {
      console.error('Error de login:', error.message);
    }
  };
  
  const checkToken = async (token: string) => {
    try {
      const user = await validateToken(token);
      console.log('Token válido, usuario:', user);
    } catch (error) {
      console.error('Token inválido:', error.message);
    }
  };
  
  return (
    <div>
      <button onClick={() => handleLogin('user@example.com', 'password123')}>
        Login
      </button>
    </div>
  );
};
```

### **Funciones Disponibles**
- **login(credentials)** - Iniciar sesión
- **validateToken(token)** - Verificar si un token es válido
- **logout()** - Cerrar sesión
- **getCurrentUser()** - Obtener usuario actual

### **Usuarios de Prueba**
- **Admin**: `admin@example.com` / `password123`
- **User**: `user@example.com` / `password123`

### **Características del Servicio**
- 🧪 **Datos mock** - Para desarrollo sin backend
- 🔄 **Simulación de red** - Delays realistas
- 🚫 **Validación** - Verifica credenciales
- 🔐 **Tokens JWT** - Sistema de autenticación completo

## 🏗️ **Cómo Crear un Nuevo Servicio**

### **Paso 1: Crear archivo del servicio**
```tsx
// src/services/userService.ts
import { api } from './api';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await api.post('/users', userData);
  return response.data;
};
```

### **Paso 2: Exportar centralmente**
```tsx
// src/services/index.ts
export { getUsers, createUser } from './userService';
```

### **Paso 3: Usar en componentes**
```tsx
import { getUsers, createUser } from '../../services';

const MiComponente = () => {
  const fetchUsers = async () => {
    const users = await getUsers();
    console.log(users);
  };
  
  return <button onClick={fetchUsers}>Obtener usuarios</button>;
};
```

### **Patrones Recomendados**
- 📡 **Siempre usar `api`** - No fetch nativo
- 🚫 **Manejar errores** - Try/catch en todas las operaciones
- 🔄 **Async/await** - Promesas de manera limpia
- 📝 **Documentar funciones** - JSDoc para APIs públicas

## 🚨 **Reglas Importantes**

1. **Siempre** usar servicios desde `../../services`
2. **Siempre** usar `api` para llamadas HTTP
3. **Siempre** manejar errores con try/catch
4. **Siempre** exportar servicios desde `src/services/index.ts`
5. **Siempre** importar tipos compartidos desde `../../types` (centralizado)

## 🔗 **Referencias**

- **README principal**: Ver `../README.md`
- **Sistema de tipos**: Ver `../types/README.md`
- **Hooks**: Ver `../hooks/README.md`
