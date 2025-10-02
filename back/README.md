# 📌 ScalaLearning - Backend

Backend del proyecto **ScalaLearning**, desarrollado en **Node.js + Express + TypeScript**, con base de datos en **MongoDB Atlas**.
Incluye autenticación con JWT, control de roles (admin, director, usuario), y gestión de secciones, recursos y alianzas.

---

## 🚀 Tecnologías

* [Node.js]
* [Express]
* [TypeScript]
* [MongoDB Atlas] + [Mongoose]
* [JWT] para autenticación
* [bcrypt] para encriptación de contraseñas

---

## ⚙️ Requisitos previos

* Node.js v18+
* MongoDB Atlas (cuenta y cluster configurado)
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

3. Crear el archivo `.env` en la raíz de la carpeta back:

   ```env
   MONGODB_URI=aquí la cadena de conexion a MongoDB Atlas
   JWT_SECRET=tu_clave_secreta
   PORT=3000
   SECRET_KEY=tu_clave
   JWT_EXPIRATION=3600
   ```
# Conexión a MongoDB Atlas:
# MONGO_URI=mongodb+srv://scala_dev:5WwlbMwKhz1IwMVR@bootcampudd.krd9m.mongodb.net/?retryWrites=true&w=majority&appName=BootcampUDD 

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

## ☁️ Base de datos en Atlas

- Base de datos: scalaBD
- Usuario de desarrollo: scala_dev
  - Role: readWrite
  - Database: scalaBD
  - Collections: * (todas las colecciones)

- Usuarios de desarrollo pueden leer y escribir documentos de dicha Database.
- Backend ya está configurado para consumir Atlas en desarrollo.

---

## ☁️ Deploy

El backend se desplegará en:

* **Render (futuro)**.
* Base de datos en **MongoDB Atlas** (recomendado para producción).

---

## 👨‍💻 Equipo

* Backend: \[Alex Ancelovici, Rebeca Vargas y Christopher Pesántez (TL)]

---
