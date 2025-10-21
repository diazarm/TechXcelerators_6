import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Edit3, FileText, FileMinus, File, AlertTriangle } from 'react-feather';
import { useScreenSize } from '../../context';
import { useResponsive, useFocusTrap, useEscapeKey } from '../../hooks';
import { Button } from '../Button';
import { useDocumentActions } from '../../hooks/useDocumentActions';
import { showNotification } from '../../services';
import type { IDocument, DocumentUpdateData } from '../../types/document';

interface DocumentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: IDocument;
  onSuccess: () => void;
}

export const DocumentEditModal: React.FC<DocumentEditModalProps> = ({
  isOpen,
  onClose,
  document,
  onSuccess,
}) => {
  const { scale } = useScreenSize();
  const { handleUpdate, updateLoading } = useDocumentActions();
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<Omit<DocumentUpdateData, 'file' | 'visibleTo'>>({
    name: document.name,
    description: document.description || '',
    category: document.category,
  });
  const [newFile, setNewFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useFocusTrap(modalRef, isOpen);
  useEscapeKey(isOpen, onClose);
  useResponsive();

  useEffect(() => {
    if (isOpen && document) {
      setFormData({
        name: document.name,
        description: document.description || '',
        category: document.category,
      });
      setNewFile(null);
      setError(null);
    }
  }, [isOpen, document]);

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];
  const maxFileSizeMB = 20;

  const validateFile = (file: File) => {
    if (!allowedFileTypes.includes(file.type)) {
      setError('Tipo de archivo no permitido. Solo PDF, Word, TXT.');
      return false;
    }
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`El archivo excede el tamaño máximo de ${maxFileSizeMB} MB.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setNewFile(file);
      }
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setNewFile(file);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleCloseModal = () => {
    if (!updateLoading) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    setError(null);
    
    const updateData: DocumentUpdateData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      file: newFile || undefined,
    };

    const result = await handleUpdate(document._id, updateData);
    if (result) {
      onSuccess();
      handleCloseModal();
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const getFileTypeIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) {
      return <FileText size={scale(24)} className="text-red-500" />;
    }
    if (mimeType.includes('word')) {
      return <FileMinus size={scale(24)} className="text-blue-500" />;
    }
    if (mimeType.includes('text')) {
      return <File size={scale(24)} className="text-gray-500" />;
    }
    return <File size={scale(24)} className="text-gray-500" />;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-edit-modal-title"
        className="bg-white shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col"
        style={{ 
          borderRadius: scale(16),
          maxWidth: scale(600),
          width: '100%',
          maxHeight: '90vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente como los modales existentes */}
        <div 
          className="relative bg-gradient-to-br from-[#5D5A88] via-[#6B6A9A] to-[#7C7BA8]"
          style={{
            padding: scale(16),
            borderRadius: `${scale(16)} ${scale(16)} 0 0`
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: scale(8) }}>
              <div 
                className="bg-white/20 rounded-full p-2"
                style={{ padding: scale(8) }}
              >
                <Edit3 size={scale(20)} className="text-white" />
              </div>
              <h2 
                id="document-edit-modal-title"
                className="text-white font-semibold"
                style={{ fontSize: scale(18) }}
              >
                Editar Documento
              </h2>
            </div>
            <button
              onClick={handleCloseModal}
              disabled={updateLoading}
              className="text-white/80 hover:text-white transition-colors duration-200 p-1"
              style={{
                background: 'none',
                border: 'none',
                cursor: updateLoading ? 'not-allowed' : 'pointer',
                opacity: updateLoading ? 0.5 : 1,
              }}
              aria-label="Cerrar modal"
            >
              <X size={scale(20)} />
            </button>
          </div>
        </div>

        {/* Body - Form */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} style={{ padding: scale(24) }}>
          {/* Archivo actual */}
          <div style={{ marginBottom: scale(16) }}>
            <label className="block font-medium text-gray-700" style={{ fontSize: scale(16), marginBottom: scale(4) }}>
              Archivo Actual
            </label>
            <div className="flex items-center bg-gray-50 rounded-md" style={{ gap: scale(8), padding: scale(8) }}>
              {getFileTypeIcon(document.type)}
              <span className="text-gray-700" style={{ fontSize: scale(14) }}>
                {document.name} ({document.size ? `${(document.size / 1024 / 1024).toFixed(1)} MB` : 'N/A'})
              </span>
            </div>
          </div>

          {/* Reemplazar archivo */}
          <div style={{ marginBottom: scale(16) }}>
            <label
              htmlFor="file-upload"
              className="block font-medium text-gray-700"
              style={{ fontSize: scale(16), marginBottom: scale(4) }}
            >
              Reemplazar Archivo (opcional)
            </label>
            <div
              className={`mt-1 flex justify-center items-center border-2 border-dashed rounded-md p-6 text-center
                ${isDragging ? 'border-[#5D5A88] bg-blue-50' : 'border-gray-300 bg-gray-50'}
                ${updateLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{ padding: scale(16) }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !updateLoading && document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept={allowedFileTypes.join(',')}
                disabled={updateLoading}
              />
              {newFile ? (
                <div className="flex items-center" style={{ gap: scale(8) }}>
                  {getFileTypeIcon(newFile.type)}
                  <span className="text-gray-700" style={{ fontSize: scale(16) }}>
                    {newFile.name} ({(newFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              ) : (
                <p className="text-gray-500" style={{ fontSize: scale(16) }}>
                  Arrastra y suelta tu nuevo archivo aquí, o haz click para seleccionar
                </p>
              )}
            </div>
            {error && (
              <p
                className="text-red-500 flex items-center"
                style={{ fontSize: scale(14), marginTop: scale(4), gap: scale(4) }}
              >
                <AlertTriangle size={scale(14)} /> {error}
              </p>
            )}
          </div>

          {/* Nombre del documento */}
          <div style={{ marginBottom: scale(16) }}>
            <label
              htmlFor="name"
              className="block font-medium text-gray-700"
              style={{ fontSize: scale(16), marginBottom: scale(4) }}
            >
              Nombre del Documento
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa el nombre del documento..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#5D5A88] focus:border-[#5D5A88] bg-white text-gray-900 placeholder-gray-500"
              style={{ padding: scale(8), fontSize: scale(16) }}
              disabled={updateLoading}
            />
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: scale(16) }}>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
              style={{ fontSize: scale(16), marginBottom: scale(4) }}
            >
              Descripción (opcional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe el contenido del documento..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#5D5A88] focus:border-[#5D5A88] bg-white text-gray-900 placeholder-gray-500"
              style={{ padding: scale(8), fontSize: scale(16) }}
              disabled={updateLoading}
            ></textarea>
          </div>

          {/* Categoría */}
          <div style={{ marginBottom: scale(16) }}>
            <label
              htmlFor="category"
              className="block font-medium text-gray-700"
              style={{ fontSize: scale(16), marginBottom: scale(4) }}
            >
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#5D5A88] focus:border-[#5D5A88] bg-white text-gray-900"
              style={{ padding: scale(8), fontSize: scale(16) }}
              disabled={updateLoading}
            >
              <option value="manual">Manual</option>
              <option value="informe">Informe</option>
              <option value="guia">Guía</option>
              <option value="politicas">Políticas</option>
              <option value="faqs">FAQs</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50" style={{ padding: scale(16) }}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCloseModal}
            disabled={updateLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={updateLoading}
          >
            {updateLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </div>
  );
};