import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

/**
 * Tipos para el contexto de tamaño de pantalla
 */
export interface ScreenSizeContextType {
  // TODO LO ACTUAL (sin tocar)
  // useResponsive
  scaleFactor: number;
  viewport: { width: number; height: number };
  scale: (value: number) => number;
  scaledStyles: (baseStyles: Record<string, number>) => Record<string, string>;
  container: string;
  containerSmall: string;
  containerLarge: string;
  containerXLarge: string;
  containerXXLarge: string;
  spacing: {
    py: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
    px: {
      small: string;
      medium: string;
      large: string;
    };
    my: {
      small: string;
      medium: string;
      large: string;
    };
  };
  text: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    body: string;
    small: string;
    xsmall: string;
  };
  grid: {
    columns: {
      auto: string;
      two: string;
      three: string;
      four: string;
      sidebar: string;
      main: string;
      threeXLarge: string;
      fourXLarge: string;
      autoXLarge: string;
    };
    gap: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
    };
  };
  flex: {
    row: string;
    col: string;
    center: string;
    between: string;
    start: string;
    end: string;
  };
  position: {
    center: string;
    top: string;
    bottom: string;
  };
  shadow: {
    small: string;
    medium: string;
    large: string;
  };
  border: {
    radius: {
      small: string;
      medium: string;
      large: string;
    };
  };
  animation: {
    fadeIn: string;
    slideIn: string;
  };
  
  // useBreakpoints
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  isXLarge: boolean;
  isXXLarge: boolean;
  isUltraLarge: boolean;
  
  // useComponentDimensions
  dimensions: {
    card: {
      small: string;
      medium: string;
      rectangular: string;
    };
    button: {
      height: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
      };
      minWidth: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
      '8xl': string;
    };
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
      '8xl': string;
    };
  };
  
  // LO NUEVO (adicional)
  getContainerForScreen: () => string;
  getGridForScreen: (type: 'auto' | 'two' | 'three' | 'four') => string;
  getGapForScreen: (type: 'small' | 'medium' | 'large') => string;
}

/**
 * Contexto para manejo de tamaño de pantalla
 */
const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

/**
 * Hook para usar el contexto de tamaño de pantalla
 */
export const useScreenSize = (): ScreenSizeContextType => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error('useScreenSize debe ser usado dentro de un ScreenSizeProvider');
  }
  return context;
};

/**
 * Props para el provider del contexto
 */
export interface ScreenSizeProviderProps {
  children: ReactNode;
}

export { ScreenSizeContext };
