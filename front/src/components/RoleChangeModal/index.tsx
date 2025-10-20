import React from 'react';
import { AlertTriangle, X } from 'react-feather';
import { useScreenSize } from '../../context';
import { Button } from '../Button';

interface RoleChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  currentRole: string;
  newRole: string;
  loading?: boolean;
}

/**
 * Modal de confirmación para cambio de rol de usuario
 * Diseño consistente con los modales existentes del sistema
 */
export const RoleChangeModal: React.FC<RoleChangeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
  currentRole,
  newRole,
  loading = false
}) => {
  const { dimensions, scale } = useScreenSize();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-change-modal-title"
        className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300"
        style={{ 
          borderRadius: scale(16),
          maxWidth: scale(500),
          width: '100%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente como los modales existentes */}
        <div 
          className="relative bg-gradient-to-br from-[#5D5A88] via-[#6B6A9A] to-[#827896]"
          style={{ 
            paddingLeft: scale(24),
            paddingRight: scale(24),
            paddingTop: scale(16),
            paddingBottom: scale(16)
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
              id="role-change-modal-title"
              className="font-semibold text-white"
              style={{ fontSize: scale(18) }}
            >
              Confirmar Cambio de Rol
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Cerrar modal de confirmación"
            className="absolute text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200 group cursor-pointer z-50"
            style={{
              top: scale(16),
              right: scale(16),
              padding: scale(6),
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
            padding: scale(24),
            maxHeight: 'calc(90vh - 120px)'
          }}
        >
          <p 
            className="text-gray-700 mb-6"
            style={{
              fontSize: dimensions.fontSize.md,
              marginBottom: dimensions.spacing.lg
            }}
          >
            ¿Estás seguro de que quieres cambiar el rol de <strong className="text-[#5D5A88]">{userName}</strong>?
          </p>
          
          <div 
            className="bg-gradient-to-r from-[#F5F4F8] to-[#E8E6F0] rounded-lg p-6 mb-6"
            style={{
              borderRadius: scale(8),
              padding: dimensions.spacing.lg,
              marginBottom: dimensions.spacing.lg
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span 
                className="text-gray-600 font-medium"
                style={{
                  fontSize: dimensions.fontSize.sm
                }}
              >
                Rol actual:
              </span>
              <span 
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentRole === 'Director' 
                    ? 'bg-[#5D5A88] text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                style={{
                  fontSize: dimensions.fontSize.xs,
                  paddingLeft: dimensions.spacing.md,
                  paddingRight: dimensions.spacing.md,
                  paddingTop: dimensions.spacing.xs,
                  paddingBottom: dimensions.spacing.xs
                }}
              >
                {currentRole === 'Director' ? 'Director' : 'Usuario'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span 
                className="text-gray-600 font-medium"
                style={{
                  fontSize: dimensions.fontSize.sm
                }}
              >
                Nuevo rol:
              </span>
              <span 
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  newRole === 'Director' 
                    ? 'bg-[#5D5A88] text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                style={{
                  fontSize: dimensions.fontSize.xs,
                  paddingLeft: dimensions.spacing.md,
                  paddingRight: dimensions.spacing.md,
                  paddingTop: dimensions.spacing.xs,
                  paddingBottom: dimensions.spacing.xs
                }}
              >
                {newRole === 'Director' ? 'Director' : 'Usuario'}
              </span>
            </div>
          </div>

          <div 
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
            style={{
              borderRadius: scale(8),
              padding: dimensions.spacing.md
            }}
          >
            <p 
              className="text-blue-700 text-sm"
              style={{
                fontSize: dimensions.fontSize.sm
              }}
            >
              <strong>Nota:</strong> Esta acción cambiará los permisos del usuario en el sistema inmediatamente.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50"
          style={{
            padding: dimensions.spacing.lg,
            gap: dimensions.spacing.md
          }}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={loading}
            className="hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
            disabled={loading}
            className="bg-[#5D5A88] hover:bg-[#4A476F] text-white"
          >
            {loading ? 'Cambiando...' : 'Confirmar Cambio'}
          </Button>
        </div>
      </div>
    </div>
  );
};