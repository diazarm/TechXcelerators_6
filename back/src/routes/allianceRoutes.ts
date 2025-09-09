import { Router } from 'express';
import {
    getAlliances,
    getAllianceById,
    createAlliance,
    updateAlliance,
    deleteAlliance
} from '../controllers/allianceController';

const allianceRouter = Router();

allianceRouter.get('/', getAlliances);
allianceRouter.get('/:id', getAllianceById);
allianceRouter.post('/', createAlliance);
allianceRouter.put('/:id', updateAlliance);
allianceRouter.delete('/:id', deleteAlliance);

export default allianceRouter;
