import React, { useEffect } from 'react';
import { getDefaultTeamMembers, getDefaultFeatures } from './utils';
import { useResponsive, useBreakpoints, useHeader } from '../../hooks';

/** Página de bienvenida que demuestra el uso del hook useResponsive */
const WelcomePage: React.FC = () => {
  const teamMembers = getDefaultTeamMembers();
  const features = getDefaultFeatures();
  const { updateHeader } = useHeader();
  const { 
    container, 
    containerSmall, 
    containerLarge,
    text, 
    spacing, 
    grid, 
    shadow, 
    border,
    flex,
    position,
    animation
  } = useResponsive();
  
  const { isMobile, isTablet, isDesktop, isLarge } = useBreakpoints();

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
                 <div className={`${isMobile ? containerSmall : container} ${spacing.py.small}`}>
           <div className="text-center">
             <h1 className={`${text.h1} text-gray-900 mb-4 ${animation.fadeIn}`}>
               <span className="inline-block animate-bounce mr-4">🎉</span>
               ¡Bienvenido al Equipo Frontend!
             </h1>
             <p className={`${text.body} text-gray-600 max-w-3xl mx-auto`}>
               Construyendo experiencias digitales extraordinarias con las mejores tecnologías
             </p>
             {/* Mostrar información adicional solo en desktop */}
             {isDesktop && (
               <div className={`${text.small} text-gray-500 mt-4 ${animation.slideIn}`}>
                 🚀 Proyecto preparado para desarrollo en equipo
               </div>
             )}
           </div>
         </div>
      </header>

      {/* Hero Section */}
      <section className={`${spacing.py.large} ${spacing.px.small}`}>
        <div className={isLarge ? containerLarge : container}>
          <div className={`${grid.columns.two} ${grid.gap.large} items-center`}>
            <div className="space-y-8">
              <h2 className={`${text.h2} text-gray-900`}>
                TechXcelerators{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Frontend
                </span>
              </h2>
              <p className={`${text.body} text-gray-600 leading-relaxed`}>
                Somos un equipo apasionado por crear interfaces intuitivas, 
                experiencias de usuario excepcionales y código limpio y mantenible.
              </p>
                             {/* Stats responsive - cambian layout según breakpoint */}
               <div className={`${isMobile ? 'grid grid-cols-1 gap-4' : isTablet ? 'grid grid-cols-2 gap-6' : 'grid grid-cols-3 gap-6'}`}>
                 <div className={`${flex.center} ${flex.col} ${isMobile ? 'p-4' : 'p-6'}`}>
                   <div className={`${isMobile ? text.h3 : text.h2} font-bold text-blue-600`}>100%</div>
                   <div className={text.small}>TypeScript</div>
                 </div>
                 <div className={`${flex.center} ${flex.col} ${isMobile ? 'p-4' : 'p-6'}`}>
                   <div className={`${isMobile ? text.h3 : text.h2} font-bold text-purple-600`}>24/7</div>
                   <div className={text.small}>Innovación</div>
                 </div>
                 <div className={`${flex.center} ${flex.col} ${isMobile ? 'p-4' : 'p-6'}`}>
                   <div className={`${isMobile ? text.h3 : text.h2} font-bold text-green-600`}>∞</div>
                   <div className={text.small}>Posibilidades</div>
                 </div>
               </div>
            </div>
            <div className="relative">
              <div className={`bg-white ${border.radius.large} ${shadow.large} p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 ${position.center}`}>
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div><span className="text-purple-600">const</span> <span className="text-blue-600">team</span> = <span className="text-green-600">'Frontend'</span>;</div>
                  <div><span className="text-purple-600">const</span> <span className="text-blue-600">passion</span> = <span className="text-green-600">'Infinite'</span>;</div>
                  <div><span className="text-purple-600">const</span> <span className="text-blue-600">future</span> = <span className="text-green-600">'Bright'</span>;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
