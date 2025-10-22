# 🔐 Guía de Autenticación con Swagger

## Pasos para obtener y usar el token JWT

### 1. **Acceder a Swagger UI**
Abre en tu navegador: http://localhost:3000/api-docs

### 2. **Obtener el token JWT**

1. **Busca el endpoint de login**:
   - Ve a la sección **"Users"**
   - Busca `POST /api/users/login`

2. **Ejecutar el login**:
   - Haz clic en **"Try it out"**
   - Ingresa las credenciales:
   ```json
   {
     "email": "admin@scalalearning.com",
     "password": "admin123"
   }
   ```
   - Haz clic en **"Execute"**

3. **Copiar el token**:
   - En la respuesta, copia el valor del campo `token`
   - Ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. **Configurar autenticación en Swagger**

1. **Botón Authorize**:
   - En la parte superior de Swagger UI, haz clic en el botón **"Authorize" 🔒** (verde)

2. **Ingresar token**:
   - En el campo **"Value"**, pega SOLO el token (sin "Bearer")
   - ❌ Incorrecto: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - ✅ Correcto: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **Autorizar**:
   - Haz clic en **"Authorize"**
   - Haz clic en **"Close"**

### 4. **Usar endpoints protegidos**

Una vez autenticado, verás:
- 🔒 Un candado cerrado junto a endpoints que requieren autenticación
- Los endpoints protegidos ahora funcionarán sin error 401

### 5. **Usuarios de prueba disponibles**

| Rol | Email | Password | Autenticación | Permisos |
|-----|-------|----------|---------------|-----------|
| **Admin** | admin@scala.com | Admin1234 | Email + Contraseña | Todos los endpoints |
| **Director** | director@scala.com | N/A | Solo Email | Gestión de recursos |
| **User** | andrea@scala.com | N/A | Solo Email | Solo lectura |

**Nota importante**: 
- **Admin** necesita email + contraseña
- **Director y User** solo necesitan email para autenticarse

### 6. **Renovar token**

Los tokens JWT tienen expiración. Si recibes error 401:
1. Repite el proceso de login para obtener un nuevo token
2. Actualiza la autorización con el nuevo token

### 7. **Endpoints importantes para probar**

#### **Públicos** (no requieren token):
- `GET /api` - Estado de la API
- `POST /api/users/login` - Obtener token

#### **Protegidos** (requieren token):
- `GET /api/users/verifytoken` - Verificar token actual
- `GET /api/users` - Lista de usuarios (solo admin)
- `GET /api/resources` - Lista de recursos
- `POST /api/resources` - Crear recurso (directores/admin)

### 8. **Solución de problemas**

#### Error 401 "Unauthorized":
- ✅ Verifica que copiaste el token completo
- ✅ Asegúrate de no incluir "Bearer" al pegarlo
- ✅ Revisa que el token no haya expirado
- ✅ Confirma que usaste las credenciales correctas

#### Error 403 "Forbidden":
- ✅ El token es válido pero no tienes permisos para ese endpoint
- ✅ Usa una cuenta con rol apropiado (admin para gestión de usuarios)

#### Error 400 "Bad Request":
- ✅ Revisa que el formato del JSON sea correcto
- ✅ Incluye todos los campos requeridos

### 9. **Comando cURL de ejemplo**

Si prefieres usar cURL en lugar de Swagger UI:

```bash
# 1. Obtener token
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@scalalearning.com","password":"admin123"}'

# 2. Usar token en endpoint protegido
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 10. **Tips adicionales**

- 💡 **Mantén la pestaña de Swagger abierta** mientras trabajas
- 💡 **Usa el botón "Clear"** en Authorize para cerrar sesión
- 💡 **Los tokens expiran** - renuévalos cuando sea necesario
- 💡 **Diferentes roles** tienen diferentes permisos - prueba con varios usuarios

¡Ya estás listo para explorar y probar todos los endpoints de la API! 🚀