import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LoginForm, ResponsiveBackground } from '../../components';
import { useAuth } from '../../hooks';
import { useScreenSize } from '../../context';

/** Página de login */
const LoginPage: React.FC = () => {
  const { dimensions, scale } = useScreenSize();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const accessType = searchParams.get('type') || 'admin';

  // Determinar la ruta del logo según el estado de autenticación
  const getLogoDestination = () => {
    if (isAuthenticated) {
      return '/dashboard';
    }
    return '/';
  };

  return (
    <ResponsiveBackground
      src={accessType === 'staff' ? '/img/BgLogin2.jpg' : '/img/BgLogin.png'}
      type="background-login"
      aspectRatio="16/9"
      forceMobileConfig={true}
      className="min-h-screen w-full relative flex items-center justify-center"
    >
      {/* Overlay con opacidad */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: '#00000066' }}
      />
      
      {/* Contenedor del formulario centrado */}
      <div className="relative z-10 flex flex-col items-center -mt-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="w-[300px] h-[130px] sm:w-[400px] sm:h-[173px] lg:w-[500px] lg:h-[217px]">
          <Link to={getLogoDestination()}>
            <img 
              src="/img/Logo3.png" 
              alt="Scala Learning" 
              className="w-full h-full object-contain hover:opacity-80 transition-opacity cursor-pointer"
            />
          </Link>
        </div>

        {/* Título dinámico según tipo de acceso */}
        <h2 
          className="text-white montserrat"
          style={{
            fontWeight: 500,
            fontSize: dimensions.fontSize['2xl'],
            lineHeight: '100%',
            letterSpacing: '0%',
            marginTop: dimensions.spacing.lg,
            marginBottom: dimensions.spacing.xl
          }}
        >
          {accessType === 'staff' ? 'Acceso Staff' : 'Acceso Administración'}
        </h2>

        {/* Formulario de login */}
        <div 
          className="relative w-full"
          style={{
            backgroundColor: 'rgba(164, 169, 194, 0.5)',
            padding: dimensions.spacing.lg,
            borderRadius: `${scale(20)}px`,
            maxWidth: `${scale(450)}px`,
            minHeight: accessType === 'staff' ? `${scale(200)}px` : `${scale(280)}px`
          }}
        >
          <LoginForm accessType={accessType as 'staff' | 'admin'} />
        </div>
      </div>
    </ResponsiveBackground>
  );
};

export default LoginPage;
