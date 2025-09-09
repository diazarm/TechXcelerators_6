import { Router } from 'express';
import {
    getAlliances,
    getAllianceById,
    createAlliance,
    updateAlliance,
    deleteAlliance,
    restoreAlliance
} from '../controllers/allianceController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware';

const allianceRouter = Router();

// Rutas públicas. Listar y ver alianzas (acceso público)
allianceRouter.get('/', getAlliances);
allianceRouter.get('/:id', getAllianceById);

// Rutas que requieren autenticación (miembros, staff, etc.)
allianceRouter.post('/', authMiddleware, createAlliance);

// Rutas que requieren autenticación y permisos de administrador
allianceRouter.put('/:id', authMiddleware, updateAlliance);
allianceRouter.delete('/:id', authMiddleware, verifyAdmin, deleteAlliance);
allianceRouter.patch('/restore/:id', authMiddleware, verifyAdmin, restoreAlliance);

export default allianceRouter;
