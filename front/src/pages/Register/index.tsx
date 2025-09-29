import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components';
import { useResponsive, useAuth, useComponentDimensions } from '../../hooks';

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
  const { spacing } = useResponsive();
  const dimensions = useComponentDimensions();
  const { isAuthenticated } = useAuth();

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
      <div className={`flex flex-col items-center ${spacing.px.small}`}>
        {/* Logo */}
        <div 
          className="w-[200px] h-[87px] sm:w-[250px] sm:h-[108px] lg:w-[300px] lg:h-[130px]"
        >
          <Link to={getLogoDestination()}>
            <img 
              src="/img/Logo3.png" 
              alt="Scala Learning" 
              className="w-full h-full object-contain hover:opacity-80 transition-opacity cursor-pointer"
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
                className="rounded-[20px] relative w-full max-w-sm sm:max-w-md"
                style={{
                  width: dimensions.card.medium,
                  height: dimensions.card.medium,
                  backgroundColor: 'rgba(164, 169, 194, 0.5)' // Opacidad del 50%
                }}
              >
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
