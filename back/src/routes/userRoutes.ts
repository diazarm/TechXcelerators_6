//Estructura de un controlador de usuario en TypeScript
import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, restoreUser, changeRole, login, verifyToken, getDeletedUsers, resetAdminPassword } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: |
 *       Autenticar usuario y obtener token JWT para acceder a endpoints protegidos.
 *       
 *       **Tipos de autenticación:**
 *       - **Admin**: Requiere email + contraseña
 *       - **Director**: Solo requiere email
 *       - **User**: Solo requiere email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *                 example: "user@scala.com"
 *               password:
 *                 type: string
 *                 description: Contraseña (requerida solo para admin)
 *                 example: "1234"
 *           examples:
 *             admin:
 *               summary: Login de Admin (requiere email + contraseña)
 *               value:
 *                 email: "administrador@scalalearning.com"
 *                 password: "123456"
 *             user:
 *               summary: Login de User (solo email)
 *               value:
 *                 email: "user@scalalearning.com"
 *             director:
 *               summary: Login de Director (solo email)
 *               value:
 *                 email: "director@scalalearning.com"
 *     responses:
 *       200:
 *         description: Login exitoso - Copia el token de la respuesta y úsalo en el botón "Authorize" 🔒
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT - Copia este valor para autenticarte
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 summary: Respuesta exitosa
 *                 value:
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE2YjUyYzQzZjMzYmY5ZjkyZTA4NTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk1Mzg2MjAsImV4cCI6MTcyOTU0MjIyMH0.example"
 *                   user:
 *                     _id: "6716b52c43f33bf9f92e0850"
 *                     name: "Administrador"
 *                     email: "admin@scalalearning.com"
 *                     role: "admin"
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Rutas públicas
userRouter.post('/login', login);

/**
 * @swagger
 * /api/users/verifytoken:
 *   get:
 *     summary: Verificar token de autenticación
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Rutas protegidas por autenticación
userRouter.get('/verifytoken', authMiddleware, verifyToken);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Acceso denegado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//El administrador puede gestionar usuarios
userRouter.get('/', authMiddleware, verifyAdmin, getUsers);

/**
 * @swagger
 * /api/users/deleted:
 *   get:
 *     summary: Obtener usuarios eliminados (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios eliminados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Acceso denegado
 */
userRouter.get('/deleted', authMiddleware, verifyAdmin, getDeletedUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear nuevo usuario (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *                 example: "juan.perez@scalalearning.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [admin, director, user]
 *                 description: Rol del usuario
 *                 example: "user"
 *               alliance:
 *                 type: string
 *                 description: ID de la alianza (opcional)
 *                 example: "6716b52c43f33bf9f92e0851"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Acceso denegado
 */
userRouter.post('/', authMiddleware, verifyAdmin, createUser);

/**
 * @swagger
 * /api/users/restore/{id}:
 *   patch:
 *     summary: Restaurar usuario eliminado (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a restaurar
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Usuario restaurado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado
 */
userRouter.patch('/restore/:id', authMiddleware, verifyAdmin, restoreUser);

/**
 * @swagger
 * /api/users/role/{id}:
 *   patch:
 *     summary: Cambiar rol de usuario (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, director, user]
 *                 description: Nuevo rol del usuario
 *                 example: "director"
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado
 */
userRouter.patch('/role/:id', authMiddleware, verifyAdmin, changeRole);

/**
 * @swagger
 * /api/users/passwordReset:
 *   patch:
 *     summary: Resetear contraseña de admin (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       403:
 *         description: Acceso denegado
 */
userRouter.patch('/passwordReset', authMiddleware, verifyAdmin, resetAdminPassword);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado
 *   put:
 *     summary: Actualizar usuario (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Juan Pérez Actualizado"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *                 example: "juan.actualizado@scalalearning.com"
 *               role:
 *                 type: string
 *                 enum: [admin, director, user]
 *                 description: Rol del usuario
 *                 example: "director"
 *               alliance:
 *                 type: string
 *                 description: ID de la alianza
 *                 example: "6716b52c43f33bf9f92e0851"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado
 *   delete:
 *     summary: Eliminar usuario (Solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *           example: "6716b52c43f33bf9f92e0850"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado
 */
userRouter.get('/:id', authMiddleware, verifyAdmin, getUserById);
userRouter.put('/:id', authMiddleware, verifyAdmin, updateUser);
userRouter.delete('/:id', authMiddleware, verifyAdmin, deleteUser);

export default userRouter;