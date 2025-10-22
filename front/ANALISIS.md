# 🔍 Guía de Análisis de Proyecto

Esta guía explica cómo usar las herramientas de análisis integradas en el proyecto.

## 🏗️ Análisis de Arquitectura (Madge)

### ¿Qué Analiza?
- Dependencias circulares (pueden causar bugs)
- Estructura de módulos
- Gráficos visuales de dependencias

### Comandos Disponibles

#### 1. Detectar Dependencias Circulares
```bash
npm run analyze:circular
```

**Salida esperada:**
```
✅ No circular dependencies found!

O si hay problemas:
❌ Circular dependency found:
src/hooks/useCards.ts > src/hooks/useResponsive.ts > src/hooks/useCards.ts
```

**Acción:** Si encuentra circulares, refactorizar para romper el ciclo.

---

#### 2. Ver Todas las Dependencias
```bash
npm run analyze:deps
```

**Salida esperada:**
```
src/hooks/useCards.ts
├── react
├── react-router-dom
├── ../constants
├── ../services
└── ./useAuth
```

**Acción:** Revisar si hay dependencias innecesarias.

---

#### 3. Generar Gráfico Visual
```bash
npm run analyze:graph
```

**Salida:** Se crea `dependency-graph.svg` en la carpeta `front/`

**Acción:** Abrir el SVG para ver la estructura visual del proyecto.

---

## 📦 Análisis de Bundle (Rollup Visualizer)

### ¿Qué Analiza?
- Tamaño del bundle de producción
- Qué dependencias ocupan más espacio
- Oportunidades de optimización

### Comando

```bash
npm run build
```

**Salida:** Automáticamente abre `dist/stats.html` en el navegador

**Qué verás:**
- 📊 Gráfico tipo "mapa de calor"
- 📦 Tamaño de cada módulo
- 🎯 Qué optimizar primero

**Ejemplo de Insights:**
```
react-feather: 450KB (¡muy grande!)
react-dom: 130KB (normal)
axios: 85KB (normal)
tu-codigo: 200KB (normal)

Total Bundle: 865KB
Gzipped: 285KB
```

---

## 🎯 Cuándo Usar Cada Análisis

### **Análisis de Dependencias Circulares** (analyze:circular)
**Cuándo:**
- ✅ Antes de cada merge a main
- ✅ Cuando tienes bugs raros de "loop infinito"
- ✅ Al agregar nuevos hooks o servicios

**Objetivo:** Evitar dependencias circulares que causan bugs.

---

### **Análisis de Bundle** (build)
**Cuándo:**
- ✅ Antes de deployment a producción
- ✅ Cuando la app se siente lenta
- ✅ Al agregar nuevas dependencias grandes

**Objetivo:** Mantener el bundle pequeño y rápido.

---

### **Gráfico de Dependencias** (analyze:graph)
**Cuándo:**
- ✅ Al onboardear nuevos desarrolladores
- ✅ Cuando refactorizas estructura
- ✅ Para documentar arquitectura

**Objetivo:** Visualizar la estructura del proyecto.

---

## 📋 Flujo de Trabajo Recomendado

### Antes de cada Deploy:
```bash
# 1. Verificar arquitectura
npm run analyze:circular

# 2. Si no hay circulares, hacer build con análisis
npm run build

# 3. Revisar stats.html
# 4. Si bundle es >1MB, optimizar
```

---

## 🚨 Problemas Comunes y Soluciones

### "Circular dependency found!"
**Causa:** Dos archivos se importan entre sí.

**Solución:**
1. Identificar el ciclo en el mensaje de error
2. Mover lógica compartida a un tercer archivo
3. Usar barrel exports para romper el ciclo

**Ejemplo:**
```
❌ useCards.ts → useResponsive.ts → useCards.ts

✅ Solución:
useCards.ts → types.ts ← useResponsive.ts
```

---

### "Bundle muy grande (>1MB)"
**Causa:** Dependencias pesadas sin tree-shaking.

**Solución:**
```typescript
// ❌ Importa TODO react-feather (450KB)
import { Star } from 'react-feather';

// ✅ Importa solo Star
import Star from 'react-feather/dist/icons/star';
```

---

## 📊 Métricas Objetivo

### Bundle Size
- ✅ **Excelente**: < 500KB
- ⚠️ **Aceptable**: 500KB - 1MB
- ❌ **Mejorar**: > 1MB

### Dependencias Circulares
- ✅ **Objetivo**: 0 circulares
- ⚠️ **Máximo aceptable**: 1-2 circulares controlados

---

## 🎓 Recursos Adicionales

- [Madge Documentation](https://github.com/pahen/madge)
- [Rollup Visualizer](https://github.com/btd/rollup-plugin-visualizer)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0

