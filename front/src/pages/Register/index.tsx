import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm, OptimizedImage } from '../../components';
import { useAuth } from '../../hooks';
import { useScreenSize } from '../../context';

/**
 * RegisterPage - Página de registro de usuarios
 * 
 * Página para registrar nuevos usuarios en el sistema.
 * Solo accesible para usuarios administradores.
 * Utiliza el mismo diseño que la página de login de admin.
 * 
 * @example
 * ```tsx
 * <Route path="/register" element={<RegisterPage />} />
 * ```
 */
const RegisterPage: React.FC = () => {
  const { dimensions, scale } = useScreenSize();
  const { isAuthenticated } = useAuth();

  // Scroll to top al montar la página
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  // Determinar la ruta del logo según el estado de autenticación
  const getLogoDestination = () => {
    if (isAuthenticated) {
      return '/dashboard';
    }
    return '/';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#222222' }}>
      
      {/* Contenedor del formulario centrado */}
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          style={{
            width: `${scale(400)}px`,
            height: `${scale(173)}px`
          }}
        >
          <Link to={getLogoDestination()}>
            <OptimizedImage 
              src="/img/Logo3.png" 
              alt="Scala Learning" 
              className="w-full h-full object-contain hover:opacity-80 transition-opacity cursor-pointer"
              loading="eager"
            />
          </Link>
        </div>

        {/* Título */}
        <h2 
          className="text-white mb-4 montserrat"
          style={{
            fontWeight: 500,
            fontSize: dimensions.fontSize.xl,
            lineHeight: '100%',
            letterSpacing: '0%'
          }}
        >
          Registro usuario
        </h2>

              {/* Formulario de registro */}
              <div
                className="relative w-full"
                style={{
                  backgroundColor: 'rgba(164, 169, 194, 0.5)', // Opacidad del 50%
                  padding: dimensions.spacing.lg,
                  borderRadius: `${scale(20)}px`,
                  maxWidth: `${scale(600)}px`,
                  minHeight: `${scale(400)}px`
                }}
              >
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
