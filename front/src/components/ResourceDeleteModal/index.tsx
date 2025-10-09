import React, { useState } from 'react';
import { X, AlertTriangle } from 'react-feather';
import { useResponsive } from '../../hooks/useResponsive';
import { showNotification } from '../../services';
import { Button } from '../Button';
import type { IResource } from '../../types/resource';

interface ResourceDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: IResource | null;
  onConfirm: () => Promise<void>;
}

export const ResourceDeleteModal: React.FC<ResourceDeleteModalProps> = ({
  isOpen,
  onClose,
  resource,
  onConfirm
}) => {
  const { scale } = useResponsive();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      showNotification('success', 'Éxito', 'Recurso desactivado exitosamente');
      // onClose se llama automáticamente desde useResourceManagement
    } catch {
      showNotification('error', 'Error', 'Error al desactivar el recurso');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !resource) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300"
        style={{ 
          borderRadius: `${scale(16)}px`,
          maxWidth: `${scale(500)}px`,
          width: '100%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="relative bg-gradient-to-br from-[#DC2626] via-[#EF4444] to-[#F87171]"
          style={{ 
            paddingLeft: `${scale(24)}px`,
            paddingRight: `${scale(24)}px`,
            paddingTop: `${scale(16)}px`,
            paddingBottom: `${scale(16)}px`
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <AlertTriangle 
                size={scale(20)} 
                className="text-white"
              />
            </div>
            <h2 
              className="font-semibold text-white"
              style={{ fontSize: scale(18) }}
            >
              Desactivar Recurso
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200 group cursor-pointer z-50"
            style={{
              top: `${scale(16)}px`,
              right: `${scale(16)}px`,
              padding: `${scale(6)}px`,
              pointerEvents: 'auto'
            }}
            disabled={isLoading}
          >
            <X size={scale(18)} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: `${scale(24)}px` }}>
          <div 
            className="flex items-start"
            style={{ gap: `${scale(16)}px` }}
          >
            <div 
              className="rounded-full"
              style={{ 
                backgroundColor: '#FEF2F2',
                padding: `${scale(12)}px`
              }}
            >
              <AlertTriangle 
                size={scale(24)} 
                className="text-red-600"
              />
            </div>
            <div className="flex-1">
              <h3 
                className="font-semibold"
                style={{ 
                  fontSize: scale(16), 
                  color: '#1E285F',
                  marginBottom: `${scale(8)}px`
                }}
              >
                ¿Estás seguro de que deseas desactivar este recurso?
              </h3>
              <p 
                style={{ 
                  fontSize: scale(14), 
                  color: '#5D5A88',
                  marginBottom: `${scale(16)}px`
                }}
              >
                El recurso <strong style={{ color: '#1E285F' }}>"{resource.name}"</strong> será desactivado y ya no estará disponible para los usuarios. 
                Esta acción se puede revertir posteriormente.
              </p>
              
              {resource.description && (
                <div 
                  className="rounded-lg"
                  style={{ 
                    fontSize: scale(13),
                    backgroundColor: 'rgba(93, 90, 136, 0.05)',
                    padding: `${scale(12)}px`
                  }}
                >
                  <p style={{ color: '#5D5A88' }}>
                    <strong style={{ color: '#1E285F' }}>Descripción:</strong> {resource.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="flex items-center justify-end border-t border-gray-200/50"
          style={{ 
            backgroundColor: 'rgba(93, 90, 136, 0.02)',
            padding: `${scale(24)}px`,
            gap: `${scale(12)}px`
          }}
        >
          <Button
            onClick={onClose}
            variant="secondary"
            size="md"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            variant="primary"
            size="md"
            disabled={isLoading}
            iconLeft={isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <AlertTriangle size={scale(16)} />}
            style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
            className="hover:!bg-[#EF4444] hover:!border-[#EF4444] focus:!ring-[#DC2626]"
          >
            {isLoading ? 'Desactivando...' : 'Desactivar Recurso'}
          </Button>
        </div>
      </div>
    </div>
  );
};
