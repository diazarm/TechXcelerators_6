import React from 'react';
import { Card } from '../../components';
import { useCards, usePageHeader } from '../../hooks';
import { useScreenSize } from '../../context';

const Iniciativas: React.FC = () => {
  const { getContainerForScreen, dimensions, getGapForScreen } = useScreenSize();
  const { cards, handleCardClick } = useCards('iniciativas');
  usePageHeader(); // Configuración automática del título

  return (
    <div className={`${getContainerForScreen()} pb-32`}>
      {/* Subtítulo renderizado dentro de la página */}
      <div 
        className="text-center"
        style={{ 
          marginBottom: dimensions.spacing.lg,
          marginTop: `-${dimensions.spacing.md}`
        }}
      >
        <h2 
          className="font-normal leading-[30px] tracking-[0%]"
          style={{ 
            fontSize: '20px',
            color: '#9795B5',
            fontFamily: 'DM Sans, sans-serif'
          }}
        >
          Planes de acción con las alianzas internas
        </h2>
      </div>

      {/* Grid de Tarjetas */}
      {cards.length > 0 ? (
        <div 
          className={`flex flex-col md:flex-row justify-center ${getGapForScreen('medium')}`}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              leftHeaderContent={card.leftHeaderContent}
              rightHeaderContent={card.rightHeaderContent}
              image={card.image}
              onButtonClick={() => handleCardClick(card)}
              className="mx-auto"
            />
          ))}
        </div>
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
            Las tarjetas de iniciativas se cargarán aquí una vez configuradas.
          </p>
        </div>
      )}
    </div>
  );
};

export default Iniciativas;
