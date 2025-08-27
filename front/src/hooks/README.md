# 🪝 Hooks

**Guía práctica de hooks disponibles en el proyecto.**

## 🎯 **¿Qué Son los Hooks?**

Los hooks son funciones especiales de React que te permiten usar estado y otras características de React en componentes funcionales. **Nunca** los llames dentro de loops, condiciones o funciones anidadas.

**¿Por qué se llaman "hooks"?** Es como "enganchar" funcionalidades especiales a tu componente. Imagina que tu componente es una pared y los hooks son ganchos donde puedes colgar diferentes herramientas (estado, efectos, contextos).

**En la vida real:** Es como tener un cinturón de herramientas donde cada herramienta tiene una función específica. No puedes usar un martillo para atornillar, cada hook tiene su propósito.

## 🚀 **¿Para Qué Se Usan?**

Los hooks te permiten:
- **Manejar estado** - Guardar y actualizar datos en tu componente
- **Ejecutar efectos** - Realizar acciones cuando algo cambia
- **Compartir lógica** - Reutilizar funcionalidad entre componentes
- **Conectar con contextos** - Acceder a datos globales de la app

## ⭐ **¿Por Qué Son Importantes?**

- **🚫 Sin hooks** - Tendrías que usar componentes de clase (más complejos)
- **🔄 Reutilización** - La misma lógica funciona en múltiples componentes
- **📱 Estado moderno** - Manejo de estado más simple y predecible
- **🧪 Testing fácil** - Hooks son funciones puras, fáciles de probar
- **🎯 Separación de responsabilidades** - Cada hook tiene una función específica

## 📱 **Hook useResponsive**

### **¿Para Qué Sirve?**
Te da clases de Tailwind CSS que se adaptan automáticamente a diferentes tamaños de pantalla. **Reemplaza completamente** el uso de media queries.

### **Cómo Usarlo**
```tsx
import { useResponsive } from '../../hooks';

const MiComponente = () => {
  const { container, text, spacing, grid } = useResponsive();
  
  return (
    <div className={`${container} ${spacing.py.large}`}>
      <h1 className={text.h1}>Mi Título</h1>
      <div className={`${grid.columns.two} ${grid.gap.large}`}>
        {/* Contenido */}
      </div>
    </div>
  );
};
```

### **Qué Te Da**
- **container** - Contenedores que se adaptan a la pantalla
- **text** - Tamaños de texto responsivos
- **spacing** - Espaciado que cambia según el dispositivo
- **grid** - Sistemas de grid adaptativos
- **shadow** - Sombras responsivas
- **border** - Bordes y radios adaptativos

### **Ventajas del Hook**
- ✅ **No media queries** - Todo se maneja automáticamente
- ✅ **Consistencia** - Mismos breakpoints en toda la app
- ✅ **Mantenibilidad** - Cambios centralizados
- ✅ **Performance** - No re-renders innecesarios

## 🔐 **Hook useAuth**

### **¿Para Qué Sirve?**
Te da acceso al usuario logueado y funciones de autenticación. **Siempre** verifica que estés dentro de `AuthProvider`.

### **Cómo Usarlo**
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
- **user** - Datos del usuario logueado (o `null` si no hay sesión)
- **isAuthenticated** - `true` si hay usuario logueado, `false` si no
- **login(credentials)** - Función para iniciar sesión
- **logout()** - Función para cerrar sesión
- **clearError()** - Limpiar mensajes de error

### **Casos de Uso Comunes**
- 🔒 **Protección de rutas** - Verificar autenticación
- 👤 **Mostrar datos del usuario** - Nombre, email, rol
- 🚪 **Navegación condicional** - Menús según rol
- 📝 **Formularios** - Pre-llenar datos del usuario

## 🔄 **Hook useLoadingContext**

### **¿Para Qué Sirve?**
Te permite mostrar/ocultar indicadores de carga en toda la aplicación. **Ideal** para operaciones asíncronas.

### **Cómo Usarlo**
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

### **Casos de Uso Comunes**
- 📤 **Envío de formularios** - Mostrar "Enviando..."
- 🔄 **Sincronización de datos** - Mostrar "Sincronizando..."
- 📥 **Carga de archivos** - Mostrar progreso
- 🌐 **Llamadas a API** - Indicar que se está procesando

## 🚨 **Reglas Importantes**

1. **Siempre** importar hooks desde `../../hooks`
2. **Nunca** importar directamente desde archivos individuales
3. **Siempre** usar `useResponsive` en lugar de media queries
4. **Verificar** que estés dentro del provider correcto (AuthProvider, LoadingProvider)
5. **Siempre** importar tipos compartidos desde `../../types` (centralizado)
6. **Nunca** llamar hooks en loops o condiciones

## 🔗 **Referencias**

- **README principal**: Ver `../README.md`
- **Sistema de tipos**: Ver `../types/README.md`
- **Componentes**: Ver `../components/README.md`
