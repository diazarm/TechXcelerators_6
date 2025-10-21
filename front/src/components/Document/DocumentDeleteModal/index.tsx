/**
 * Modal de confirmación para eliminar documento
 * Siguiendo el diseño de ResourceDeleteModal
 */

import React from 'react';
import { X, AlertTriangle } from 'react-feather';
import { useScreenSize } from '../../../context';
import { useDocumentActions } from '../../../hooks/useDocumentActions';
import { Button } from '../../Form/Button';
import type { IDocument } from '../../../types/document';

interface DocumentDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: IDocument;
  onSuccess: () => void;
}

export const DocumentDeleteModal: React.FC<DocumentDeleteModalProps> = ({
  isOpen,
  onClose,
  document,
  onSuccess,
}) => {
  const { scale, dimensions } = useScreenSize();
  const { deleteLoading, handleDelete } = useDocumentActions();

  if (!isOpen) return null;

  const handleConfirm = async () => {
    const success = await handleDelete(document._id, document.name);
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
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
        style={{
          backgroundColor: 'white',
          borderRadius: scale(12),
          maxWidth: scale(500),
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
            padding: dimensions.spacing.lg,
            borderTopLeftRadius: scale(12),
            borderTopRightRadius: scale(12),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: dimensions.spacing.sm }}>
            <AlertTriangle size={scale(24)} color="white" />
            <h2
              style={{
                margin: 0,
                fontSize: dimensions.fontSize.xl,
                fontWeight: 600,
                color: 'white',
              }}
            >
              Desactivar Documento
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={deleteLoading}
            style={{
              background: 'none',
              border: 'none',
              cursor: deleteLoading ? 'not-allowed' : 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              opacity: deleteLoading ? 0.5 : 1,
            }}
            aria-label="Cerrar modal"
          >
            <X size={scale(24)} color="white" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: dimensions.spacing.xl }}>
          <p
            style={{
              fontSize: dimensions.fontSize.md,
              color: '#374151',
              marginBottom: dimensions.spacing.md,
              lineHeight: 1.6,
            }}
          >
            ¿Estás seguro de que deseas desactivar el siguiente documento?
          </p>
          <div
            style={{
              padding: dimensions.spacing.md,
              backgroundColor: '#FEF2F2',
              borderRadius: scale(8),
              borderWidth: scale(1),
              borderColor: '#FCA5A5',
              borderStyle: 'solid',
              marginBottom: dimensions.spacing.lg,
            }}
          >
            <p
              style={{
                fontSize: dimensions.fontSize.sm,
                fontWeight: 600,
                color: '#7F1D1D',
                margin: 0,
                marginBottom: dimensions.spacing.xs,
              }}
            >
              {document.name}
            </p>
            <p
              style={{
                fontSize: dimensions.fontSize.xs,
                color: '#991B1B',
                margin: 0,
              }}
            >
              Categoría: {document.category}
            </p>
          </div>
          <p
            style={{
              fontSize: dimensions.fontSize.sm,
              color: '#6B7280',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            El documento será desactivado y no será visible para los usuarios. Podrá ser restaurado posteriormente por un administrador.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: dimensions.spacing.lg,
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            gap: dimensions.spacing.sm,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={deleteLoading}
            style={{
              fontSize: dimensions.fontSize.sm,
              paddingLeft: dimensions.spacing.lg,
              paddingRight: dimensions.spacing.lg,
              paddingTop: dimensions.spacing.sm,
              paddingBottom: dimensions.spacing.sm,
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={deleteLoading}
            style={{
              fontSize: dimensions.fontSize.sm,
              paddingLeft: dimensions.spacing.lg,
              paddingRight: dimensions.spacing.lg,
              paddingTop: dimensions.spacing.sm,
              paddingBottom: dimensions.spacing.sm,
              backgroundColor: '#DC2626',
              borderColor: '#DC2626',
            }}
          >
            {deleteLoading ? 'Desactivando...' : 'Confirmar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

