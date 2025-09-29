import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'react-feather';
import type { ConfirmationPageProps } from './types';

/**
 * ConfirmationPage - Página de confirmación de registro
 * 
 * Componente reutilizable que muestra una confirmación de éxito
 * después de registrar un nuevo usuario. Incluye diseño con fondo
 * personalizado, logo, icono de éxito y botón de redirección.
 * 
 * @example
 * ```tsx
 * <ConfirmationPage 
 *   userName="Juan Pérez"
 *   userEmail="juan@example.com"
 *   userRole="director"
 * />
 * ```
 */
export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  userName,
  userEmail,
  userRole,
  message = "¡Nuevo usuario agregado con éxito!",
  buttonText = "Ir al dashboard",
  redirectTo = "/dashboard"
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener datos del estado de navegación si no se proporcionan como props
  const state = location.state as { userName?: string; userEmail?: string; userRole?: string } | null;
  const finalUserName = userName || state?.userName;
  const finalUserEmail = userEmail || state?.userEmail;
  const finalUserRole = userRole || state?.userRole;

  /**
   * Manejar click del botón de redirección
   */
  const handleRedirect = (): void => {
    navigate(redirectTo);
  };

  return (
    <div 
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ 
        backgroundImage: 'url(/img/Verify.jpg)' // Imagen de fondo especificada
      }}
    >
      {/* Overlay con opacidad #222222 */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(34, 34, 34, 0.7)' }}
      />
      
      {/* Contenedor principal centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8">
        {/* Contenedor del contenido con opacidad */}
        <div 
          className="flex flex-col items-center justify-center px-8 py-8 rounded-[25px]"
          style={{
            backgroundColor: 'rgba(30, 30, 30, 0.5)', // #1E1E1E con 50% opacidad
            width: '500px',
            height: '400px'
          }}
        >
          {/* Logo */}
          <div 
            className="w-[200px] h-[87px] sm:w-[250px] sm:h-[108px] lg:w-[300px] lg:h-[130px] mb-4"
          >
            <img 
              src="/img/Logo3.png" 
              alt="Scala Learning" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Icono de éxito */}
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center">
              <CheckCircle 
                size={48} 
                className="text-white" 
                style={{ 
                  strokeWidth: 2 
                }}
              />
            </div>
          </div>

          {/* Mensaje de confirmación */}
          <h2 
            className="text-white text-center mb-4 text-base sm:text-lg lg:text-xl montserrat px-4"
            style={{
              fontWeight: 500,
              lineHeight: '120%',
              letterSpacing: '0%'
            }}
          >
            {message}
          </h2>

          {/* Información adicional del usuario si está disponible */}
          {finalUserName && (
            <div className="text-white text-center mb-4 px-4">
              <p className="text-sm sm:text-base istok-web mb-1">
                <strong>Usuario:</strong> {finalUserName}
              </p>
              {finalUserEmail && (
                <p className="text-sm sm:text-base istok-web mb-1">
                  <strong>Email:</strong> {finalUserEmail}
                </p>
              )}
              {finalUserRole && (
                <p className="text-sm sm:text-base istok-web">
                  <strong>Rol:</strong> {finalUserRole === 'director' ? 'Director' : 'Usuario'}
                </p>
              )}
            </div>
          )}

          {/* Botón de redirección */}
          <button
            onClick={handleRedirect}
            className="w-full px-5 py-2 rounded-[6px] text-white transition-all duration-200 hover:opacity-90 istok-web"
            style={{
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '100%',
              letterSpacing: '0%',
              backgroundColor: '#FF6E00',
              boxShadow: '0px 4px 4px 0px #00000040'
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
