import { Router } from 'express';
import userRouter from './userRoutes';
import allianceRouter from './allianceRoutes';
import resourceRouter from './resourceRoutes';
import sectionRouter from './sectionRoutes';
import searchRouter from './searchRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.send('¡API funcionando!');
});

router.use('/users', userRouter);
router.use('/alliances', allianceRouter)
router.use('/resources', resourceRouter);
router.use('/sections', sectionRouter);
router.use('/search', searchRouter);

export default router;
