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
import { isDirectorOrAdmin } from '../middlewares/isDirectorOrAdmin.middleware';

const allianceRouter = Router();

//Usuarios autenticados puedes ver y editar las alianzas
allianceRouter.get('/', authMiddleware, getAlliances);
allianceRouter.get('/:id', authMiddleware, getAllianceById);
allianceRouter.put('/:id', authMiddleware, updateAlliance);

//Los directores y el administrador pueden crear nuevas alianzas, eliminar (soft delete) y restaurar alianzas
allianceRouter.post('/', authMiddleware, isDirectorOrAdmin, createAlliance);
allianceRouter.delete('/:id', authMiddleware, isDirectorOrAdmin, deleteAlliance);
allianceRouter.patch('/restore/:id', authMiddleware, isDirectorOrAdmin, restoreAlliance);

export default allianceRouter;
