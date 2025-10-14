import { Request, Response } from 'express';
import {
  createDocument,
  listDocuments,
  getDocumentById,
  deleteDocumentById,
} from '../services/documentService';

// ===== Subir documento =====
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File | undefined;
    const { name, description } = req.body;

    if (!file)
      return res.status(400).json({ message: 'Archivo (field "file") es requerido' });
    if (!name)
      return res.status(400).json({ message: 'El campo "name" es requerido' });

    const doc = await createDocument({
      name,
      description,
      type: file.mimetype,
      url: `/uploads/${file.filename}`,
      filePath: `uploads/${file.filename}`,
      uploadedBy: (req as any)?.user?.id || 'admin',
      size: file.size,
      originalName: file.originalname,
    });

    return res.status(201).json({
      message: 'Documento subido exitosamente',
      data: doc,
    });
  } catch (err) {
    console.error('[uploadDocument]', err);
    return res.status(500).json({ message: 'Error al subir documento' });
  }
};

// ===== Listar documentos =====
export const listAllDocuments = async (_req: Request, res: Response) => {
  try {
    const result = await listDocuments();
    return res.status(200).json({
      message: 'Documentos obtenidos correctamente',
      data: result,
    });
  } catch (err) {
    console.error('[listAllDocuments]', err);
    return res.status(500).json({ message: 'Error al listar documentos' });
  }
};

// ===== Obtener documento por ID =====
export const getOneDocument = async (req: Request, res: Response) => {
  try {
    const doc = await getDocumentById(req.params.id);
    if (!doc)
      return res.status(404).json({ message: 'Documento no encontrado' });

    return res.status(200).json({
      message: 'Documento obtenido correctamente',
      data: doc,
    });
  } catch (err) {
    console.error('[getOneDocument]', err);
    return res.status(500).json({ message: 'Error al obtener documento' });
  }
};

// ===== Eliminar documento (soft delete) =====
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const doc = await deleteDocumentById(req.params.id);
    if (!doc)
      return res.status(404).json({ message: 'Documento no encontrado' });

    return res.status(200).json({
      message: 'Documento eliminado correctamente (soft delete)',
      data: doc,
    });
  } catch (err) {
    console.error('[deleteDocument]', err);
    return res.status(500).json({ message: 'Error al eliminar documento' });
  }
};
