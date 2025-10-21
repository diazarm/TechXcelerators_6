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

  // NUEVO: Clases responsive para secciones complejas (tablas, formularios)
  const getResponsivePadding = (size: 'small' | 'medium' | 'large' = 'medium'): string => {
    const sizes = {
      small: 'p-3 sm:p-4 lg:p-5',
      medium: 'p-4 sm:p-6 lg:p-8',
      large: 'p-6 sm:p-8 lg:p-10'
    };
    return sizes[size];
  };

  const getResponsiveMargin = (size: 'small' | 'medium' | 'large' = 'medium'): string => {
    const sizes = {
      small: 'mb-3 sm:mb-4 lg:mb-5',
      medium: 'mb-4 sm:mb-6 lg:mb-8',
      large: 'mb-6 sm:mb-8 lg:mb-10'
    };
    return sizes[size];
  };

  const getResponsiveText = (size: 'small' | 'medium' | 'large' = 'medium'): string => {
    const sizes = {
      small: 'text-sm sm:text-base',
      medium: 'text-base sm:text-lg lg:text-xl',
      large: 'text-lg sm:text-xl lg:text-2xl'
    };
    return sizes[size];
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
    getResponsivePadding,
    getResponsiveMargin,
    getResponsiveText,
  };

  return (
    <ScreenSizeContext.Provider value={contextValue}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
