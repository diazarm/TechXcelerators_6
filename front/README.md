# 🚀 TechXcelerators Frontend

**Proyecto base profesional para el equipo Frontend** con React, TypeScript, Vite y Tailwind CSS.

**Cómo se construye este servicio?: Imagina que quieres construir tu casa perfecta:**

**Empiezas con un plano** - Los tipos son como los planos de la casa. Antes de construir algo, necesitas saber exactamente cómo debe ser. En este proyecto tienes dos tipos de planos: los específicos de cada mueble o habitación (co-locados) y los que se usan en toda la casa (compartidos, como el plano general o cómo debe ser una persona(UserRol)).

**Luego construyes los muebles** - Los componentes son como los muebles de la casa. Una silla, una mesa, una lámpara. Puedes usar la misma silla en la cocina y en el comedor porque los componentes son reutilizables y siguen los planos que ya definiste.

**Conectas todo con interruptores** - Los hooks son como los interruptores de luz. Cuando los presionas, algo pasa. Los hooks conectan los componentes con la información que necesitan y hacen que las cosas funcionen cuando las necesitas.

**Construyes sobre cimientos sólidos** - Los contextos son como los cimientos que sostienen toda la casa. Sin cimientos sólidos, la casa se cae. Aquí guardas información que toda la casa necesita saber, como quién vive ahí o qué temperatura debe tener.

**Llamas a los servicios** - Los servicios son como cuando llamas al plomero o al electricista. Conectan tu casa con el mundo exterior, traen información de otros lugares y hacen que todo funcione.

**Y todo está en un catálogo** - Los archivos index.ts son como el catálogo de Ikea. En lugar de buscar cada mueble por separado, vas a un lugar y encuentras todo lo que necesitas. Si quieres usar una mesa, vas al catálogo y te dice exactamente dónde está y cómo usarla. (Archivos de exportación centralizados)

**El resultado es mágico** - Cada pieza sabe cómo hablar con las otras, los cambios se reflejan en toda la casa, y todo funciona como un reloj suizo. Es como tener una casa que se construye sola siguiendo tus planos perfectos.


## 🏗️ **Estructura del Proyecto**

```
src/
├── components/          # Muebles reutilizables
│   ├── index.ts        ← Catálogo central
│   ├── Button/         # Botón reutilizable
│   ├── LoadingSpinner/ # Indicador de carga
│   ├── ErrorBoundary/  # Manejo de errores
│   └── Navigation/     # Navegación principal
├── context/            # Cimientos de la casa
│   ├── index.ts        ← Catálogo central
│   ├── auth/           # Autenticación global
│   └── loading/        # Estado de carga global
├── hooks/              # Interruptores de la casa
│   ├── index.ts        ← Catálogo central
│   ├── useResponsive/  # Responsividad inteligente
│   ├── useAuth/        # Autenticación
│   └── useLoadingContext/ # Estado de carga
├── pages/              # Habitaciones de la casa
│   ├── Contact/        # Página de contacto
│   └── WelcomePage/    # Página de bienvenida
├── services/           # Servicios externos
│   ├── index.ts        ← Catálogo central
│   ├── api.ts          # Configuración HTTP
│   └── authService.ts  # Autenticación
├── types/              # Planos compartidos
│   ├── index.ts        ← Solo tipos compartidos
│   └── shared.ts       # User, AuthContextType, etc.
└── constants/          # Reglas de construcción
    ├── index.ts        ← Catálogo central
    └── appConstants.ts # Constantes de la app
```

## 🚀 **Comandos Esenciales**

### **🔄 Git Básico**
```bash
# Obtener cambios y crear rama
git pull origin developer
git checkout -b feature/nombre-funcionalidad

# Hacer cambios y subir
git add . && git commit -m "feat: implementa funcionalidad"
git push origin feature/nombre-funcionalidad
```

### **🧪 Verificación**
```bash
# Verificar tipos
npx tsc --noEmit --project tsconfig.app.json

# Verificar calidad
npm run lint
```

### **🚀 Desarrollo**
```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build
```


## 🎨 **Tecnologías**

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router** - Navegación SPA

## 📚 **Documentación Detallada**

**Para información específica de cada módulo, consulta:**
- `src/components/README.md` - Componentes y patrones
- `src/hooks/README.md` - Hooks y uso
- `src/context/README.md` - Contextos y estado global
- `src/types/README.md` - Sistema de tipos
- `src/services/README.md` - Servicios y APIs
- `src/constants/README.md` - Constantes y configuración







## 🎨 **Tecnologías**

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP

## 🚨 **Reglas del Proyecto**

### **📦 Patrones de Import **
1. **Siempre** usar hooks centralizados (`../../hooks`)
2. **Siempre** usar contextos centralizados (`../../context`)
3. **Siempre** usar servicios centralizados (`../../services`)
4. **Siempre** usar tipos centralizados (`../../types`)

### **🏷️ Sistema de Tipos **
5. **Siempre** definir tipos co-locados en `./types.ts`
6. **Siempre** usar `import type { Props } from './types'` para tipos locales
7. **Siempre** usar `import type { Type } from '../../types'` para tipos compartidos
8. **Nunca** definir interfaces en archivos de componentes

### **🎨 Desarrollo **
9. **Nunca** usar media queries - solo `useResponsive`
10. **Siempre** considerar ErrorBoundary en componentes críticos
11. **Siempre** usar TypeScript con tipos estrictos
12. **Siempre** seguir el patrón de componentes funcionales

### **📁 Estructura de Archivos **
13. **Siempre** crear `index.ts` en carpetas principales
14. **Siempre** crear `types.ts` en módulos con tipos
15. **Siempre** usar nomenclatura `PascalCase` para componentes
16. **Siempre** usar nomenclatura `camelCase` para funciones y variables

---

**¡Listo para desarrollar! 🎉**
