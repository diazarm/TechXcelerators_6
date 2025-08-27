import React from 'react';
import { useAuth, useResponsive } from '../../hooks';
import { LoginForm, Button } from '../../components';

/** Página de login */
const LoginPage: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { spacing, text } = useResponsive();

  // Mostrar mensaje si ya está autenticado
  if (isAuthenticated) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${spacing.py.medium}`}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-md text-center">
          <h2 className={`${text.h2} text-green-800 mb-4`}>
            ¡Ya estás autenticado!
          </h2>
          <div className={`${text.body} text-green-700 mb-6`}>
            <p className="mb-2">
              <strong>Usuario:</strong> {user?.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="mb-2">
              <strong>Rol:</strong> {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
            </p>
            <p className="text-sm text-green-600 mt-4">
              Ya tienes una sesión activa. Puedes cerrar sesión si quieres iniciar una nueva.
            </p>
          </div>
          <Button
            onClick={logout}
            variant="secondary"
            size="md"
            className="bg-red-500 hover:bg-red-600 text-white border-red-500"
          >
            Cerrar Sesión (Test)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${spacing.py.medium}`}>
      <div className="w-full max-w-md">


        {/* Formulario de login */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
