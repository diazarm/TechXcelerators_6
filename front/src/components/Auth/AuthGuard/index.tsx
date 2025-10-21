import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useNotification } from '../../../hooks';
import { LoadingSpinner } from '../../index';

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
  const [hasShownNotification, setHasShownNotification] = React.useState(false);

  // Mostrar notificación cuando no está autenticado (solo una vez por sesión)
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasShownNotification) {
      // Verificar si viene de un logout reciente (menos de 2 segundos)
      const lastLogout = localStorage.getItem('lastLogout');
      const now = Date.now();
      const isRecentLogout = lastLogout && (now - parseInt(lastLogout)) < 2000;
      
      if (!isRecentLogout) {
        addNotification({
          type: 'info',
          title: 'Acceso requerido',
          message: 'Para acceder al sitio, necesitas estar autenticado. Haz clic en el botón "Usuario o Admin" para iniciar sesión.',
          duration: 5000
        });
        setHasShownNotification(true);
      }
    }
  }, [isLoading, isAuthenticated, addNotification, hasShownNotification]);

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

  // Si no está autenticado, redirigir a home (donde puede ver los botones de login)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, renderizar el contenido
  return <>{children}</>;
};

export default AuthGuard;
