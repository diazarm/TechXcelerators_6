import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection, Button, AllianceSlider } from '../../components';
import { useAuth } from '../../hooks';
import { useScreenSize } from '../../context';

/** Página de inicio con HeroSection */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { scale } = useScreenSize();

  const handleAccessClick = (type: 'staff' | 'admin') => {
    navigate(`/login?type=${type}`);
  };

  return (
    <div 
      className="min-h-screen bg-white"
      style={{ 
        paddingTop: `${scale(64)}px` // pt-16 equivalente con escalado
      }}
    >
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
              style={{ 
                width: '100%',
                minWidth: `${scale(192)}px` // sm:w-48 equivalente con escalado
              }}
            >
              Staff
            </Button>

            {/* Admin Access Button */}
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleAccessClick('admin')}
              style={{ 
                width: '100%',
                minWidth: `${scale(192)}px` // sm:w-48 equivalente con escalado
              }}
            >
              Admin
            </Button>
          </>
        )}
      </HeroSection>
      
      {/* Slider de alianzas al final */}
      <div style={{ marginBottom: `${scale(48)}px` }}>
        <AllianceSlider />
      </div>
    </div>
  );
};

export default Home;
