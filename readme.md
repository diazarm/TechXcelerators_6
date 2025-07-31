# TechXcelerators 6 – Repositorio General

Este repositorio contiene el trabajo colaborativo de los equipos de **Frontend**, **Backend** y **Data Science** para el proyecto TechXcelerators 6.

---

## 📁 Estructura del Proyecto

```

/frontend        --> Código del equipo Frontend (React, HTML, CSS, etc.)
/backend         --> Código del equipo Backend (Node.js, Express, etc.)
/data-science    --> Código del equipo de Data Science (Python, notebooks, etc.)

````

---

## 🌳 Ramas del repositorio

- `main`: Rama principal, estable, lista para producción o entregas.
- `developer`: Rama de integración, donde se consolidan los avances de todos los equipos.
- `feature/*`: Ramas individuales para trabajar nuevas funcionalidades o tareas.

---

## 🛠️ ¿Cómo trabajar en este repositorio?

### 1. Cloná el repositorio

```bash
git clone https://github.com/tu-usuario/TechXcelerators_6.git
cd TechXcelerators_6
````

### 2. Creá una nueva rama para tu tarea

Usá un nombre descriptivo y que indique el equipo:

```bash
# Ejemplos de nombres:
git checkout -b feature/frontend-login
git checkout -b feature/backend-endpoint-users
git checkout -b feature/data-cleaning-script
```

### 3. Hacé cambios en tu carpeta correspondiente

Asegurate de **no tocar el código de otros equipos**.

### 4. Guardá tus cambios

```bash
git add .
git commit -m "feat(frontend): componente de login con validaciones"
```

📝 Tip: Usá mensajes de commit claros. Estructura sugerida:

```
feat(nombre-del-equipo): descripción corta del cambio
fix(nombre-del-equipo): para corrección de bugs
```

### 5. Sincronizá con la rama `developer` (opcional pero recomendado)

Antes de subir tus cambios, traé los últimos cambios de `developer`:

```bash
git checkout developer
git pull origin developer
git checkout feature/tu-rama
git merge developer
```

🔁 Resolvé conflictos si los hay.

### 6. Subí tu rama al repositorio

```bash
git push origin feature/tu-rama
```

---

## ✅ Pull Request (PR)

* Desde tu rama `feature/*` hacia `developer`
* Asigná revisores si es necesario (por ejemplo, compañeros de equipo o coach técnico)
* El PR debe incluir:

  * Qué se hizo
  * Qué archivos se modificaron
  * Capturas o evidencias (si aplica)

---

## 🚀 Flujo de integración y despliegue

1. Cada equipo trabaja en su propia rama (`feature/*`)
2. Se hacen PR hacia `developer`
3. Una vez aprobado y probado, se mergea `developer` → `main`
4. `main` representa la versión final del proyecto

---

## 🧠 Buenas prácticas

* No trabajar directamente en `main` ni en `developer`.
* Usar nombres de ramas y commits descriptivos.
* Hacer commits pequeños y frecuentes.
* Evitar conflictos: traer los últimos cambios antes de subir los tuyos.
* Usar `pull request` para toda integración al repositorio.

---

## 📌 Notas adicionales

* Cada equipo tiene autonomía dentro de su carpeta.
* Los archivos compartidos (como documentación general) deben ser coordinados.
* Las issues y proyectos serán gestionados desde GitHub Projects (ver tableros del repositorio).

---

✉️ Consultas o problemas técnicos: coordinarlos con el coach Marcelo Diaz o tech lead correspondiente.

