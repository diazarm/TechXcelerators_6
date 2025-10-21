/**
 * Types para el módulo de Documentos
 */

export interface IDocument {
  _id: string;
  name: string;
  description?: string;
  category: 'manual' | 'informe' | 'guia' | 'politicas' | 'faqs' | 'otros';
  type: string; // MIME type (e.g., application/pdf)
  url: string; // /uploads/<file>
  filePath: string;
  uploadDate: Date;
  uploadedBy?: string;
  size?: number; // bytes
  originalName?: string;
  isDeleted: boolean;
  visibleTo: ('admin' | 'director' | 'user')[];
}

export interface DocumentUploadData {
  name: string;
  description?: string;
  category: IDocument['category'];
  visibleTo: IDocument['visibleTo'];
  file: File;
}

export interface DocumentUpdateData {
  name?: string;
  description?: string;
  category?: IDocument['category'];
  visibleTo?: IDocument['visibleTo'];
  file?: File;
}

export interface DocumentFilters {
  category?: IDocument['category'];
  name?: string;
  status?: 'active' | 'deleted';
}

