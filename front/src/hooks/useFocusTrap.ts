import { useEffect, useRef } from 'react';

/**
 * Hook para manejar el trap de focus dentro de un modal
 * Asegura que el foco permanezca dentro del modal cuando está abierto
 * 
 * @param isOpen - Estado del modal (abierto/cerrado)
 * @returns Ref para el contenedor del modal
 */
export const useFocusTrap = (isOpen: boolean) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Guardar el elemento activo antes de abrir el modal
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Obtener todos los elementos enfocables dentro del modal
    const getFocusableElements = (): HTMLElement[] => {
      if (!modalRef.current) return [];
      
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(', ');

      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
      );
    };

    // Enfocar el primer elemento enfocable
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Manejar navegación por teclado (Tab)
    const handleTabKey = (event: KeyboardEvent) => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Tab normal
      if (event.key === 'Tab' && !event.shiftKey) {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }

      // Shift + Tab (reversa)
      if (event.key === 'Tab' && event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);

    // Cleanup: restaurar foco al cerrar
    return () => {
      document.removeEventListener('keydown', handleTabKey);
      
      // Restaurar foco al elemento anterior
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  return modalRef;
};

