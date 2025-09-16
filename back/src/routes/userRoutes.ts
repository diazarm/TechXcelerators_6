//Estructura de un controlador de usuario en TypeScript
import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, restoreUser, changeRole, login, verifyToken, getDeletedUsers } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware';

const userRouter = Router();

// Rutas públicas
userRouter.post('/login', login);

// Rutas para usuarios autenticados. Ahora cualquier usuario autenticado puede verificar su token, lo cual es esencial para el frontend para validar sesiones.
userRouter.get("/verifytoken", authMiddleware, verifyToken);

// Rutas solo para administradores
userRouter.get('/', authMiddleware, verifyAdmin, getUsers);
userRouter.get('/deleted', authMiddleware, verifyAdmin, getDeletedUsers);
userRouter.get('/:id', authMiddleware, verifyAdmin, getUserById);
userRouter.post('/', authMiddleware, verifyAdmin, createUser);
userRouter.put('/:id', authMiddleware, verifyAdmin, updateUser);
userRouter.delete('/:id', authMiddleware, verifyAdmin, deleteUser);
userRouter.patch('/restore/:id', authMiddleware, verifyAdmin, restoreUser);
userRouter.patch('/role/:id', authMiddleware, verifyAdmin, changeRole);

export default userRouter;