/**
 * Componente para gestión de documentos
 * Siguiendo la misma estructura de UserManagement
 */

import React, { useState, useMemo } from 'react';
import { FileText, Upload, RotateCcw, File, FileMinus, Download, Edit, EyeOff } from 'react-feather';
import { useScreenSize } from '../../context';
import { useAuth } from '../../hooks';
import { useDocuments } from '../../hooks/useDocuments';
import { useDocumentActions } from '../../hooks/useDocumentActions';
import { DocumentTableHeader, DocumentTableRow, DocumentTableEmpty } from '../DocumentTable';
import { PaginationControls } from '../PaginationControls';
import { DocumentUploadModal } from '../DocumentUploadModal';
import { DocumentEditModal } from '../DocumentEditModal';
import { DocumentDeleteModal } from '../DocumentDeleteModal';
import { DocumentRestoreModal } from '../DocumentRestoreModal';
import { Button } from '../Button';
import LoadingSpinner from '../LoadingSpinner';
import type { IDocument } from '../../types/document';

interface DocumentManagementProps {
  className?: string;
}

/**
 * Componente para gestión y visualización de documentos.
 * Admin: CRUD completo, User/Director: Solo ver y descargar
 */
export const DocumentManagement: React.FC<DocumentManagementProps> = ({
  className = '',
}) => {
  const { scale, isMobile, isTablet } = useScreenSize();
  // Breakpoint: < 1024px = cards (móvil + tablet), >= 1024px = tabla (desktop)
  const showMobileView = isMobile || isTablet;
  const { user } = useAuth();
  const isAdmin = user?.isAdmin || false;

  // Estado para modales
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);
  // Hooks - Lógica simplificada para admin
  const {
    documents,
    loading,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    handlePageChange,
    refetch,
    isAdmin: hookIsAdmin,
    categoryFilter,
    handleCategoryFilterChange,
  } = useDocuments(showMobileView ? 5 : 10);


  const { 
    uploadLoading,
    updateLoading,
    deleteLoading,
    restoreLoading,
    handleUpload,
    handleUpdate,
    handleDelete,
    handleRestore,
    handleDownload 
  } = useDocumentActions();

  // Handlers
  const handleView = (document: IDocument) => {
    handleDownload(document._id, document.name, document.type);
  };

  const handleEdit = (document: IDocument) => {
    setSelectedDocument(document);
    setShowEditModal(true);
  };

  const handleDeleteClick = (document: IDocument) => {
    setSelectedDocument(document);
    setShowDeleteModal(true);
  };

  const handleRestoreClick = (document: IDocument) => {
    setSelectedDocument(document);
    setShowRestoreModal(true);
  };

  // Toggle de visibilidad directo - 1 click
  const handleVisibilityToggle = async (documentId: string, role: 'director' | 'user') => {
    const document = documents.find(doc => doc._id === documentId);
    if (!document) return;

    // Calcular nuevo array de visibilidad
    const currentVisibleTo = document.visibleTo.filter(r => r !== 'admin');
    const newVisibleTo = currentVisibleTo.includes(role)
      ? currentVisibleTo.filter(r => r !== role)
      : [...currentVisibleTo, role];
    
    // Admin siempre tiene acceso
    const visibleToWithAdmin: ('admin' | 'director' | 'user')[] = ['admin', ...newVisibleTo];

    // Actualizar documento
    const updateData = {
      name: document.name,
      description: document.description || '',
      category: document.category,
      visibleTo: visibleToWithAdmin,
    };

    const result = await handleUpdate(documentId, updateData);
    if (result) {
      refetch(); // Refrescar lista
    }
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center bg-white rounded-lg shadow-sm border border-gray-100"
        style={{
          minHeight: scale(96),
          padding: scale(24),
          marginBottom: scale(24),
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header: Título y botones en la misma línea */}
      <div className={`flex items-center justify-between mb-4 gap-3 ${showMobileView ? 'flex-col items-start' : 'flex-row'}`}>
        <p className="text-gray-600 text-sm flex-1" style={{ lineHeight: '1.6' }}>
          {isAdmin 
            ? 'Gestiona documentos del sistema: manuales, informes, guías y más'
            : 'Visualiza y descarga los documentos disponibles del sistema'
          }
        </p>

        {/* Botones de acción (solo admin) */}
        {isAdmin && (
          <div className={`flex items-center gap-2 flex-shrink-0 ${showMobileView ? 'w-full' : ''}`}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowUploadModal(true)}
              iconLeft={<Upload size={showMobileView ? scale(14) : scale(16)} />}
              title="Subir Documento"
              className={showMobileView ? 'flex-1 text-xs px-2' : ''}
            >
              {showMobileView ? 'Subir' : 'Subir Documento'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowRestoreModal(true)}
              iconLeft={<RotateCcw size={showMobileView ? scale(14) : scale(16)} />}
              title="Restaurar Documentos"
              className={showMobileView ? 'flex-1 text-xs px-2' : ''}
            >
              {showMobileView ? 'Restaurar' : 'Restaurar Documentos'}
            </Button>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      {showMobileView ? (
        /* Vista móvil/tablet (< 1024px): Cards */
        <div className="space-y-3">
          {documents.length === 0 ? (
            <DocumentTableEmpty message="No se encontraron documentos con los filtros aplicados." />
          ) : (
            documents.map((document) => (
              <div
                key={document._id}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Header de la card */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {document.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {document.category}
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Visible para (solo admin) - Badges clickeables */}
                {isAdmin && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {['director', 'user'].map((role) => {
                      const isVisible = document.visibleTo.includes(role as 'director' | 'user');
                      return (
                        <button
                          key={role}
                          onClick={() => handleVisibilityToggle(document._id, role as 'director' | 'user')}
                          disabled={document.isDeleted}
                          className={`px-2 py-1 rounded-full font-medium text-xs whitespace-nowrap transition-all duration-200 ${
                            isVisible
                              ? role === 'director' 
                                ? 'bg-orange-100 text-orange-800 border border-orange-300' 
                                : 'bg-gray-100 text-gray-800 border border-gray-300'
                              : 'bg-white text-gray-400 border border-gray-300'
                          } ${document.isDeleted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)} {isVisible ? '✓' : '✗'}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Botones de acción - Solo iconos en móvil */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleView(document)}
                    className="text-[#5D5A88] hover:text-[#FF6E00] transition-colors duration-200 bg-transparent border-none p-1 focus:outline-none focus:ring-0"
                    title="Ver/Descargar"
                  >
                    <Download size={scale(16)} />
                  </button>
                  {isAdmin && !document.isDeleted && (
                    <>
                      <button
                        onClick={() => handleEdit(document)}
                        className="text-[#5D5A88] hover:text-[#FF6E00] transition-colors duration-200 bg-transparent border-none p-1 focus:outline-none focus:ring-0"
                        title="Editar"
                      >
                        <Edit size={scale(16)} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(document)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 bg-transparent border-none p-1 focus:outline-none focus:ring-0"
                        title="Desactivar"
                      >
                        <EyeOff size={scale(16)} />
                      </button>
                    </>
                  )}
                  {isAdmin && document.isDeleted && (
                    <button
                      onClick={() => handleRestoreClick(document)}
                      className="text-green-500 hover:text-green-700 transition-colors duration-200 bg-transparent border-none p-1 focus:outline-none focus:ring-0"
                      title="Restaurar"
                    >
                      <RotateCcw size={scale(16)} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Vista desktop (>= 1024px): Tabla responsive sin scroll */
        <div
          className="bg-white rounded-lg shadow-sm border border-gray-100 w-full"
        >
          {/* Header con filtros - SIEMPRE visible */}
          <DocumentTableHeader 
            categoryFilter={categoryFilter}
            onCategoryFilterChange={handleCategoryFilterChange}
          />

          {/* Contenido de la tabla */}
          {documents.length === 0 ? (
            <DocumentTableEmpty message="No se encontraron documentos con los filtros aplicados." />
          ) : (
                <div className="w-full">
              {documents.map((document) => (
                <DocumentTableRow
                  key={document._id}
                  document={document}
                  isAdmin={isAdmin}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  onRestore={handleRestoreClick}
                  onVisibilityToggle={handleVisibilityToggle}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            itemLabel="documentos"
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Modales */}
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={() => {
          window.location.reload();
        }}
      />

      {selectedDocument && (
        <>
          <DocumentEditModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedDocument(null);
            }}
            document={selectedDocument}
            onSuccess={refetch}
          />

          <DocumentDeleteModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedDocument(null);
            }}
            document={selectedDocument}
            onSuccess={refetch}
          />
        </>
      )}

      <DocumentRestoreModal
        isOpen={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </div>
  );
};