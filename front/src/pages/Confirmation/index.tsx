import React, { useEffect } from 'react';
import { ConfirmationPage } from '../../components';

/**
 * ConfirmationPageWrapper - Página de confirmación
 * 
 * Página wrapper que utiliza el componente ConfirmationPage
 * para mostrar la confirmación de registro exitoso.
 * 
 * @example
 * ```tsx
 * <Route path="/confirmation" element={<ConfirmationPageWrapper />} />
 * ```
 */
const ConfirmationPageWrapper: React.FC = () => {
  // Scroll to top al montar la página
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return <ConfirmationPage />;
};

export default ConfirmationPageWrapper;
