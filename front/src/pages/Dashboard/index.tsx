import React from 'react';
import { CardGrid } from '../../components';
import { useCards } from '../../hooks';
import { useResponsive } from '../../hooks';

/**
 * Página Dashboard
 * 
 * Página principal del dashboard con tarjetas de navegación.
 * Utiliza el hook useCards para obtener la configuración de tarjetas.
 */
const Dashboard: React.FC = () => {
  const responsive = useResponsive();
  const { cards, handleCardClick } = useCards('dashboard');

  return (
    <div className={`${responsive.container}`}>
      {/* Header del Dashboard */}
      <div className="text-center mb-8 pt-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#5D5A88] font-semibold">
          Conoce nuestros beneficios y funcionalidades
        </h1>
      </div>

      {/* Grid de Tarjetas */}
      {cards.length > 0 ? (
        <CardGrid 
          cards={cards} 
          onCardClick={handleCardClick}
        />
      ) : (
        /* Estado vacío */
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className={`${responsive.text.h3} text-gray-900 font-semibold mb-2`}>
            No hay tarjetas disponibles
          </h3>
          <p className={`${responsive.text.body} text-gray-600`}>
            Las tarjetas del dashboard se cargarán aquí una vez configuradas.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
