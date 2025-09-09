import { Router } from 'express';
import userRouter from './userRoutes';
import allianceRouter from './allianceRoutes';
import resourceRouter from './resourceRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.send('¡API funcionando!');
});

router.use('/users', userRouter);
router.use('/alliances', allianceRouter)
router.use('/resources', resourceRouter);

export default router;
