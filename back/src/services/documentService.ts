import path from 'path';
import fs from 'fs/promises';
import Document from '../models/Document';

// ===== Crear documento =====
export const createDocument = async (data: any) => {
  const doc = new Document(data);
  return await doc.save();
};

// ===== Listar documentos =====
export const listDocuments = async (filters: any = {}) => {
  const { search, type, page = 1, limit = 20 } = filters;
  const query: Record<string, any> = { isDeleted: false }; // ✅ Ignora eliminados

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (type) {
    query.type = type.includes('/')
      ? type
      : { $regex: `^${type}/`, $options: 'i' };
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Document.find(query).sort({ uploadDate: -1 }).skip(skip).limit(limit),
    Document.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    },
  };
};

// ===== Obtener documento por ID =====
export const getDocumentById = async (id: string) => {
  return await Document.findOne({ _id: id, isDeleted: false });
};

// ===== Soft delete =====
export const deleteDocumentById = async (id: string) => {
  const doc = await Document.findById(id);
  if (!doc) return null;

  doc.isDeleted = true; // ✅ Soft delete
  await doc.save();

  return doc;
};
