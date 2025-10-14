import { Router } from 'express';
import userRouter from './userRoutes';
import allianceRouter from './allianceRoutes';
import resourceRouter from './resourceRoutes';
import sectionRouter from './sectionRoutes';
import documentRouter from './documentRoutes'; // 👈 importar la nueva ruta
import { authMiddleware } from '../middlewares/auth.middleware';
import { search } from '../controllers/searchController';

const router = Router();

router.get('/', (_req, res) => {
  res.send('¡API funcionando!');
});

router.get('/search', authMiddleware, search);

router.use('/users', userRouter);
router.use('/alliances', allianceRouter);
router.use('/resources', resourceRouter);
router.use('/sections', sectionRouter);

// 👇 NUEVA RUTA: Documentos (solo para admin o autenticados)
router.use('/documents', authMiddleware, documentRouter);

export default router;

