import React from 'react';
import { HeroSection } from '../../components';

/** Página de inicio con HeroSection y sección de beneficios */
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection 
        title="¡Hola! ¡Bienvenido a Scala Learning!"
        description="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."
      />

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
