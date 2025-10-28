import { Request, Response } from 'express';
import {
  createDocument,
  listDocuments,
  getDocumentById,
  deleteDocument,
  getDocumentFile,
  restoreDocument,
  updateDocumentVisibility,
  updateDocument,
} from '../services/documentService';

// ===== Subir documento =====
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    
    const file = req.file as Express.Multer.File | undefined;
    const { name, description, category, visibleTo } = req.body;

    if (!file)
      return res.status(400).json({ message: 'Archivo (field "file") es requerido' });
    if (!name)
      return res.status(400).json({ message: 'El campo "name" es requerido' });
    if (!category)
      return res.status(400).json({ message: 'El campo "category" es requerido' });

    const allowedRoles = ['admin', 'director', 'user'];
    const parsedVisibleTo = Array.isArray(visibleTo) && visibleTo.length > 0
      ? visibleTo.filter((role: string) => allowedRoles.includes(role))
      : ['admin', 'director', 'user']; // Valor por defecto

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
      visibleTo: parsedVisibleTo,
    });

    return res.status(201).json({
      message: 'Documento subido exitosamente',
      data: doc,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error al subir documento' });
  }
};

// ===== Listar documentos =====
export const listAllDocuments = async (req: Request, res: Response) => {
  try {
    const filters: any = {};

    if (req.query.category) filters.category = req.query.category;
    if (req.query.name) filters.name = req.query.name;
    if (req.query.status) filters.status = req.query.status;

    const userRole = (req as any)?.user?.role;
    const isAdmin = (req as any)?.user?.isAdmin || false;

    const docs = await listDocuments(filters, userRole, isAdmin);

    return res.status(200).json({
      message: 'Documentos obtenidos correctamente',
      data: docs,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error al listar documentos' });
  }
};

// ===== Obtener documento por ID =====
export const getOneDocument = async (req: Request, res: Response) => {
  try {

    const userRole = (req as any)?.user?.role;
    const isAdmin = (req as any)?.user?.isAdmin || false;

    const doc = await getDocumentById(req.params.id, userRole, isAdmin);
    if (!doc)
      return res.status(404).json({ message: 'Documento no encontrado o sin permiso de visualización' });

    return res.status(200).json({
      message: 'Documento obtenido correctamente',
      data: doc,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error al obtener documento' });
  }
};

//Actualizar visibilidad de documento
export const updateVisibility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { visibleTo } = req.body; //Array de roles

    if (!Array.isArray(visibleTo) || visibleTo.length === 0) {
      return res.status(400).json({ message: 'Debe especificar al menos un rol válido en visibleTo' });
    }

    const updateDoc = await updateDocumentVisibility(id, visibleTo);
    if (!updateDoc) {
      return res.status(404).json({ message: 'Documento no encontrado o ya eliminado' });
    }
    return res.status(200).json({
      message: 'Visibilidad de documento actualizada correctamente',
      data: updateDoc,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar visibilidad de documento' });
  }
};

// ===== Actualizar documentos =====
export const editDocument = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File | undefined;
    const data = req.body;

    const updatedDoc = await updateDocument(req.params.id, data, file);

    if (!updatedDoc)
      return res.status(404).json({ message: 'Documento no encontrado o ya eliminado' });

    return res.status(200).json({
      message: 'Documento actualizado correctamente',
      data: updatedDoc,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar documento' });
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
    return res.status(500).json({ message: 'Error interno al descargar documento' });
  }
};