import { Router } from 'express';
import userRouter from './userRoutes';
import allianceRouter from './allianceRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.send('¡API funcionando!');
});

router.use('/users', userRouter);
router.use('/alliances', allianceRouter)

export default router;
