import React from 'react';
import { useScreenSize } from '../../../context';
import { ALLIANCE_DATA } from '../../../constants';
import { OptimizedImage } from '../../UI/OptimizedImage';
import type { AllianceSliderProps, AllianceItemProps } from './types';
import { scale } from '../../../utils';

/**
 * Componente individual de logo de alianza
 */
const AllianceItem: React.FC<AllianceItemProps> = ({ alliance }) => {
  const { scale } = useScreenSize();
  
  // Tamaño base de 80px escalado según pantalla, más grande para Uninorte
  const baseSize = alliance.id === 'uninorte' ? 100 : 80;
  const logoSize = scale(baseSize);
  const containerWidth = scale(baseSize * 1.8);
  const containerHeight = scale(80); // Altura fija para todos los logos
  const marginH = scale(24);

  const content = (
    <OptimizedImage
      src={alliance.logo}
      alt={alliance.name}
      className="object-contain transition-transform duration-300 hover:scale-110"
      style={{
        width: `${logoSize}px`,
        height: `${logoSize}px`,
        maxWidth: `${logoSize}px`,
        maxHeight: `${logoSize}px`,
      }}
      loading="lazy"
    />
  );

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        marginLeft: `${marginH}px`,
        marginRight: `${marginH}px`,
      }}
    >
      {alliance.url ? (
        <a
          href={alliance.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visitar ${alliance.name} - ${alliance.url}`}
          className="cursor-pointer relative group"
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
          }}
        >
          {content}
          {/* Tooltip */}
          <span 
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50"
            style={{
              fontSize: scale(12),
            }}
          >
            {alliance.url}
          </span>
        </a>
      ) : (
        <div
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

/**
 * Componente principal del slider de alianzas con movimiento infinito
 */
export const AllianceSlider: React.FC<AllianceSliderProps> = ({ className = '' }) => {
  const { dimensions } = useScreenSize();

  // Triplicamos los logos para asegurar un loop perfecto sin gaps
  const duplicatedAlliances = [...ALLIANCE_DATA, ...ALLIANCE_DATA, ...ALLIANCE_DATA];

  return (
    <section className={`w-full overflow-hidden ${className}`}>
      {/* Título */}
      <div 
        className="text-center"
        style={{
          paddingTop: dimensions.spacing['2xl'],
          paddingBottom: dimensions.spacing['3xl'],
        }}
      >
        <h2 
          className="text-[#585D8A] font-bold"
          style={{
            fontSize: dimensions.fontSize['2xl'],
            lineHeight: dimensions.fontSize['2xl'],
          }}
        >
          Nuestras alianzas
        </h2>
      </div>

      {/* Franja de logos con animación infinita */}
      <div 
        className="w-full"
        style={{
          paddingTop: dimensions.spacing.lg,
          paddingBottom: dimensions.spacing.lg,
        }}
      >
        <div className="relative w-full overflow-visible"
  style={{
    paddingTop: `${scale(8)}px`,
    paddingBottom: `${scale(8)}px`
  }}>
          <style>
            {`
              @keyframes scroll-logos {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-100% / 3));
                }
              }
              
              .logos-track {
                animation: scroll-logos 60s linear infinite;
                display: flex;
                width: max-content;
              }
            `}
          </style>
          
          <div className="logos-track">
            {duplicatedAlliances.map((alliance, index) => (
              <AllianceItem 
                key={`${alliance.id}-${index}`}
                alliance={alliance}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
