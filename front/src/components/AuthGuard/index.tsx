import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useNotification } from '../../hooks';
import { LoadingSpinner } from '../../components';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protección simple de rutas
 * 
 * Componente que protege rutas que requieren autenticación.
 * Redirige automáticamente al home (landing) si el usuario no está autenticado
 * y muestra una notificación sugiriendo el inicio de sesión.
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
  const { addNotification } = useNotification();

  // Mostrar notificación cuando no está autenticado
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      addNotification({
        type: 'info',
        title: 'Acceso requerido',
        message: 'Para acceder al sitio, necesitas estar autenticado. Haz clic en el botón "Usuario o Admin" para iniciar sesión.',
        duration: 6000
      });
    }
  }, [isLoading, isAuthenticated, addNotification]);

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

  // Si no está autenticado, redirigir a home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, renderizar el contenido
  return <>{children}</>;
};

export default AuthGuard;
