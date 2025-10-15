import React, { useState, useEffect } from 'react';
import { X, Save, Link } from 'react-feather';
import { useResponsive, useFocusTrap, useEscapeKey } from '../../hooks';
import { showNotification } from '../../services';
import { Button } from '../Button';
import type { IResource } from '../../types/resource';

interface ResourceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: IResource | null;
  onSave: (resourceData: { name: string; description: string; links: Array<{ label: string; url: string }> }) => Promise<void>;
}

export const ResourceEditModal: React.FC<ResourceEditModalProps> = ({
  isOpen,
  onClose,
  resource,
  onSave
}) => {
  const { scale } = useResponsive();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    links: [{ label: '', url: '' }]
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Hooks de accesibilidad
  const modalRef = useFocusTrap(isOpen);
  useEscapeKey(isOpen, onClose);

  // Cargar datos del recurso cuando se abre el modal
  useEffect(() => {
    if (isOpen && resource) {
      setFormData({
        name: resource.name || '',
        description: resource.description || '',
        links: resource.links && resource.links.length > 0 
          ? resource.links.map(link => ({ label: link.label || '', url: link.url || '' }))
          : [{ label: '', url: '' }]
      });
    }
  }, [isOpen, resource]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { label: '', url: '' }]
    }));
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showNotification('error', 'Error de validación', 'El nombre del recurso es obligatorio');
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        name: formData.name.trim(),
        description: formData.description.trim(),
        links: formData.links.filter(link => link.label.trim() || link.url.trim())
      });
      showNotification('success', 'Éxito', 'Recurso actualizado exitosamente');
      onClose();
    } catch {
      showNotification('error', 'Error', 'Error al actualizar el recurso');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

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
        aria-labelledby="edit-modal-title"
        className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300"
        style={{ 
          borderRadius: `${scale(16)}px`,
          maxWidth: `${scale(600)}px`,
          width: '100%',
          maxHeight: '90vh'
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
              <Save 
                size={scale(20)} 
                className="text-white"
              />
            </div>
            <h2 
              id="edit-modal-title"
              className="font-semibold text-white"
              style={{ fontSize: scale(18) }}
            >
              Editar Recurso
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de editar recurso"
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
          className="overflow-y-auto"
          style={{ 
            padding: `${scale(24)}px`,
            maxHeight: 'calc(90vh - 120px)'
          }}
        >
          {/* Nombre */}
          <div style={{ marginBottom: `${scale(16)}px` }}>
            <label 
              className="block text-sm font-medium"
              style={{ 
                fontSize: scale(14), 
                color: '#1E285F',
                marginBottom: `${scale(8)}px`
              }}
            >
              Nombre del Recurso *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all focus:ring-[#5D5A88] text-gray-900"
              style={{ 
                fontSize: scale(14),
                minHeight: scale(40)
              }}
              placeholder="Ingrese el nombre del recurso"
            />
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: `${scale(16)}px` }}>
            <label 
              className="block text-sm font-medium"
              style={{ 
                fontSize: scale(14), 
                color: '#1E285F',
                marginBottom: `${scale(8)}px`
              }}
            >
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none transition-all focus:ring-[#5D5A88] text-gray-900"
              style={{ 
                fontSize: scale(14),
                minHeight: scale(80)
              }}
              placeholder="Ingrese una descripción del recurso"
            />
          </div>

          {/* Enlaces */}
          <div style={{ marginBottom: `${scale(24)}px` }}>
            <div 
              className="flex items-center justify-between"
              style={{ marginBottom: `${scale(12)}px` }}
            >
              <label 
                className="block text-sm font-medium"
                style={{ fontSize: scale(14), color: '#1E285F' }}
              >
                Enlaces
              </label>
              <button
                onClick={addLink}
                className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-colors"
                style={{ 
                  fontSize: scale(12),
                  color: '#5D5A88',
                  backgroundColor: 'rgba(93, 90, 136, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(93, 90, 136, 0.2)';
                  e.currentTarget.style.color = '#6B6A9A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(93, 90, 136, 0.1)';
                  e.currentTarget.style.color = '#5D5A88';
                }}
              >
                <Link size={scale(14)} />
                Agregar Enlace
              </button>
            </div>

            {formData.links.map((link, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row"
                style={{ 
                  gap: `${scale(8)}px`,
                  marginBottom: `${scale(8)}px`
                }}
              >
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all focus:ring-[#5D5A88] text-gray-900"
                  style={{ 
                    fontSize: scale(14),
                    minHeight: scale(36)
                  }}
                  placeholder="Etiqueta del enlace"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all focus:ring-[#5D5A88] text-gray-900"
                  style={{ 
                    fontSize: scale(14),
                    minHeight: scale(36)
                  }}
                  placeholder="URL del enlace"
                />
                {formData.links.length > 1 && (
                  <button
                    onClick={() => removeLink(index)}
                    className="px-3 py-2 rounded-lg transition-colors flex-shrink-0"
                    style={{ 
                      minHeight: scale(36),
                      color: '#DC2626',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
                      e.currentTarget.style.color = '#EF4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                      e.currentTarget.style.color = '#DC2626';
                    }}
                  >
                    <X size={scale(16)} />
                  </button>
                )}
              </div>
            ))}
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
            onClick={handleSave}
            variant="primary"
            size="md"
            disabled={isLoading || !formData.name.trim()}
            iconLeft={isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Save size={scale(16)} />}
          >
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </div>
  );
};
