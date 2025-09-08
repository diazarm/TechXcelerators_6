import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { LoadingSpinner } from '../../components';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protección simple de rutas
 * 
 * Componente que protege rutas que requieren autenticación.
 * Redirige automáticamente a login si el usuario no está autenticado.
 * 
 * @example
 * ```tsx
 * <AuthGuard>
 *   <Dashboard />
 * </AuthGuard>
 * ```
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner 
          size="large" 
          message="Verificando acceso..."
        />
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar el contenido
  return <>{children}</>;
};

export default AuthGuard;
