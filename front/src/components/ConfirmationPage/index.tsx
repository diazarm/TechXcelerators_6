import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'react-feather';
import { useScreenSize } from '../../context';
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
  const { dimensions, scale } = useScreenSize();
  

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
          className="flex flex-col items-center justify-between"
          style={{
            backgroundColor: 'rgba(30, 30, 30, 0.5)', // #1E1E1E con 50% opacidad
            padding: dimensions.spacing.xl,
            gap: dimensions.spacing.lg,
            width: `${scale(400)}px`,
            minWidth: `${scale(280)}px`,
            maxWidth: `${scale(600)}px`,
            minHeight: `${scale(350)}px`,
            borderRadius: `${scale(25)}px`
          }}
        >
          {/* Logo */}
          <div 
            style={{
              width: `${scale(350)}px`,
              height: `${scale(140)}px`
            }}
          >
            <img 
              src="/img/Logo3.png" 
              alt="Scala Learning" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Icono de éxito */}
          <div className="flex justify-center">
            <div 
              className="rounded-full flex items-center justify-center"
              style={{
                width: dimensions.spacing['2xl'],
                height: dimensions.spacing['2xl']
              }}
            >
              <CheckCircle 
                size={dimensions.spacing.xl}
                className="text-white" 
                style={{ 
                  strokeWidth: 2 
                }}
              />
            </div>
          </div>

          {/* Mensaje de confirmación */}
          <h2 
            className="text-white text-center montserrat"
            style={{
              fontWeight: 500,
              fontSize: dimensions.fontSize.xl,
              lineHeight: '120%',
              letterSpacing: '0%',
              paddingLeft: dimensions.spacing.lg,
              paddingRight: dimensions.spacing.lg
            }}
          >
            {message}
          </h2>

          {/* Información adicional del usuario si está disponible */}
          {finalUserName && (
            <div 
              className="text-white text-center"
              style={{
                paddingLeft: dimensions.spacing.md,
                paddingRight: dimensions.spacing.md
              }}
            >
              <p 
                className="istok-web"
                style={{
                  fontSize: dimensions.fontSize.md,
                  marginBottom: dimensions.spacing.sm
                }}
              >
                <strong>Usuario:</strong> {finalUserName}
              </p>
              {finalUserEmail && (
                <p 
                  className="istok-web"
                  style={{
                    fontSize: dimensions.fontSize.md,
                    marginBottom: dimensions.spacing.sm
                  }}
                >
                  <strong>Email:</strong> {finalUserEmail}
                </p>
              )}
              {finalUserRole && (
                <p 
                  className="istok-web"
                  style={{
                    fontSize: dimensions.fontSize.md
                  }}
                >
                  <strong>Rol:</strong> {finalUserRole === 'director' ? 'Director' : 'Usuario'}
                </p>
              )}
            </div>
          )}

          {/* Botón de redirección */}
          <button
            onClick={handleRedirect}
            className="w-full text-white transition-all duration-200 hover:opacity-90 istok-web"
            style={{
              fontWeight: 400,
              fontSize: dimensions.fontSize.lg,
              lineHeight: '100%',
              letterSpacing: '0%',
              backgroundColor: '#FF6E00',
              boxShadow: '0px 4px 4px 0px #00000040',
              paddingLeft: dimensions.spacing.lg,
              paddingRight: dimensions.spacing.lg,
              paddingTop: dimensions.spacing.md,
              paddingBottom: dimensions.spacing.md,
              borderRadius: '6px'
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
