import DocumentModel, { DocumentType } from '../models/Document';
import cloudinary from '../config/cloudinary.config';
import { Response } from 'express';
import axios from 'axios';


// ===== Crear documento =====
export const createDocument = async (data: Partial<DocumentType>) => {
  const doc = new DocumentModel(data);
  return await doc.save();
};

// ===== Listar documentos =====
export const listDocuments = async (filters: Partial<DocumentType> = {}, userRole?: string, isAdmin?: boolean) => {
  const query: any = {};

  // Determinar estado (activo o eliminado)
  const status = (filters as any).status || 'active';
  query.isDeleted = status === 'deleted' ? true : false;

  if (filters.category) query.category = filters.category;
  if (filters.name) query.name = new RegExp(filters.name, 'i');

  // Solo admin puede ver archivos eliminados
  if (!isAdmin) {
    query.isDeleted = false;
    if (userRole) query.visibleTo = { $in: [userRole] };
  }

  return await DocumentModel.find(query).sort({ uploadDate: -1 });
};

// ===== Obtener documento por ID =====
export const getDocumentById = async (id: string, userRole?: string, isAdmin?: boolean) => {
  const query: any = { _id: id, isDeleted: false };
  //Si no es admin, solo mostrar documentos visibles para su rol
  if (!isAdmin && userRole) {
    query.visibleTo = { $in: [userRole] };
  }
  return await DocumentModel.findOne(query);
};

// ===== Actualizar visibilidad =====
export const updateDocumentVisibility = async (id: string, visibleTo: string[]) => {
  const allowedRoles = ['admin', 'director', 'user'];
  // Validar roles
  const invalidRoles = visibleTo.filter(role => !allowedRoles.includes(role));
  if (invalidRoles.length > 0) {
    throw new Error(`Roles inválidos en visibleTo: ${invalidRoles.join(', ')}`);
  }

  //Buscar y actualizar documento
  const doc = await DocumentModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { visibleTo },
    { new: true }
  );
  return doc;
};

// ===== Actualizar documento =====
export const updateDocument = async (id: string, data: Partial<DocumentType>, newFile?: Express.Multer.File) => {
  const doc = await DocumentModel.findById(id);
  if (!doc || doc.isDeleted) return null;

  if (newFile) {
    try {
      // Eliminar archivo antiguo en Cloudinary
      if (doc.publicId) {
        await cloudinary.uploader.destroy(`scala_documents/${doc.publicId}`, { resource_type: 'raw' });
      }

      // Generar URL pública para el nuevo archivo
      const cloudUrl = cloudinary.url(newFile.filename, {
        folder: 'scala_documents',
        resource_type: 'raw',
        secure: true,
      });

      doc.type = newFile.mimetype;
      doc.url = cloudUrl;
      doc.size = newFile.size;
      doc.originalName = newFile.originalname;
      doc.publicId = newFile.filename;
    } catch (err) {
      console.warn(`No se pudo eliminar archivo antiguo: ${doc.url}`);
    }
  }

  if (data.name) doc.name = data.name;
  if (data.description) doc.description = data.description;
  if (data.category) doc.category = data.category;
  if (data.visibleTo) doc.visibleTo = data.visibleTo;

  await doc.save();
  return doc;
};

// ===== Soft delete =====
export const deleteDocument = async (id: string) => {
  //Busca el documento que NO esté eliminado
  const doc = await DocumentModel.findOne({ _id: id, isDeleted: false });
  if (!doc) return null;
  doc.isDeleted = true;
  await doc.save();
  return doc._id;
};

//Restaurar documento (si es necesario)
export const restoreDocument = async (id: string) => {
  const doc = await DocumentModel.findOne({ _id: id, isDeleted: true });
  if (!doc) return null;
  doc.isDeleted = false;
  await doc.save();
  return doc._id;
};

// ===== Descargar documento =====
export const getDocumentFile = async (id: string, res: Response) => {
  const doc = await DocumentModel.findOne({ _id: id, isDeleted: false });
  if (!doc) return res.status(404).json({ message: 'Documento no encontrado' });

  try {
    // Hacer la petición a Cloudinary (resource_type: 'raw') y obtener el archivo como binario
    const fileResponse = await axios.get(doc.url, {
      responseType: 'arraybuffer',
      timeout: 10000
    });

    // Reenviar el archivo al cliente con el tipo MIME correcto
    res.setHeader('Content-Type', doc.type || 'application/octet-stream');

    // Si es PDF -> mostrar en navegador
    if (doc.type === 'application/pdf') {
      res.setHeader('Content-Disposition', `inline; filename="${doc.originalName}"`);
    } else {
      // Otros archivos -> forzar descarga
      res.setHeader('Content-Disposition', `attachment; filename="${doc.originalName}"`);
    }

    // Enviar el contenido binario
    return res.send(fileResponse.data);

  } catch (err) {
    console.error('Error descargando archivo desde Cloudinary:', err);
    return res.status(500).json({ message: 'Error al obtener archivo desde Cloudinary' });
  }
};
