//Estructura de un controlador de usuario en TypeScript
import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, restoreUser, changeRole, login, verifyToken } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware';

const userRouter = Router();

userRouter.post('/login', login);
userRouter.get("/verifytoken", authMiddleware, verifyAdmin, verifyToken);

userRouter.get('/', authMiddleware, verifyAdmin, getUsers);
userRouter.get('/:id', authMiddleware, verifyAdmin, getUserById);
userRouter.post('/', authMiddleware, verifyAdmin, createUser);
userRouter.put('/:id', authMiddleware, verifyAdmin, updateUser);
userRouter.delete('/:id', authMiddleware, verifyAdmin, deleteUser);
userRouter.patch('/restore/:id', authMiddleware, verifyAdmin, restoreUser);
userRouter.patch('/role/:id', authMiddleware, verifyAdmin, changeRole);

export default userRouter;