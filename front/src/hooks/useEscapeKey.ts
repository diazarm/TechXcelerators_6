import { useEffect } from 'react';

/**
 * Hook para manejar el cierre de modales con la tecla Escape
 * 
 * @param isOpen - Estado del modal (abierto/cerrado)
 * @param onClose - Función para cerrar el modal
 */
export const useEscapeKey = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
};

