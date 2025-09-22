//Estructura de un controlador de usuario en TypeScript
import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, restoreUser, changeRole, login, verifyToken, getDeletedUsers, resetAdminPassword } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware';

const userRouter = Router();

// Rutas públicas
userRouter.post('/login', login);

// Rutas protegidas por autenticación
userRouter.get('/verifytoken', authMiddleware, verifyToken);

//El administrador puede gestionar usuarios
userRouter.get('/', authMiddleware, verifyAdmin, getUsers);
userRouter.get('/deleted', authMiddleware, verifyAdmin, getDeletedUsers);
userRouter.post('/', authMiddleware, verifyAdmin, createUser);
userRouter.patch('/restore/:id', authMiddleware, verifyAdmin, restoreUser);
userRouter.patch('/role/:id', authMiddleware, verifyAdmin, changeRole);
userRouter.patch('/passwordReset', authMiddleware, verifyAdmin, resetAdminPassword);
userRouter.get('/:id', authMiddleware, verifyAdmin, getUserById);
userRouter.put('/:id', authMiddleware, verifyAdmin, updateUser);
userRouter.delete('/:id', authMiddleware, verifyAdmin, deleteUser);

export default userRouter;