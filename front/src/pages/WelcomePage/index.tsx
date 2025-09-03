import React, { useEffect } from 'react';
import { getDefaultTeamMembers, getDefaultFeatures } from './utils';
import { useResponsive, useHeader } from '../../hooks';
import { HeroSection } from '../../components';

/** Página de bienvenida que demuestra el uso del hook useResponsive */
const WelcomePage: React.FC = () => {
  const teamMembers = getDefaultTeamMembers();
  const features = getDefaultFeatures();
  const { updateHeader } = useHeader();
  const { 
    container,
    text, 
    spacing, 
    grid, 
    shadow, 
    border
  } = useResponsive();

  // Configurar el header personalizado para esta página
  useEffect(() => {
    updateHeader({
      title: 'TechXcelerators',
      subtitle: 'Frontend Team',
      showNavButton: true
    });

    // Limpiar el header cuando se desmonte el componente
    return () => {
      updateHeader({
        title: 'scala',
        subtitle: 'Learning',
        showNavButton: true
      });
    };
  }, [updateHeader]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <HeroSection 
        title="¡Hola! ¡Bienvenido a Scala Learning!"
        description="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."
      />



      {/* Features Section */}
      <section className={`${spacing.py.large} bg-white`}>
        <div className={container}>
          <h3 className={`${text.h3} text-center text-gray-900 mb-16`}>
            Nuestras Tecnologías
          </h3>
          <div className={`${grid.columns.four} ${grid.gap.medium}`}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br from-gray-50 to-white ${border.radius.medium} p-6 ${shadow.medium} hover:${shadow.large} transition-shadow duration-300 border border-gray-100`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className={`${text.h4} text-gray-900 mb-2`}>{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`${spacing.py.large} bg-gray-50`}>
        <div className={container}>
          <h3 className={`${text.h3} text-center text-gray-900 mb-16`}>
            Nuestro Equipo
          </h3>
          <div className={`${grid.columns.three} ${grid.gap.medium}`}>
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`bg-white ${border.radius.medium} p-8 ${shadow.medium} hover:${shadow.large} transition-all duration-300 transform hover:-translate-y-2 text-center`}
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h4 className={`${text.h4} text-gray-900 mb-2`}>{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className={`${container} text-center`}>
          <p className="text-lg">
            Made with <span className="text-red-500">❤️</span> by TechXcelerators Frontend Team
          </p>
          <p className="text-gray-400 mt-2">
            React + TypeScript + Vite + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
