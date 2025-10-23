# 📋 Documentación Completa de la API - Scala Learning

## 🎉 ¡Documentación de endpoints completada exitosamente!

Todos los endpoints de tu API ahora están completamente documentados en Swagger con:

### ✅ Módulos documentados:

#### 1. **👤 Users (Usuarios)**
- `POST /api/users/login` - Iniciar sesión (obtener token JWT)
- `GET /api/users/verifytoken` - Verificar token
- `GET /api/users` - Listar usuarios (admin)
- `GET /api/users/deleted` - Usuarios eliminados (admin)
- `POST /api/users` - Crear usuario (admin)
- `GET /api/users/{id}` - Obtener usuario por ID (admin)
- `PUT /api/users/{id}` - Actualizar usuario (admin)
- `DELETE /api/users/{id}` - Eliminar usuario (admin)
- `PATCH /api/users/restore/{id}` - Restaurar usuario (admin)
- `PATCH /api/users/role/{id}` - Cambiar rol (admin)
- `PATCH /api/users/passwordReset` - Resetear contraseña (admin)

#### 2. **📚 Resources (Recursos)**
- `GET /api/resources` - Listar recursos
- `POST /api/resources` - Crear recurso (director/admin)
- `GET /api/resources/{id}` - Obtener recurso por ID
- `PUT /api/resources/{id}` - Actualizar recurso
- `DELETE /api/resources/{id}` - Eliminar recurso (director/admin)
- `GET /api/resources/alliance/{name}` - Recursos por alianza
- `GET /api/resources/section/{sectionId}` - Recursos por sección
- `PATCH /api/resources/restore/{id}` - Restaurar recurso (director/admin)

#### 3. **🤝 Alliances (Alianzas)**
- `GET /api/alliances` - Listar alianzas
- `POST /api/alliances` - Crear alianza (director/admin)
- `GET /api/alliances/{id}` - Obtener alianza por ID
- `PUT /api/alliances/{id}` - Actualizar alianza
- `DELETE /api/alliances/{id}` - Eliminar alianza (director/admin)
- `PATCH /api/alliances/restore/{id}` - Restaurar alianza (director/admin)

#### 4. **📂 Sections (Secciones)**
- `GET /api/sections` - Listar secciones
- `POST /api/sections` - Crear sección (director/admin)
- `GET /api/sections/{id}` - Obtener sección por ID
- `PUT /api/sections/{id}` - Actualizar sección (director/admin)
- `DELETE /api/sections/{id}` - Eliminar sección (admin)
- `POST /api/sections/{id}/restore` - Restaurar sección (admin)

#### 5. **📄 Documents (Documentos)**
- `GET /api/documents` - Listar documentos
- `POST /api/documents/upload` - Subir documento (admin)
- `GET /api/documents/{id}` - Obtener documento por ID
- `PUT /api/documents/{id}` - Editar documento (admin)
- `DELETE /api/documents/{id}` - Eliminar documento (admin)
- `GET /api/documents/download/{id}` - Descargar documento
- `PATCH /api/documents/restore/{id}` - Restaurar documento (admin)
- `PATCH /api/documents/{id}/visibility` - Cambiar visibilidad (admin)

#### 6. **🔍 Search (Búsqueda)**
- `GET /api/search` - Buscar recursos
- `GET /api/search/keywords` - Obtener historial de búsquedas del usuario

### 🔐 Niveles de acceso documentados:

| Rol | Permisos |
|-----|-----------|
| **Admin** | Acceso completo a todos los endpoints |
| **Director** | Gestión de recursos, alianzas y secciones |
| **User** | Solo lectura de recursos y búsquedas |

### 📊 Características de la documentación:

✅ **Autenticación JWT configurada**
✅ **Ejemplos de requests y responses**
✅ **Esquemas de datos completos**
✅ **Códigos de estado HTTP documentados**
✅ **Parámetros y queries explicados**
✅ **Información de permisos por rol**
✅ **Interfaz interactiva de pruebas**

### 🚀 Cómo usar la documentación:

1. **Accede a Swagger UI**: http://localhost:3000/api-docs
2. **Obtén tu token**: Usa `POST /api/users/login`
3. **Autorízate**: Haz clic en "Authorize" y pega el token
4. **¡Explora y prueba!**: Todos los endpoints están listos para usar

### 👨‍💻 Para desarrolladores:

- **JSON de la API**: http://localhost:3000/api-docs.json
- **Guía de autenticación**: `AUTH_GUIDE.md`
- **Guía de Swagger**: `SWAGGER_GUIDE.md`

### 🎯 Próximos pasos sugeridos:

1. **Probar todos los endpoints** con diferentes roles de usuario
2. **Verificar respuestas** y ajustar ejemplos si es necesario
3. **Agregar más ejemplos** específicos de tu dominio
4. **Documentar middleware personalizado** si lo deseas
5. **Configurar documentación para producción**

### 📱 Testing rápido:

**Credenciales de prueba:**
- Admin: `administrador@scalalearning.com` / `123456` (requiere email + contraseña)
- Director: `director@scalalearning.com` (solo requiere email)
- User: `user@scalalearning.com` (solo requiere email)

**Endpoints más importantes para probar:**
1. `POST /api/users/login` (obtener token)
2. `GET /api/resources` (listar recursos)
3. `POST /api/resources` (crear recurso - director/admin)
4. `GET /api/search?q=matematicas` (buscar)

¡Tu API ahora tiene una documentación profesional y completa! 🎉

**URLs importantes:**
- 🌐 **Swagger UI**: http://localhost:3000/api-docs
- 📋 **API JSON**: http://localhost:3000/api-docs.json
- 🚀 **API Base**: http://localhost:3000/api