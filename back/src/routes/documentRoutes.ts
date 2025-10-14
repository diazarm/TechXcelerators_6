import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  uploadDocument,
  listAllDocuments,
  getOneDocument,
  removeDocument,
  downloadDocument,
  restoreDocuments,
} from '../controllers/documentController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware';

const documentRouter = Router();

// === Configuración de Multer ===
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const base = path.parse(file.originalname).name.replace(/[^\w\s.-]/g, '_');
    cb(null, `${Date.now()}_${base}${path.extname(file.originalname)}`);
  },
});

const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
]);

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (ALLOWED_MIME.has(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error('Tipo de archivo no permitido')); // Rechazar el archivo
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: Number(process.env.MAX_UPLOAD_MB || 20) * 1024 * 1024 },
});

// === Endpoints ===
// ✅ Solo ADMIN puede subir o eliminar
documentRouter.post('/upload', authMiddleware, verifyAdmin, upload.single('file'), uploadDocument);
documentRouter.delete('/:id', authMiddleware, verifyAdmin, removeDocument);
documentRouter.patch('/restore/:id', authMiddleware, verifyAdmin, restoreDocuments);

// ✅ Usuarios autenticados (user, director) pueden ver y descargar
documentRouter.get('/', authMiddleware, listAllDocuments);
documentRouter.get('/:id', authMiddleware, getOneDocument);

documentRouter.get('/download/:id', authMiddleware, downloadDocument);

export default documentRouter;
