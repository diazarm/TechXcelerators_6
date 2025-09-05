import { Router } from 'express';
import userRouter from './userRoutes';
import resourceRouter from './resourceRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.send('¡API funcionando!');
});

router.use('/users', userRouter);
router.use('/resources', resourceRouter);

export default router;
