# 🔧 Constantes

**Guía práctica de constantes disponibles y cómo organizarlas.**

## 🎯 **¿Qué Son las Constantes?**

Las constantes son valores que no cambian durante la ejecución de la aplicación. Se usan para configuraciones, valores fijos, y evitar "números mágicos" en el código. **Mejoran** la mantenibilidad y hacen el código más legible.

**¿Por qué se llaman "constantes"?** Es como tener "reglas fijas" que nunca cambian. Imagina que son como las reglas de un juego: una vez que las estableces, se mantienen igual durante toda la partida.

**En la vida real:** Es como tener un manual de instrucciones donde están todas las configuraciones importantes. Si quieres cambiar algo, solo modificas el manual y se actualiza en todos lados. Es como tener un "libro de reglas" centralizado.

## 🚀 **¿Para Qué Se Usan?**

Las constantes te permiten:
- **Centralizar configuraciones** - Todos los valores importantes en un lugar
- **Evitar números mágicos** - No más `if (password.length < 8)` sin explicación
- **Facilitar cambios** - Modificar un valor afecta toda la app
- **Mejorar legibilidad** - `MAX_RETRY_ATTEMPTS` es más claro que `3`
- **Prevenir errores** - No más typos en URLs o valores críticos
- **Organizar por dominio** - Agrupar constantes relacionadas

## ⭐ **¿Por Qué Son Importantes?**

- **🚫 Sin constantes** - Valores hardcodeados en múltiples lugares (difícil de mantener)
- **🔄 Consistencia** - Mismo timeout, mismo límite en toda la app
- **📱 Mantenimiento** - Cambios en un solo lugar
- **🧪 Testing** - Valores predecibles para pruebas
- **👥 Trabajo en equipo** - Todos usan los mismos valores
- **🎯 Configuración** - Fácil cambiar entre desarrollo y producción
- **📊 Performance** - Valores optimizados centralizados

## 📁 **Estructura Real del Proyecto**

```
src/constants/
├── index.ts            # Exportación centralizada
├── appConstants.ts     # Constantes útiles actualmente
└── README.md           # Esta documentación
```

## 🔧 **Cómo Importar Constantes**

### **✅ CORRECTO - Desde archivo centralizado**
```tsx
import { APP_NAME, MOCK_DELAY, VALIDATION_RULES } from '../../constants';
```

### **❌ INCORRECTO - Importar directamente**
```tsx
// NO hacer esto
import { APP_NAME } from '../../constants/appConstants';
```

## 📡 **Constantes Disponibles Actualmente**

### **Información Básica**
```tsx
import { APP_NAME, APP_VERSION } from '../../constants';

const MiComponente = () => {
  return (
    <div>
      <h1>{APP_NAME}</h1>
      <p>Versión: {APP_VERSION}</p>
    </div>
  );
};
```

### **Simulación y Testing**
```tsx
import { MOCK_DELAY, DEFAULT_TIMEOUT } from '../../constants';

const MiServicio = () => {
  const simularLlamadaAPI = async () => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    // Usar timeout por defecto
    const controller = new AbortController();
    setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
  };
};
```

### **Validación (Para el Futuro)**
```tsx
import { VALIDATION_RULES } from '../../constants';

const MiFormulario = () => {
  const validarPassword = (password: string) => {
    if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
      return 'Contraseña muy corta';
    }
    
    if (password.length > VALIDATION_RULES.MAX_PASSWORD_LENGTH) {
      return 'Contraseña muy larga';
    }
    
    return null;
  };
};
```

### **UI/UX (Para el Futuro)**
```tsx
import { UI_CONSTANTS } from '../../constants';

const MiComponente = () => {
  const handleAnimation = () => {
    // Duración de animación consistente
    element.style.transition = `all ${UI_CONSTANTS.ANIMATION_DURATION}ms`;
  };
  
  const handleFileUpload = (file: File) => {
    if (file.size > UI_CONSTANTS.MAX_FILE_SIZE) {
      alert('Archivo muy grande');
    }
  };
};
```

## 🏗️ **Cómo Crear Nuevas Constantes**

### **Paso 1: Agregar al archivo existente**
```tsx
// src/constants/appConstants.ts
export const NEW_CONSTANTS = {
  MAX_ITEMS_PER_PAGE: 20,
  REFRESH_INTERVAL: 30000,
  SUPPORTED_LANGUAGES: ['es', 'en'] as const
} as const;
```

### **Paso 2: Usar en componentes**
```tsx
import { NEW_CONSTANTS } from '../../constants';

const MiComponente = () => {
  return (
    <div>
      <p>Items por página: {NEW_CONSTANTS.MAX_ITEMS_PER_PAGE}</p>
      <p>Idiomas soportados: {NEW_CONSTANTS.SUPPORTED_LANGUAGES.join(', ')}</p>
    </div>
  );
};
```

## 🎨 **Patrones de Nomenclatura**

### **1. Constantes en MAYÚSCULAS**
```tsx
export const MAX_RETRY_ATTEMPTS = 3;
export const DEFAULT_PAGE_SIZE = 10;
export const SUPPORTED_FORMATS = ['jpg', 'png', 'gif'] as const;
```

### **2. Objetos de Constantes**
```tsx
export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
} as const;
```

### **3. Enums para Opciones**
```tsx
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}
```

## 🚨 **Reglas Importantes**

1. **Siempre** usar `as const` para objetos de constantes
2. **Siempre** exportar desde `src/constants/index.ts`
3. **Siempre** usar nomenclatura en MAYÚSCULAS
4. **Siempre** agrupar constantes relacionadas en el mismo archivo
5. **Nunca** definir constantes en archivos de componentes
6. **Siempre** importar tipos compartidos desde `../../types` (centralizado)
7. **Siempre** importar constantes desde `../../constants` (centralizado)

## 🔮 **Constantes para el Futuro**

Cuando el proyecto evolucione, podrás agregar:

- **API_ENDPOINTS** - URLs de endpoints reales
- **ROUTES** - Rutas de navegación
- **APP_CONFIG** - Configuraciones de entorno
- **ERROR_MESSAGES** - Mensajes de error estándar
- **THEME** - Colores y estilos
- **LOCALIZATION** - Idiomas y traducciones

## 🔗 **Referencias**

- **README principal**: Ver `../README.md`
- **Servicios**: Ver `../services/README.md`
- **Hooks**: Ver `../hooks/README.md`
