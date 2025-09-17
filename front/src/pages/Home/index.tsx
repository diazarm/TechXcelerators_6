import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection, Button } from '../../components';
import { useAuth } from '../../hooks';

/** Página de inicio con HeroSection */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAccessClick = (type: 'staff' | 'admin') => {
    navigate(`/login?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section con botones integrados */}
      <HeroSection 
        title="¡Bienvenido a Scala Learning!"
        description="Somos una comunidad internacional de profesionales, instructores, y estudiantes, distribuidos en los cinco continentes, con oficinas en 15 países comprometidos a comprender las necesidades de cada mercado desde una perspectiva local y global."
      >
        {/* Botones de acceso - Solo mostrar si NO está autenticado */}
        {!isAuthenticated && (
          <>
            {/* Staff Access Button */}
            <Button
              variant="primary"
              size="md"
              onClick={() => handleAccessClick('staff')}
              className="w-full sm:w-48"
            >
              Staff
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
