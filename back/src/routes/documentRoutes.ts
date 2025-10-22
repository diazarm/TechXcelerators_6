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
  updateVisibility,
  editDocument,
} from '../controllers/documentController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware';

const documentRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Gestión de documentos y archivos del sistema
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del documento
 *         filename:
 *           type: string
 *           description: Nombre del archivo
 *         originalname:
 *           type: string
 *           description: Nombre original del archivo
 *         path:
 *           type: string
 *           description: Ruta del archivo en el servidor
 *         size:
 *           type: number
 *           description: Tamaño del archivo en bytes
 *         mimetype:
 *           type: string
 *           description: Tipo MIME del archivo
 *         isVisible:
 *           type: boolean
 *           description: Si el documento es visible para usuarios
 *         isDeleted:
 *           type: boolean
 *           description: Estado de eliminación lógica
 *         uploadedBy:
 *           type: string
 *           description: ID del usuario que subió el archivo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 */

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
/**
 * @swagger
 * /api/documents/upload:
 *   post:
 *     summary: Subir documento (Solo admin)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a subir (PDF, DOC, DOCX, TXT - máx 20MB)
 *     responses:
 *       201:
 *         description: Documento subido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: Archivo inválido o muy grande
 *       403:
 *         description: Acceso denegado (solo admin)
 */
// ✅ Solo ADMIN puede subir, eliminar y restaurar archivos y cambiar visibilidad
documentRouter.post('/upload', authMiddleware, verifyAdmin, upload.single('file'), uploadDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     summary: Editar documento (Solo admin)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento a editar
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Nuevo archivo (opcional)
 *     responses:
 *       200:
 *         description: Documento actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Documento no encontrado
 *       403:
 *         description: Acceso denegado
 *   delete:
 *     summary: Eliminar documento (Solo admin)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Documento no encontrado
 *       403:
 *         description: Acceso denegado
 *   get:
 *     summary: Obtener documento por ID
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Documento no encontrado
 *       401:
 *         description: No autorizado
 */
documentRouter.put('/:id', authMiddleware, verifyAdmin, upload.single('file'), editDocument);
documentRouter.delete('/:id', authMiddleware, verifyAdmin, removeDocument);

/**
 * @swagger
 * /api/documents/restore/{id}:
 *   patch:
 *     summary: Restaurar documento eliminado (Solo admin)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento a restaurar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento restaurado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Documento no encontrado
 *       403:
 *         description: Acceso denegado
 */
documentRouter.patch('/restore/:id', authMiddleware, verifyAdmin, restoreDocuments);

/**
 * @swagger
 * /api/documents/{id}/visibility:
 *   patch:
 *     summary: Cambiar visibilidad del documento (Solo admin)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isVisible
 *             properties:
 *               isVisible:
 *                 type: boolean
 *                 description: Nueva visibilidad del documento
 *                 example: true
 *     responses:
 *       200:
 *         description: Visibilidad actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Documento no encontrado
 *       403:
 *         description: Acceso denegado
 */
documentRouter.patch('/:id/visibility', authMiddleware, verifyAdmin, updateVisibility);

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Listar todos los documentos
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: includeDeleted
 *         schema:
 *           type: boolean
 *         description: Incluir documentos eliminados (solo admin)
 *       - in: query
 *         name: onlyVisible
 *         schema:
 *           type: boolean
 *         description: Solo documentos visibles
 *     responses:
 *       200:
 *         description: Lista de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       401:
 *         description: No autorizado
 */
// ✅ Usuarios autenticados (user, director) pueden ver y descargar
documentRouter.get('/', authMiddleware, listAllDocuments);

/**
 * @swagger
 * /api/documents/download/{id}:
 *   get:
 *     summary: Descargar documento
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del documento a descargar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Archivo descargado exitosamente
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Documento no encontrado
 *       401:
 *         description: No autorizado
 */
documentRouter.get('/:id', authMiddleware, getOneDocument);
documentRouter.get('/download/:id', authMiddleware, downloadDocument);

export default documentRouter;
