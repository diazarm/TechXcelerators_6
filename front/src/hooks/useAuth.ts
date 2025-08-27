import { useContext } from 'react';
import { AuthContext } from '../context';

/** Hook para usar el contexto de autenticación */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  return context;
};
