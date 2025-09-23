# 📌 ScalaLearning - Backend

Backend del proyecto **ScalaLearning**, desarrollado en **Node.js + Express + TypeScript**, con base de datos en **MongoDB**.
Incluye autenticación con JWT, control de roles (admin, director, usuario), y gestión de secciones, recursos y alianzas.

---

## 🚀 Tecnologías

* [Node.js]
* [Express]
* [TypeScript]
* [MongoDB] + [Mongoose]
* [JWT] para autenticación
* [bcrypt] para encriptación de contraseñas

---

## ⚙️ Requisitos previos

* Node.js v18+
* MongoDB (local o en la nube)
* Postman (opcional, para pruebas)

---

## 📂 Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/diazarm/TechXcelerators_6.git
   cd nombre_carpeta
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env` en la raíz del proyecto:

   ```env
   MONGODB_URI=mongodb://localhost:27017/scala_mvp
   JWT_SECRET=tu_clave_secreta
   PORT=3000
   SECRET_KEY=tu_clave
   JWT_EXPIRATION=3600
   ```

4. Ejecutar en modo desarrollo:

   ```bash
   npm run dev
   ```

5. Compilar y ejecutar en producción:

   ```bash
   npm run build
   npm run start
   ```

---

## 🔑 Roles y permisos

* **Admin** → acceso total al sistema, gestión completa (usuarios, secciones, recursos, alianzas).
* **Director** → acceso total al sistema, puede eliminar/restaurar recursos y alianzas y no gestiona usuarios.
* **Usuario** → acceso al sistema pero con algunas restricciones, no puede eliminar o restaurar datos y no gestiona usuarios.

---

## 📌 Endpoints principales

| Módulo    | Endpoint base    | Acciones principales       |
| --------- | ---------------- | -------------------------- |
| Users     | `/api/users`     | CRUD, login, roles         |
| Sections  | `/api/sections`  | CRUD (solo admin)          |
| Resources | `/api/resources` | CRUD, soft delete, restore |
| Alliances | `/api/alliances` | CRUD, soft delete, restore |

---

## 🧪 Postman

En la carpeta `/postman` encontrarás:

* `ScalaLearning.postman_collection.json` → rutas de la API.
* `ScalaLearning.postman_environment.json` → variables (`{{baseUrl}}`, `{{token}}`).

### Flujo recomendado:

1. Ejecutar **Login** con admin/director/usuario.
2. El token se guarda en la variable `{{token}}`.
3. Usar cualquier ruta protegida automáticamente con `Bearer {{token}}`.

---

## ☁️ Deploy

El backend se desplegará en:

* **Render**.
* Base de datos en **MongoDB Atlas** (recomendado para producción).

---

## 👨‍💻 Equipo

* Backend: \[Alex Ancelovici, Rebeca Vargas y Christopher Pesántez (TL)]

---
