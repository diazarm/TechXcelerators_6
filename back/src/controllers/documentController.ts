import { Request, Response } from 'express';
import {
  createDocument,
  listDocuments,
  getDocumentById,
  deleteDocument,
  getDocumentFile,
  restoreDocument,
} from '../services/documentService';

// ===== Subir documento =====
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File | undefined;
    const { name, description, category } = req.body;

    if (!file)
      return res.status(400).json({ message: 'Archivo (field "file") es requerido' });
    if (!name)
      return res.status(400).json({ message: 'El campo "name" es requerido' });
    if (!category)
      return res.status(400).json({ message: 'El campo "category" es requerido' });

    const doc = await createDocument({
      name,
      description,
      category,
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
export const listAllDocuments = async (req: Request, res: Response) => {
  try {
    const filters: any = {};

    if (req.query.category) filters.category = req.query.category;
    if (req.query.name) filters.name = req.query.name;

    const docs = await listDocuments(filters);
    return res.status(200).json({message: 'Documentos obtenidos correctamente', data: docs });
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
export const removeDocument = async (req: Request, res: Response) => {
  try {
    const deletedDoc = await deleteDocument(req.params.id);
    if (!deletedDoc)
      return res.status(404).json({ message: 'Documento no encontrado' });

    return res.status(200).json({
      message: 'Documento eliminado correctamente (soft delete)',
      data: deletedDoc,
    });
  } catch (err) {
    console.error('[removeDocument]', err);
    return res.status(500).json({ message: 'Error al eliminar documento' });
  }
};

//Restaurar documento 
export const restoreDocuments = async (req: Request, res: Response) => {
  try {
    const restored = await restoreDocument(req.params.id);
    if (!restored)
      return res.status(404).json({ message: 'Documento no encontrado o no está eliminado' });  

    return res.status(200).json({
      message: 'Documento restaurado correctamente',
      data: restored,
    });
  } catch (err) {
    console.error('[restoreDocument]', err);
    return res.status(500).json({ message: 'Error al restaurar documento' });
  }
};

// ===== Descargar documento =====
export const downloadDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getDocumentFile(id);

    if (!result)
      return res.status(404).json({ message: 'Documento o archivo no encontrado' });

    const { doc, absolutePath } = result;
    return res.download(absolutePath, doc.originalName || 'documento.pdf', (err) => {
      if (err) {
        console.error('[downloadDocument]', err);
        res.status(500).json({ message: 'Error al descargar el archivo' });
      }
    });
  } catch (err) {
    console.error('[downloadDocument]', err);
    return res.status(500).json({ message: 'Error interno al descargar documento' });
  }
};