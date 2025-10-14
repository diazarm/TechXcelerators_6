import path from 'path';
import fs from 'fs/promises';
import DocumentModel, { DocumentType } from '../models/Document';

// ===== Crear documento =====
export const createDocument = async (data: Partial<DocumentType>) => {
  const doc = new DocumentModel(data);
  return await doc.save();
};

// ===== Listar documentos =====
export const listDocuments = async (filters: Partial<DocumentType> = {}) => {
  const query: any = { isDeleted: false }; // ✅ Ignora eliminados
  
  if (filters.category) query.category = filters.category;
  if(filters.name) query.name = new RegExp(filters.name, 'i');

  return await DocumentModel.find(query).sort({ uploadDate: -1 });
  
};

// ===== Obtener documento por ID =====
export const getDocumentById = async (id: string) => {
  return await DocumentModel.findOne({ _id: id, isDeleted: false });
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
export const getDocumentFile = async (id: string) => {
  const doc = await DocumentModel.findOne({ _id: id, isDeleted: false });
  if (!doc) return null;

  const absolutePath = path.join(process.cwd(), doc.filePath);
  try {
    await fs.access(absolutePath); // Verifica que el archivo existe
    return { doc, absolutePath };
  } catch {
    return null; // Archivo no encontrado en el sistema
  }
};
