import React from 'react';
import { useScreenSize } from '../../context';
import { ALLIANCE_DATA } from './allianceData';
import type { AllianceSliderProps, AllianceItemProps } from './types';

/**
 * Componente individual de logo de alianza
 */
const AllianceItem: React.FC<AllianceItemProps> = ({ alliance }) => {
  const { scale, isMobile, isTablet } = useScreenSize();
  
  // Tamaño fijo escalado según pantalla
  const getLogoSize = () => {
    if (isMobile) return scale(60);
    if (isTablet) return scale(80);
    return scale(100);
  };

  const logoSize = getLogoSize();

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{
        height: `${logoSize}px`,
        minHeight: `${logoSize}px`
      }}
    >
      <div
        style={{
          width: `${logoSize}px`,
          height: `${logoSize}px`,
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      >
        <img
          src={alliance.logo}
          alt={alliance.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

/**
 * Componente principal del slider de alianzas
 */
export const AllianceSlider: React.FC<AllianceSliderProps> = ({ className = '' }) => {
  const { dimensions, scale, isMobile, isTablet } = useScreenSize();

  return (
    <section className={`w-full ${className}`}>
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

      {/* Franja de logos */}
      <div 
        style={{
          paddingTop: dimensions.spacing.lg,
          paddingBottom: dimensions.spacing.lg,
          paddingLeft: dimensions.spacing.lg,
          paddingRight: dimensions.spacing.lg,
        }}
      >
        <div className="w-full">
          <div 
            className={`grid gap-4 ${
              isMobile ? 'grid-cols-4' : 
              isTablet ? 'grid-cols-6' : 
              'grid-cols-8'
            }`}
            style={{
              gap: `${scale(isMobile ? 8 : 16)}px`
            }}
          >
            {ALLIANCE_DATA.map((alliance) => (
              <AllianceItem 
                key={alliance.id}
                alliance={alliance}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
