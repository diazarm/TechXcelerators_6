import React from 'react';
import { AlertTriangle, X, EyeOff, RotateCcw } from 'react-feather';
import { useScreenSize } from '../../context';
import { Button } from '../Button';

interface UserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  isActive: boolean;
  loading?: boolean;
}

/**
 * Modal de confirmación para cambio de estado de usuario
 * Diseño consistente con los modales existentes del sistema
 */
export const UserStatusModal: React.FC<UserStatusModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
  isActive,
  loading = false
}) => {
  const { dimensions, scale } = useScreenSize();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const actionText = isActive ? 'desactivar' : 'activar';
  const actionIcon = isActive ? EyeOff : RotateCcw;
  const actionColor = isActive ? '#DC2626' : '#059669';

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-status-modal-title"
        className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300"
        style={{ 
          borderRadius: scale(16),
          maxWidth: scale(400),
          width: '100%'
        }}
      >
        {/* Header con gradiente dinámico */}
        <div 
          className={`relative ${
            isActive 
              ? 'bg-gradient-to-br from-red-600 via-red-700 to-red-800' 
              : 'bg-gradient-to-br from-[#5D5A88] via-[#6B6A9A] to-[#827896]'
          }`}
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
              id="user-status-modal-title"
              className="font-semibold text-white"
              style={{ fontSize: scale(18) }}
            >
              Confirmar {actionText.charAt(0).toUpperCase() + actionText.slice(1)} Usuario
            </h2>
          </div>
          <button
            onClick={onClose}
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

        {/* Contenido */}
        <div 
          className="p-6"
          style={{
            padding: scale(24)
          }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div 
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                width: scale(48),
                height: scale(48),
                backgroundColor: `${actionColor}20`
              }}
            >
              {React.createElement(actionIcon, {
                size: scale(24),
                className: `text-[${actionColor}]`
              })}
            </div>
            <div className="flex-1">
              <p 
                className="text-gray-700 mb-2"
                style={{
                  fontSize: dimensions.fontSize.md,
                  marginBottom: dimensions.spacing.sm
                }}
              >
                ¿Estás seguro de que quieres <strong>{actionText}</strong> al usuario <strong>{userName}</strong>?
              </p>
              <p 
                className="text-gray-500"
                style={{ fontSize: dimensions.fontSize.sm }}
              >
                {isActive 
                  ? 'El usuario no podrá acceder al sistema hasta que sea reactivado.'
                  : 'El usuario podrá acceder nuevamente al sistema.'
                }
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
              style={{
                fontSize: dimensions.fontSize.sm,
                paddingLeft: dimensions.spacing.md,
                paddingRight: dimensions.spacing.md,
                paddingTop: dimensions.spacing.sm,
                paddingBottom: dimensions.spacing.sm
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              disabled={loading}
              style={{
                fontSize: dimensions.fontSize.sm,
                paddingLeft: dimensions.spacing.md,
                paddingRight: dimensions.spacing.md,
                paddingTop: dimensions.spacing.sm,
                paddingBottom: dimensions.spacing.sm,
                backgroundColor: actionColor,
                borderColor: actionColor
              }}
            >
              {loading ? 'Procesando...' : (isActive ? 'Desactivar' : 'Activar')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
