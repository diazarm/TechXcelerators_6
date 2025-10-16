import React from 'react';
import { X, RotateCcw, Calendar, Folder } from 'react-feather';
import { useResponsive, useFocusTrap, useEscapeKey } from '../../hooks';
import { Button } from '../Button';
import { SectionFilter } from '../SectionFilter';
import LoadingSpinner from '../LoadingSpinner';
import { getSectionTitleById } from '../../constants';
import type { IResource } from '../../types/resource';
import type { SectionOption } from '../SectionFilter/types';

interface ResourceRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  deletedResources: IResource[];
  loading: boolean;
  restoreLoading: string | null;
  onRestoreResource: (resourceId: string, resourceName: string) => void;
  // Filtrado por sección
  selectedSectionId: string | 'all';
  onSectionChange: (sectionId: string | 'all') => void;
  sectionOptions: SectionOption[];
}

export const ResourceRestoreModal: React.FC<ResourceRestoreModalProps> = ({
  isOpen,
  onClose,
  deletedResources,
  loading,
  restoreLoading,
  onRestoreResource,
  selectedSectionId,
  onSectionChange,
  sectionOptions
}) => {
  const { scale } = useResponsive();
  
  // Hooks de accesibilidad
  const modalRef = useFocusTrap(isOpen);
  useEscapeKey(isOpen, onClose);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getSectionName = (sectionId: string): string => {
    // Usar el helper centralizado
    return getSectionTitleById(sectionId) || 'Sección Desconocida';
  };

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="restore-modal-title"
        className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 overflow-hidden w-full h-full flex flex-col"
        style={{ 
          borderRadius: `${scale(16)}px`,
          width: `${scale(800)}px`,
          height: `${scale(600)}px`,
          maxWidth: `${scale(800)}px`,
          maxHeight: `${scale(600)}px`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="relative bg-gradient-to-br from-[#5D5A88] via-[#6B6A9A] to-[#827896]"
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
              <RotateCcw 
                size={scale(20)} 
                className="text-white"
              />
            </div>
            <h2 
              id="restore-modal-title"
              className="font-semibold text-white"
              style={{ fontSize: scale(18) }}
            >
              Recursos Eliminados
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de recursos eliminados"
            className="absolute text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200 group cursor-pointer z-50"
            style={{
              top: `${scale(16)}px`,
              right: `${scale(16)}px`,
              padding: `${scale(6)}px`,
              pointerEvents: 'auto'
            }}
          >
            <X size={scale(18)} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ 
            padding: `${scale(24)}px`,
            minWidth: 0
          }}
        >
          {/* Filtro de sección */}
          <div 
            style={{ 
              marginBottom: `${scale(20)}px`,
              minWidth: 0,
              maxWidth: '100%'
            }}
          >
            <SectionFilter
              selectedSectionId={selectedSectionId}
              onSectionChange={onSectionChange}
              sections={sectionOptions}
              loading={loading}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center" style={{ minHeight: `${scale(200)}px` }}>
              <LoadingSpinner />
            </div>
          ) : deletedResources.length === 0 ? (
            <div 
              className="text-center"
              style={{ 
                padding: `${scale(48)}px 0`,
                color: '#5D5A88'
              }}
            >
              <RotateCcw size={scale(48)} className="mx-auto mb-4 opacity-50" />
              <p style={{ fontSize: scale(16) }}>
                No hay recursos eliminados
              </p>
              <p style={{ fontSize: scale(14), marginTop: `${scale(8)}px` }}>
                Todos los recursos están activos
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {deletedResources.map((resource) => (
                <div
                  key={resource._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  style={{ borderRadius: `${scale(8)}px` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 
                          className="font-semibold"
                          style={{ 
                            fontSize: scale(16),
                            color: '#1E285F'
                          }}
                        >
                          {resource.name}
                        </h3>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: 'rgba(93, 90, 136, 0.1)',
                            color: '#5D5A88',
                            fontSize: scale(12)
                          }}
                        >
                          <Folder size={scale(12)} className="inline mr-1" />
                          {getSectionName(resource.sectionId)}
                        </span>
                      </div>
                      
                      {resource.description && (
                        <p 
                          className="mb-3"
                          style={{ 
                            fontSize: scale(14),
                            color: '#5D5A88',
                            lineHeight: '1.5'
                          }}
                        >
                          {resource.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm" style={{ color: '#5D5A88' }}>
                        <div className="flex items-center gap-1">
                          <Calendar size={scale(14)} />
                          <span style={{ fontSize: scale(13) }}>
                            Eliminado: {resource.deletedAt ? formatDate(resource.deletedAt) : 'Fecha desconocida'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => onRestoreResource(resource._id, resource.name)}
                      variant="primary"
                      size="sm"
                      disabled={restoreLoading === resource._id}
                      iconLeft={restoreLoading === resource._id ? 
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : 
                        <RotateCcw size={scale(14)} />
                      }
                    >
                      {restoreLoading === resource._id ? 'Restaurando...' : 'Restaurar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};
