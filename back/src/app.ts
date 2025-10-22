import express from 'express'; 
import router from './routes';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { errorHandler } from './utils/errorHandler';
import cors from 'cors';
import { setupSwagger } from './config/swagger.config';

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173' // Declaramos el puerto que usa el frontend
}));

app.use(express.json());

// Configurar Swagger
setupSwagger(app);

app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});


app.use('/api', router);
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {    
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

