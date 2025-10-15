import { Router } from 'express';
import userRouter from './userRoutes';
import allianceRouter from './allianceRoutes';
import resourceRouter from './resourceRoutes';
import sectionRouter from './sectionRoutes';
import documentRouter from './documentRoutes';
import searchRouter from './searchRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.send('¡API funcionando!');
});

router.use('/users', userRouter);
router.use('/alliances', allianceRouter);
router.use('/resources', resourceRouter);
router.use('/sections', sectionRouter);

export default router;

