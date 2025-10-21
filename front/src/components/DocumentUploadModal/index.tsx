import React, { useState, useCallback, useRef } from 'react';
import { X, Upload, FileText, FileMinus, File, AlertTriangle } from 'react-feather';
import { useScreenSize } from '../../context';
import { useResponsive, useFocusTrap, useEscapeKey } from '../../hooks';
import { Button } from '../Button';
import { useDocumentActions } from '../../hooks/useDocumentActions';
import { showNotification } from '../../services';
import type { DocumentUploadData, IDocument } from '../../types/document';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { scale } = useScreenSize();
  const { handleUpload, uploadLoading } = useDocumentActions();
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    category: IDocument['category'];
    visibleTo: ('director' | 'user')[];
  }>({
    name: '',
    description: '',
    category: 'manual',
    visibleTo: ['director', 'user'], // Admin se agrega automáticamente
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useFocusTrap(modalRef, isOpen);
  useEscapeKey(isOpen, onClose);
  useResponsive();

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
        setSelectedFile(file);
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
        setSelectedFile(file);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVisibilityToggle = (role: 'director' | 'user') => {
    setFormData((prev) => {
      const newVisibleTo = prev.visibleTo.includes(role)
        ? prev.visibleTo.filter((r) => r !== role)
        : [...prev.visibleTo, role];
      return { ...prev, visibleTo: newVisibleTo };
    });
  };

  const handleCloseModal = () => {
    if (!uploadLoading) {
      onClose();
      setFormData({
        name: '',
        description: '',
        category: 'manual',
        visibleTo: ['director', 'user'],
      });
      setSelectedFile(null);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Debes seleccionar un archivo');
      return;
    }

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    // No es necesario validar visibleTo ya que admin siempre se agrega automáticamente

    // Admin siempre tiene acceso - se agrega automáticamente
    const visibleToWithAdmin: ('admin' | 'director' | 'user')[] = ['admin', ...formData.visibleTo];
    
    const uploadData: DocumentUploadData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      visibleTo: visibleToWithAdmin,
      file: selectedFile,
    };

    const result = await handleUpload(uploadData);
    if (result) {
      await onSuccess();
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
        aria-labelledby="document-upload-modal-title"
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
                <Upload size={scale(20)} className="text-white" />
              </div>
              <h2 
                id="document-upload-modal-title"
                className="text-white font-semibold"
                style={{ fontSize: scale(18) }}
              >
                Subir Documento
              </h2>
            </div>
            <button
              onClick={handleCloseModal}
              disabled={uploadLoading}
              className="text-white/80 hover:text-white transition-colors duration-200 p-1"
              style={{
                background: 'none',
                border: 'none',
                cursor: uploadLoading ? 'not-allowed' : 'pointer',
                opacity: uploadLoading ? 0.5 : 1,
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
          {/* Drag & Drop Area */}
          <div
            className={`mt-1 flex justify-center items-center border-2 border-dashed rounded-md p-6 text-center
              ${isDragging ? 'border-[#5D5A88] bg-blue-50' : 'border-gray-300 bg-gray-50'}
              ${uploadLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{ padding: scale(16) }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploadLoading && document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept={allowedFileTypes.join(',')}
              disabled={uploadLoading}
            />
            {selectedFile ? (
              <div className="flex items-center" style={{ gap: scale(8) }}>
                {getFileTypeIcon(selectedFile.type)}
                <span className="text-gray-700" style={{ fontSize: scale(16) }}>
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            ) : (
              <p className="text-gray-500" style={{ fontSize: scale(16) }}>
                Arrastra y suelta tu archivo aquí, o haz click para seleccionar
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

          {/* Nombre del documento */}
          <div style={{ marginTop: scale(16) }}>
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
              disabled={uploadLoading}
            />
          </div>

          {/* Descripción */}
          <div style={{ marginTop: scale(16) }}>
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
              disabled={uploadLoading}
            ></textarea>
          </div>

          {/* Categoría */}
          <div style={{ marginTop: scale(16) }}>
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
              disabled={uploadLoading}
            >
              <option value="manual">Manual</option>
              <option value="informe">Informe</option>
              <option value="guia">Guía</option>
              <option value="politicas">Políticas</option>
              <option value="faqs">FAQs</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          {/* Visible para */}
          <div style={{ marginTop: scale(16) }}>
            <label
              className="block font-semibold text-gray-800"
              style={{ fontSize: scale(16), marginBottom: scale(4) }}
            >
              Visible para
            </label>
            <p className="text-gray-500 text-sm mb-2">Admin siempre tiene acceso</p>
            <div className="flex flex-wrap" style={{ gap: scale(12) }}>
              {['director', 'user'].map((role) => {
                const isChecked = formData.visibleTo.includes(role as 'director' | 'user');
                return (
                  <div
                    key={role}
                    onClick={() => !uploadLoading && handleVisibilityToggle(role as 'director' | 'user')}
                    className={`inline-flex items-center cursor-pointer ${uploadLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ fontSize: scale(14) }}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isChecked
                          ? 'bg-green-500 border-green-500'
                          : 'bg-white border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-2 text-gray-700 font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  </div>
                );
              })}
            </div>
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
            disabled={uploadLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={uploadLoading || !selectedFile}
          >
            {uploadLoading ? 'Subiendo...' : 'Subir Documento'}
          </Button>
        </div>
      </div>
    </div>
  );
};