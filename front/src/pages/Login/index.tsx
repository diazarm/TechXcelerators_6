import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginForm } from '../../components';
import { useResponsive } from '../../hooks';

/** Página de login */
const LoginPage: React.FC = () => {
  const { spacing } = useResponsive();
  const [searchParams] = useSearchParams();
  const accessType = searchParams.get('type') || 'admin';

  return (
    <div 
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ 
        backgroundImage: accessType === 'staff' 
          ? 'url(/img/BgLogin2.jpg)' 
          : 'url(/img/BgLogin.png)' 
      }}
    >
      {/* Overlay con opacidad */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: '#00000066' }}
      />
      
      {/* Contenedor del formulario centrado */}
      <div className={`relative z-10 flex flex-col items-center -mt-16 ${spacing.px.small}`}>
        {/* Logo */}
        <div 
          className="w-[300px] h-[130px] sm:w-[400px] sm:h-[173px] lg:w-[500px] lg:h-[217px]"
        >
          <img 
            src="/img/Logo3.png" 
            alt="Scala Learning" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Título dinámico según tipo de acceso */}
        <h2 
          className="text-white mb-6 -mt-4 text-2xl sm:text-3xl lg:text-4xl montserrat"
          style={{
            fontWeight: 500,
            lineHeight: '100%',
            letterSpacing: '0%'
          }}
        >
          {accessType === 'staff' ? 'Acceso Staff' : 'Acceso Administración'}
        </h2>

        {/* Formulario de login */}
        <div 
          className="rounded-[20px] relative w-full max-w-sm sm:max-w-md lg:w-[450px]"
          style={{
            height: '280px',
            backgroundColor: 'rgba(164, 169, 194, 0.5)'
          }}
        >
          <LoginForm accessType={accessType as 'staff' | 'admin'} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
