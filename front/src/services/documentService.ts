/**
 * Servicio para gestión de documentos
 */

import api from './api';
import type { IDocument, DocumentUploadData, DocumentUpdateData, DocumentFilters } from '../types/document';

interface DocumentResponse {
  message: string;
  data: IDocument;
}

interface DocumentsResponse {
  message: string;
  data: IDocument[];
}

/**
 * Subir nuevo documento (Solo Admin)
 */
export const uploadDocument = async (data: DocumentUploadData): Promise<IDocument> => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('name', data.name);
  if (data.description) {
    formData.append('description', data.description);
  }
  formData.append('category', data.category);
  data.visibleTo.forEach(role => {
    formData.append('visibleTo[]', role);
  });

  const response = await api.post<DocumentResponse>('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

/**
 * Listar documentos (filtrado por backend según rol)
 */
export const getDocuments = async (filters?: DocumentFilters): Promise<IDocument[]> => {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.name) params.append('name', filters.name);
  if (filters?.status) {
    params.append('status', filters.status);
  }
  // Si no se especifica status, el backend devuelve automáticamente
  // los documentos según los permisos del usuario

  const response = await api.get<DocumentsResponse>(`/documents?${params.toString()}`);
  return response.data.data;
};

/**
 * Obtener documento por ID
 */
export const getDocumentById = async (id: string): Promise<IDocument> => {
  const response = await api.get<DocumentResponse>(`/documents/${id}`);
  return response.data.data;
};

/**
 * Actualizar documento (Solo Admin)
 */
export const updateDocument = async (id: string, data: DocumentUpdateData): Promise<IDocument> => {
  const formData = new FormData();
  if (data.name) formData.append('name', data.name);
  if (data.description) formData.append('description', data.description);
  if (data.category) formData.append('category', data.category);
  if (data.visibleTo) {
    data.visibleTo.forEach(role => {
      formData.append('visibleTo[]', role);
    });
  }
  if (data.file) {
    formData.append('file', data.file);
  }

  const response = await api.put<DocumentResponse>(`/documents/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

/**
 * Actualizar visibilidad del documento (Solo Admin)
 */
export const updateDocumentVisibility = async (
  id: string,
  visibleTo: IDocument['visibleTo']
): Promise<IDocument> => {
  const response = await api.patch<DocumentResponse>(`/documents/${id}/visibility`, {
    visibleTo,
  });
  return response.data.data;
};

/**
 * Eliminar documento - Soft Delete (Solo Admin)
 */
export const deleteDocument = async (id: string): Promise<string> => {
  const response = await api.delete<{ message: string; data: string }>(`/documents/${id}`);
  return response.data.data;
};

/**
 * Restaurar documento eliminado (Solo Admin)
 */
export const restoreDocument = async (id: string): Promise<string> => {
  const response = await api.patch<{ message: string; data: string }>(`/documents/restore/${id}`);
  return response.data.data;
};

/**
 * Obtener URL de descarga del documento
 */
export const getDocumentDownloadUrl = (id: string): string => {
  return `${api.defaults.baseURL}/documents/download/${id}`;
};

/**
 * Descargar/Ver documento (mantiene autenticación)
 * - PDFs: Abre en nueva pestaña
 * - Otros archivos: Descarga
 */
export const downloadDocument = async (id: string, mimeType: string, filename?: string): Promise<void> => {
  try {
    const response = await api.get(`/documents/download/${id}`, {
      responseType: 'blob',
    });

    // Crear URL del blob con el tipo MIME correcto
    const blob = new Blob([response.data as BlobPart], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    
    // Si es PDF, abrir en nueva pestaña
    if (mimeType === 'application/pdf') {
      window.open(url, '_blank');
      // Limpiar después de un delay para que la pestaña se abra correctamente
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } else {
      // Para otros archivos, descargar
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `documento-${id}`;
      
      // Agregar al DOM temporalmente y hacer click
      document.body.appendChild(link);
      link.click();
      
      // Limpiar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
};

