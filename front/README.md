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
├── components/          # Componentes reutilizables
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── Button/
│   │   ├── index.tsx   # Componente Button
│   │   └── types.ts    # Tipos co-locados (ButtonProps)
│   ├── LoadingSpinner/
│   │   ├── index.tsx   # Componente LoadingSpinner
│   │   └── types.ts    # Tipos co-locados (LoadingSpinnerProps)
│   ├── ErrorBoundary/
│   │   ├── index.tsx   # Componente ErrorBoundary
│   │   └── types.ts    # Tipos co-locados (ErrorBoundaryProps)
│   ├── Navigation/
│   │   └── index.tsx   # Componente Navigation
│   └── LoginForm/
│       └── index.tsx   # Componente LoginForm
├── context/            # Contextos de React
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── auth/
│   │   ├── auth-context.ts    # Contexto de autenticación
│   │   └── AuthProvider.tsx   # Proveedor de auth
│   └── loading/
│       ├── loading-context.ts # Contexto de loading
│       ├── LoadingProvider.tsx # Proveedor de loading
│       └── types.ts           # Tipos co-locados (LoadingProviderProps)
├── hooks/              # Hooks personalizados
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── useResponsive.ts       # Hook de responsividad
│   ├── useAuth.ts             # Hook useAuth
│   └── useLoadingContext.ts   # Hook useLoadingContext
├── pages/              # Páginas de la aplicación
│   ├── Contact/
│   │   └── index.tsx          # Página de contacto
│   ├── WelcomePage/
│   │   ├── index.tsx          # Página de bienvenida
│   │   ├── types.ts           # Tipos específicos de la página
│   │   └── utils/
│   │       └── index.ts       # Utilidades de la página
│   └── Login/
│       └── index.tsx          # Página de login
├── services/           # Servicios y APIs
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   ├── api.ts                 # Configuración de Axios
│   └── authService.ts         # Servicio de autenticación
├── types/              # Tipos compartidos
│   ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
│   └── shared.ts              # Tipos entre módulos
└── constants/          # Constantes de la aplicación
    ├── index.ts        ← EXPORTACIÓN CENTRALIZADA
    └── appConstants.ts        # Constantes de la app
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

### **🧪 Verificación del Proyecto**
```bash
# Verificar tipos
npx tsc --noEmit --project tsconfig.app.json

# Verificar calidad de código
npm run lint

# Verificar archivo específico
npx eslint src/components/ComponentName.tsx
```

### **🚀 Desarrollo y Build**
```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

### **🔍 Debugging Útil**
```bash
# Ver configuración de TypeScript
npx tsc --showConfig

# Limpiar caché de npm
npm cache clean --force

# Ver dependencias desactualizadas
npm outdated
```

## 🎨 **Tecnologías**

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router** - Navegación SPA

## 📚 **Documentación Detallada**

**¿Por qué consultar los READMEs específicos?**
Cada módulo tiene su propia documentación especializada con ejemplos prácticos, patrones de uso y reglas específicas que te ayudarán a desarrollar de manera eficiente.

**Qué encontrarás en cada uno:**
- **`src/components/README.md`** - Cómo crear y usar componentes, patrones recomendados, ejemplos de uso
- **`src/hooks/README.md`** - Ejemplos de uso de cada hook, casos prácticos, reglas importantes
- **`src/context/README.md`** - Configuración de contextos, patrones de estado global, ejemplos
- **`src/types/README.md`** - Cuándo usar tipos co-locados vs compartidos, ejemplos, patrones
- **`src/services/README.md`** - Cómo crear servicios, patrones de API, ejemplos de uso
- **`src/constants/README.md`** - Organización de constantes, patrones de nomenclatura, ejemplos

**💡 Recomendación:** Comienza revisando el README del módulo que vas a usar. Te ahorrará tiempo y evitará errores comunes.

---

**¡Listo para desarrollar! 🎉**
