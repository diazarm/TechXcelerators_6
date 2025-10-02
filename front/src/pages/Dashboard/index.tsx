import React from 'react';
import { CardGrid } from '../../components';
import { useCards, usePageHeader } from '../../hooks';
import { useScreenSize } from '../../context';

/**
 * Página Dashboard
 * 
 * Página principal del dashboard con tarjetas de navegación.
 * Utiliza el hook useCards para obtener la configuración de tarjetas.
 */
const Dashboard: React.FC = () => {
  const { getContainerForScreen, dimensions } = useScreenSize();
  const { cards, handleCardClick } = useCards('dashboard');
  usePageHeader(); // Configuración automática del título

  return (
    <div className={`${getContainerForScreen()}`}>
      {/* Grid de Tarjetas - El título ahora viene del Header dinámico */}
      {cards.length > 0 ? (
        <CardGrid 
          cards={cards} 
          onCardClick={handleCardClick}
        />
      ) : (
        /* Estado vacío */
        <div className="text-center py-12">
          <div 
            className="bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              width: dimensions.spacing.xl,
              height: dimensions.spacing.xl
            }}
          >
            <svg 
              className="text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{
                width: dimensions.spacing.md,
                height: dimensions.spacing.md
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 
            className="text-gray-900 font-semibold mb-2"
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            No hay tarjetas disponibles
          </h3>
          <p 
            className="text-gray-600"
            style={{ fontSize: dimensions.fontSize.md }}
          >
            Las tarjetas del dashboard se cargarán aquí una vez configuradas.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
