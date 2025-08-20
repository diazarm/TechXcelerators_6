import { useContext } from 'react';
import type { AuthContextType } from './auth-context';

/**
 * Hook para acceder al contexto de autenticación
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login } = useAuthContext();
 * 
 * if (!isAuthenticated) {
 *   return <LoginForm onLogin={login} />;
 * }
 * 
 * return <Dashboard user={user} />;
 * ```
 * 
 * @returns {AuthContextType} El contexto de autenticación
 * @throws {Error} Si se usa fuera de un AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext<AuthContextType | undefined>(undefined);
  if (context === undefined) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  return context;
};
