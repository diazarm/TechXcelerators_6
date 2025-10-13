import React from 'react';
import { X, ChevronDown } from 'react-feather';
import type { Alliance } from '../../types/alliance';
import { useResponsive } from '../../hooks/useResponsive';
import { getLogoForAlliance } from '../../services';
import { Button } from '../Button';

interface AllianceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  alliances: Alliance[];
  onSelect: (alliance: Alliance) => void;
  sectionTitle: string;
  isLoading?: boolean;
  // Props para selector de programas (cuando una alianza tiene múltiples links)
  showProgramSelector?: boolean;
  selectedAlliance?: Alliance | null;
  availablePrograms?: string[];
  selectedProgramIndex?: number;
  onProgramChange?: (index: number) => void;
  onProgramConfirm?: () => void;
  onBackToAlliances?: () => void;
}


export const AllianceSelectionModal: React.FC<AllianceSelectionModalProps> = ({
  isOpen,
  onClose,
  alliances,
  onSelect,
  sectionTitle,
  isLoading = false,
  showProgramSelector = false,
  selectedAlliance = null,
  availablePrograms = [],
  selectedProgramIndex = 0,
  onProgramChange,
  onProgramConfirm,
  onBackToAlliances
}) => {
  const { scale } = useResponsive();
  
  if (!isOpen) return null;

  // Usar el servicio de logos centralizado

  const handleAllianceClick = (alliance: Alliance) => {
    onSelect(alliance);
    // NO cerrar automáticamente - dejar que handleAllianceSelect decida
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 overflow-hidden w-full h-full sm:w-auto sm:h-auto sm:max-w-[768px] sm:max-h-[90vh] flex flex-col"
        style={{ 
          borderRadius: `${scale(16)}px`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header más compacto */}
        <div 
          className="relative bg-gradient-to-br from-[#5D5A88] via-[#6B6A9A] to-[#827896] flex-shrink-0"
          style={{ 
            paddingLeft: `${scale(16)}px`,
            paddingRight: `${scale(16)}px`,
            paddingTop: `${scale(12)}px`,
            paddingBottom: `${scale(12)}px`
          }}
        >
          <button
            onClick={onClose}
            className="absolute text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200 group cursor-pointer z-50"
            style={{
              top: `${scale(16)}px`,
              right: `${scale(16)}px`,
              padding: `${scale(6)}px`,
              pointerEvents: 'auto'
            }}
          >
            <X size={scale(18)} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
          
          <div 
            className="relative z-10"
            style={{ paddingRight: `${scale(48)}px` }}
          >
            <h2 
              className="font-bold text-white tracking-tight"
              style={{ 
                fontSize: `${scale(20)}px`,
                marginBottom: `${scale(4)}px`
              }}
            >
              Seleccionar Alianza
            </h2>
            <p 
              className="text-white/80 leading-relaxed"
              style={{ fontSize: `${scale(12)}px` }}
            >
              {sectionTitle}
            </p>
          </div>
        </div>

        {/* Content con scroll condicional */}
        <div 
          className="bg-gradient-to-b from-white to-gray-50/50 flex-1 overflow-y-auto"
          style={{ 
            padding: `${scale(24)}px`
          }}
        >
          {isLoading ? (
            <div 
              className="flex flex-col items-center justify-center"
              style={{ paddingTop: `${scale(48)}px`, paddingBottom: `${scale(48)}px` }}
            >
              <div className="relative">
                <div 
                  className="animate-spin rounded-full border-4 border-gray-200 border-t-[#FF6E00]"
                  style={{ 
                    height: `${scale(40)}px`,
                    width: `${scale(40)}px`
                  }}
                ></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-transparent border-r-[#FF6E00]/30 animate-spin" 
                  style={{
                    animationDirection: 'reverse', 
                    animationDuration: '1.5s',
                    height: `${scale(40)}px`,
                    width: `${scale(40)}px`
                  }}
                ></div>
              </div>
              <span 
                className="text-[#5D5A88] font-medium"
                style={{ 
                  marginTop: `${scale(12)}px`,
                  fontSize: `${scale(14)}px`
                }}
              >
                Cargando alianzas...
              </span>
            </div>
          ) : (
            <div 
              className="grid grid-cols-3"
              style={{
                gap: `${scale(16)}px`
              }}
            >
              {alliances.map((alliance, index) => (
                <div
                  key={alliance._id}
                  onClick={() => handleAllianceClick(alliance)}
                  className="group cursor-pointer relative bg-white border border-gray-200/50 rounded-xl hover:border-[#FF6E00]/50 hover:shadow-lg hover:shadow-[#FF6E00]/5 transition-all duration-200 transform hover:scale-102 animate-in fade-in slide-in-from-bottom-2"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    padding: `${scale(16)}px`,
                    borderRadius: `${scale(12)}px`
                  }}
                >
                  {/* Logo Container más compacto */}
                  <div 
                    className="flex justify-center"
                    style={{ marginBottom: `${scale(12)}px` }}
                  >
                    <div className="relative">
                      <div 
                        className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 group-hover:border-[#FF6E00]/40 group-hover:from-[#FFF5F0] group-hover:to-[#FFE5D6] flex items-center justify-center overflow-hidden transition-all duration-200 shadow-sm group-hover:shadow-md"
                        style={{
                          width: `${scale(64)}px`,
                          height: `${scale(64)}px`,
                          borderRadius: `${scale(12)}px`
                        }}
                      >
                        <img
                          src={getLogoForAlliance(alliance.siglas)}
                          alt={`Logo ${alliance.siglas}`}
                          className="object-contain filter group-hover:brightness-105 transition-all duration-200"
                          style={{
                            width: `${scale(48)}px`,
                            height: `${scale(48)}px`
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/img/Logo3.png';
                          }}
                        />
                      </div>
                      {/* Indicador de hover más sutil */}
                      <div 
                        className="absolute bg-[#FF6E00] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-75 group-hover:scale-100"
                        style={{
                          top: `${scale(-2)}px`,
                          right: `${scale(-2)}px`,
                          width: `${scale(16)}px`,
                          height: `${scale(16)}px`
                        }}
                      >
                        <div 
                          className="bg-white rounded-full"
                          style={{
                            width: `${scale(6)}px`,
                            height: `${scale(6)}px`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Alliance Info más compacto */}
                  <div className="text-center">
                    <h3 
                      className="font-semibold text-[#5D5A88] group-hover:text-[#FF6E00] transition-colors duration-200"
                      style={{ 
                        fontSize: `${scale(14)}px`,
                        marginBottom: `${scale(4)}px`
                      }}
                    >
                      {alliance.siglas}
                    </h3>
                    <p 
                      className="text-[#827896] leading-tight line-clamp-2 group-hover:text-[#5D5A88] transition-colors duration-200"
                      style={{ fontSize: `${scale(12)}px` }}
                    >
                      {alliance.name}
                    </p>
                  </div>

                  {/* Efectos de hover más sutiles */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#FF6E00]/3 via-transparent to-[#FF6E00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{ borderRadius: `${scale(12)}px` }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selector de programas (cuando una alianza tiene múltiples opciones) */}
        {showProgramSelector && selectedAlliance && (
          <div 
            className="border-t border-gray-200 flex-shrink-0"
            style={{ 
              padding: `${scale(12)}px ${scale(24)}px`,
              backgroundColor: '#FAFAFA'
            }}
          >
            {/* Mensaje, dropdown y botones con espacio */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span 
                  className="text-gray-600 text-sm"
                  style={{ fontSize: `${scale(12)}px` }}
                >
                  Selecciona programa de {selectedAlliance.siglas}:
                </span>
                
                {/* Dropdown muy compacto */}
                <div className="relative" style={{ minWidth: `${scale(180)}px` }}>
                  <select
                    value={selectedProgramIndex}
                    onChange={(e) => onProgramChange?.(parseInt(e.target.value))}
                    className="w-full appearance-none bg-white border border-gray-300 text-gray-700 rounded cursor-pointer hover:border-[#5D5A88] focus:outline-none focus:ring-1 focus:ring-[#5D5A88] focus:border-transparent transition-colors"
                    style={{
                      padding: `${scale(6)}px ${scale(28)}px ${scale(6)}px ${scale(8)}px`,
                      fontSize: `${scale(12)}px`
                    }}
                  >
                    {availablePrograms.map((program, index) => (
                      <option key={index} value={index}>
                        {program}
                      </option>
                    ))}
                  </select>
                  
                  {/* Icono chevron */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none"
                    style={{ paddingRight: `${scale(8)}px` }}
                  >
                    <ChevronDown size={scale(14)} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Botones hacia la derecha */}
              <div className="flex gap-2 sm:ml-auto">
                <Button
                  onClick={onBackToAlliances}
                  variant="secondary"
                  size="xs"
                >
                  Volver
                </Button>
                <Button
                  onClick={onProgramConfirm}
                  variant="primary"
                  size="xs"
                >
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer más compacto */}
        {!showProgramSelector && (
          <div 
            className="bg-gray-50/50 border-t border-gray-100"
            style={{ 
              paddingLeft: `${scale(24)}px`,
              paddingRight: `${scale(24)}px`,
              paddingTop: `${scale(12)}px`,
              paddingBottom: `${scale(12)}px`
            }}
          >
            <p 
              className="text-center text-gray-500"
              style={{ fontSize: `${scale(12)}px` }}
            >
              Selecciona una alianza para acceder a los recursos específicos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllianceSelectionModal;
