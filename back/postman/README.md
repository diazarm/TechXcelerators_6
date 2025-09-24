# 📌 Uso de la colección Postman para ScalaLearning API

Este proyecto incluye una colección de Postman con todas las rutas de la API (users, resources, sections, alliances) y un environment con las variables necesarias.

---

## 🛠️ Requisitos

* Tener instalado Postman (puedes descargarlo desde https://www.postman.com/downloads/
).

## 📂 Archivos incluidos

En la carpeta /postman encontrarás:

* _ScalaLearning.postman_collection.json_ → contiene todas las rutas de la API.

* _ScalaLearning.postman_environment.json_ → contiene las variables necesarias como {{baseUrl}} y {{token}}.

## 🚀 Pasos para importar en Postman

1. Abre Postman.
2. Haz clic en el botón Import (arriba a la izquierda).
3. Selecciona los archivos .json de la carpeta /postman.
4. Te aparecerán:
* La colección ScalaLearning en la barra lateral izquierda.
* El environment ScalaLearning en la parte superior derecha (dropdown de entornos).
5. Selecciona el environment ScalaLearning.

## ⚙️ Variables del environment

* baseUrl → dirección base de la API (por defecto: http://localhost:3000/api).

* token → se genera automáticamente al hacer login con cualquier usuario.

🔹 Qué debe tener ese entorno

En este caso:

Variable	Valor inicial (Initial Value)	           Nota
baseUrl	    http://localhost:3000/api	               Cambiar si deployan a la nube
token	    (vacío, se autogenera al hacer login)	   Se llena desde el script de login

## 🔑 Flujo recomendado

1. Ejecuta la request Login_user dentro de la carpeta Auth.
* Esto guardará automáticamente el {{token}} en el environment.
2. Ahora puedes ejecutar cualquier ruta protegida (users, resources, sections, alliances).
3. Si quieres probar con diferentes roles (admin, director, user), haz login con cada uno y el token se actualizará automáticamente.