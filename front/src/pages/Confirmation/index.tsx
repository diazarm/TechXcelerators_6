import React from 'react';
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
  return <ConfirmationPage />;
};

export default ConfirmationPageWrapper;
