import { Router } from 'express';
import userRouter from './userRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.send('¡API funcionando!');
});

router.use('/users', userRouter);

export default router;
