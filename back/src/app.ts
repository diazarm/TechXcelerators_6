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

const allowedOrigins = [
  "http://localhost:5173", // frontend local
  "https://tu-frontend.vercel.app" // URL del frontend desplegado en Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
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
const ENV = process.env.NODE_ENV || 'development';
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en ${ENV === 'production' ? 'Render' : 'local'} → http://localhost:${PORT}`);
});

