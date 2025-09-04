import React from 'react';
import { LoginForm } from '../../components';

/** Página de login */
const LoginPage: React.FC = () => {

  return (
    <div 
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: 'url(/img/BgLogin.png)' }}
    >
      {/* Contenedor del formulario centrado */}
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <div 
          className="w-80 h-32"
        >
          <img 
            src="/img/LogoScala2.png" 
            alt="Scala Learning" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Título "Acceso Usuario" */}
        <h2 
          className="text-[#555D8C] font-regular text-4xl"
          style={{
            fontFamily: 'Istok Web'
          }}
        >
          Acceso Usuario
        </h2>

        {/* Formulario de login */}
        <div 
          className="w-96 h-[400px] opacity-80 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: '#A4A9C2'
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
