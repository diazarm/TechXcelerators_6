import { useResponsive, useBreakpoints } from '../../hooks/useResponsive';
import { useComponentDimensions } from '../../hooks/useScaledDimensions';
import { ScreenSizeContext } from './ScreenSizeContext';
import type { ScreenSizeContextType, ScreenSizeProviderProps } from './ScreenSizeContext';

/**
 * Provider para el contexto de tamaño de pantalla
 * 
 * Unifica todos los hooks de responsividad existentes y agrega lógica
 * automática para pantallas grandes sin romper la funcionalidad actual.
 */
export const ScreenSizeProvider = ({ children }: ScreenSizeProviderProps) => {
  // Usar los hooks existentes que ya funcionan
  const responsive = useResponsive();
  const breakpoints = useBreakpoints();
  const dimensions = useComponentDimensions();

  // LO NUEVO: Funciones automáticas para pantallas grandes
  const getContainerForScreen = (): string => {
    if (breakpoints.isUltraLarge) return responsive.containerXXLarge;
    if (breakpoints.isXXLarge) return responsive.containerXXLarge;
    if (breakpoints.isXLarge) return responsive.containerXLarge;
    return responsive.container; // Por defecto (comportamiento actual)
  };

  const getGridForScreen = (type: 'auto' | 'two' | 'three' | 'four'): string => {
    switch (type) {
      case 'auto':
        if (breakpoints.isXLarge || breakpoints.isXXLarge || breakpoints.isUltraLarge) {
          return responsive.grid.columns.autoXLarge;
        }
        return responsive.grid.columns.auto;
      case 'two':
        return responsive.grid.columns.two; // No hay versión XLarge para dos columnas
      case 'three':
        if (breakpoints.isXLarge || breakpoints.isXXLarge || breakpoints.isUltraLarge) {
          return responsive.grid.columns.threeXLarge;
        }
        return responsive.grid.columns.three;
      case 'four':
        if (breakpoints.isXLarge || breakpoints.isXXLarge || breakpoints.isUltraLarge) {
          return responsive.grid.columns.fourXLarge;
        }
        return responsive.grid.columns.four;
      default:
        return responsive.grid.columns.three;
    }
  };

  const getGapForScreen = (type: 'small' | 'medium' | 'large'): string => {
    if (breakpoints.isUltraLarge) {
      return responsive.grid.gap.xxlarge;
    }
    if (breakpoints.isXXLarge || breakpoints.isXLarge) {
      return responsive.grid.gap.xlarge;
    }
    
    // Comportamiento actual para pantallas normales
    switch (type) {
      case 'small':
        return responsive.grid.gap.small;
      case 'medium':
        return responsive.grid.gap.medium;
      case 'large':
        return responsive.grid.gap.large;
      default:
        return responsive.grid.gap.medium;
    }
  };

  // Valor del contexto: TODO lo actual + LO NUEVO
  const contextValue: ScreenSizeContextType = {
    // TODO LO ACTUAL (sin tocar)
    ...responsive,
    ...breakpoints,
    dimensions,
    
    // LO NUEVO (adicional)
    getContainerForScreen,
    getGridForScreen,
    getGapForScreen,
  };

  return (
    <ScreenSizeContext.Provider value={contextValue}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
