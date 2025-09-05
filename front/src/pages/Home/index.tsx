import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../../components';
import { useAuth } from '../../hooks';

/** Página de inicio con HeroSection y sección de beneficios */
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
            {/* Admin Access Button */}
            <button
              onClick={() => handleAccessClick('admin')}
              className="w-full sm:w-48 h-12 rounded-[50px] text-white transition-colors flex items-center justify-center gap-2 istok-web"
              style={{
                backgroundColor: '#5D5A88',
                boxShadow: '0px 4px 4px 0px #00000040',
                fontWeight: 400,
                fontSize: '16px'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Admin
            </button>

            {/* User Access Button */}
            <button
              onClick={() => handleAccessClick('user')}
              className="w-full sm:w-48 h-12 rounded-[50px] text-white transition-colors flex items-center justify-center gap-2 istok-web"
              style={{
                backgroundColor: '#FF6E00',
                boxShadow: '0px 4px 4px 0px #00000040',
                fontWeight: 400,
                fontSize: '16px'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              Usuario
            </button>
          </>
        )}
      </HeroSection>

      {/* Benefits and Functionalities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5D5A88] mb-4">
              Conoce nuestros beneficios y funcionalidades
            </h2>
            <p className="text-[#827896] max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }, (_, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#A4A9C2] rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-[#5D5A88] rounded"></div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-[#5D5A88] mb-3">
                  Lorem Ipsum
                </h3>
                
                {/* Description */}
                <p className="text-[#827896] mb-4">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.
                </p>
                
                {/* Call to Action */}
                <a 
                  href="#" 
                  className="text-[#5D5A88] font-medium hover:underline inline-flex items-center"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
