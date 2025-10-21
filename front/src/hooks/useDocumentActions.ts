/**
 * Hook para acciones CRUD de documentos
 */

import { useState } from 'react';
import {
  uploadDocument,
  updateDocument,
  deleteDocument,
  restoreDocument,
  downloadDocument as downloadDocumentService,
} from '../services';
import { useNotification } from './useNotification';
import type { DocumentUploadData, DocumentUpdateData } from '../types/document';

interface UseDocumentActionsReturn {
  uploadLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  restoreLoading: boolean;
  handleUpload: (data: DocumentUploadData) => Promise<boolean>;
  handleUpdate: (id: string, data: DocumentUpdateData) => Promise<boolean>;
  handleDelete: (id: string, name: string) => Promise<boolean>;
  handleRestore: (id: string, name: string) => Promise<boolean>;
  handleDownload: (id: string, name: string, mimeType: string) => Promise<void>;
}

export const useDocumentActions = (): UseDocumentActionsReturn => {
  const { showNotification } = useNotification();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);

  /**
   * Subir nuevo documento
   */
  const handleUpload = async (data: DocumentUploadData): Promise<boolean> => {
    try {
      setUploadLoading(true);
      await uploadDocument(data);
      showNotification('Documento subido exitosamente', 'success');
      return true;
    } catch (error: unknown) {
      console.error('[useDocumentActions] Error uploading document:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al subir documento';
      showNotification(errorMessage, 'error');
      return false;
    } finally {
      setUploadLoading(false);
    }
  };

  /**
   * Actualizar documento
   */
  const handleUpdate = async (
    id: string,
    data: DocumentUpdateData
  ): Promise<boolean> => {
    try {
      setUpdateLoading(true);
      await updateDocument(id, data);
      showNotification('Documento actualizado exitosamente', 'success');
      return true;
    } catch (error: unknown) {
      console.error('[useDocumentActions] Error updating document:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al actualizar documento';
      showNotification(errorMessage, 'error');
      return false;
    } finally {
      setUpdateLoading(false);
    }
  };

  /**
   * Eliminar documento (soft delete)
   */
  const handleDelete = async (id: string, name: string): Promise<boolean> => {
    try {
      setDeleteLoading(true);
      await deleteDocument(id);
      showNotification(`Documento "${name}" desactivado exitosamente`, 'success');
      return true;
    } catch (error: unknown) {
      console.error('[useDocumentActions] Error deleting document:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al desactivar documento';
      showNotification(errorMessage, 'error');
      return false;
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * Restaurar documento eliminado
   */
  const handleRestore = async (id: string, name: string): Promise<boolean> => {
    try {
      setRestoreLoading(true);
      await restoreDocument(id);
      showNotification(`Documento "${name}" restaurado exitosamente`, 'success');
      return true;
    } catch (error: unknown) {
      console.error('[useDocumentActions] Error restoring document:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al restaurar documento';
      showNotification(errorMessage, 'error');
      return false;
    } finally {
      setRestoreLoading(false);
    }
  };

  /**
   * Descargar/Ver documento
   */
  const handleDownload = async (id: string, name: string, mimeType: string): Promise<void> => {
    try {
      await downloadDocumentService(id, mimeType, name);
      if (mimeType === 'application/pdf') {
        showNotification(`Abriendo "${name}"`, 'info');
      } else {
        showNotification(`Descargando "${name}"`, 'info');
      }
    } catch (error) {
      console.error('[useDocumentActions] Error downloading document:', error);
      showNotification('Error al descargar documento', 'error');
    }
  };

  return {
    uploadLoading,
    updateLoading,
    deleteLoading,
    restoreLoading,
    handleUpload,
    handleUpdate,
    handleDelete,
    handleRestore,
    handleDownload,
  };
};

