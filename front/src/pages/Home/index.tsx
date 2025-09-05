import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection, Button } from '../../components';
import { useAuth } from '../../hooks';

/** Página de inicio con HeroSection */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAccessClick = (type: 'user' | 'admin') => {
    navigate(`/login?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con botones integrados */}
      <HeroSection 
        title="¡Bienvenido a Scala Learning!"
        description="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."
      >
        {/* Botones de acceso - Solo mostrar si NO está autenticado */}
        {!isAuthenticated && (
          <>
            {/* User Access Button */}
            <Button
              variant="primary"
              size="md"
              onClick={() => handleAccessClick('user')}
              className="w-full sm:w-48"
            >
              Usuario
            </Button>

            {/* Admin Access Button */}
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleAccessClick('admin')}
              className="w-full sm:w-48"
            >
              Admin
            </Button>
          </>
        )}
      </HeroSection>
    </div>
  );
};

export default Home;
