/**
 * Modal para restaurar documentos eliminados
 * Siguiendo el diseño de ResourceRestoreModal
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, RotateCcw } from 'react-feather';
import { useScreenSize } from '../../../context';
import { useFocusTrap, useEscapeKey } from '../../../hooks';
import { useDocumentActions } from '../../../hooks/useDocumentActions';
import { getDocuments } from '../../../services';
import { Button } from '../../Form/Button';
import LoadingSpinner from '../../UI/LoadingSpinner';
import type { IDocument } from '../../../types/document';

interface DocumentRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DocumentRestoreModal: React.FC<DocumentRestoreModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { scale, dimensions } = useScreenSize();
  const { restoreLoading, handleRestore } = useDocumentActions();
  const [deletedDocuments, setDeletedDocuments] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const modalRef = useFocusTrap(isOpen);
  useEscapeKey(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      fetchDeletedDocuments();
    }
  }, [isOpen]);

  const fetchDeletedDocuments = async () => {
    try {
      setLoading(true);
      const docs = await getDocuments({ status: 'deleted' });
      setDeletedDocuments(docs);
    } catch (error) {
      console.error('Error fetching deleted documents:', error);
      setDeletedDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreDocument = async (document: IDocument) => {
    const success = await handleRestore(document._id, document.name);
    if (success) {
      console.log('[DocumentRestoreModal] Document restored successfully, calling onSuccess');
      // Remover de la lista local
      setDeletedDocuments((prev) => prev.filter((doc) => doc._id !== document._id));
      onSuccess();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: dimensions.spacing.md,
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-restore-modal-title"
        style={{
          backgroundColor: 'white',
          borderRadius: scale(12),
          maxWidth: scale(600),
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #5D5A88 0%, #7C7BA8 100%)',
            padding: dimensions.spacing.lg,
            borderTopLeftRadius: scale(12),
            borderTopRightRadius: scale(12),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: dimensions.spacing.sm }}>
            <RotateCcw size={scale(24)} color="white" />
            <h2
              id="document-restore-modal-title"
              style={{
                margin: 0,
                fontSize: dimensions.fontSize.xl,
                fontWeight: 600,
                color: 'white',
              }}
            >
              Restaurar Documentos
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={restoreLoading}
            style={{
              background: 'none',
              border: 'none',
              cursor: restoreLoading ? 'not-allowed' : 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              opacity: restoreLoading ? 0.5 : 1,
            }}
            aria-label="Cerrar modal"
          >
            <X size={scale(24)} color="white" />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: dimensions.spacing.xl,
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: dimensions.spacing.xl }}>
              <LoadingSpinner />
            </div>
          ) : deletedDocuments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: dimensions.spacing.xl }}>
              <RotateCcw
                size={scale(48)}
                style={{ color: '#9CA3AF', marginBottom: dimensions.spacing.md }}
              />
              <p
                style={{
                  fontSize: dimensions.fontSize.md,
                  color: '#6B7280',
                  margin: 0,
                }}
              >
                No hay documentos eliminados para restaurar
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: dimensions.spacing.sm }}>
              {deletedDocuments.map((document) => (
                <div
                  key={document._id}
                  style={{
                    padding: dimensions.spacing.md,
                    backgroundColor: '#F9FAFB',
                    borderRadius: scale(8),
                    borderWidth: scale(1),
                    borderColor: '#E5E7EB',
                    borderStyle: 'solid',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: dimensions.spacing.md,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: dimensions.fontSize.sm,
                        fontWeight: 600,
                        color: '#111827',
                        margin: 0,
                        marginBottom: dimensions.spacing.xs,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {document.name}
                    </p>
                    <p
                      style={{
                        fontSize: dimensions.fontSize.xs,
                        color: '#6B7280',
                        margin: 0,
                      }}
                    >
                      {document.category} · {new Date(document.uploadDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRestoreDocument(document)}
                    disabled={restoreLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: scale(6),
                      padding: `${scale(8)}px ${scale(12)}px`,
                      backgroundColor: '#5D5A88',
                      color: 'white',
                      border: 'none',
                      borderRadius: scale(6),
                      fontSize: dimensions.fontSize.xs,
                      fontWeight: 500,
                      cursor: restoreLoading ? 'not-allowed' : 'pointer',
                      opacity: restoreLoading ? 0.5 : 1,
                      whiteSpace: 'nowrap',
                    }}
                    className="hover:opacity-90"
                  >
                    <RotateCcw size={scale(14)} />
                    Restaurar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: dimensions.spacing.lg,
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={restoreLoading}
            style={{
              fontSize: dimensions.fontSize.sm,
              paddingLeft: dimensions.spacing.lg,
              paddingRight: dimensions.spacing.lg,
              paddingTop: dimensions.spacing.sm,
              paddingBottom: dimensions.spacing.sm,
            }}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

