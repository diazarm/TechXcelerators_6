import { useResponsive } from './useResponsive';

/**
 * Hook para manejar dimensiones escaladas basadas en diseños de Figma
 * 
 * @param baseDimensions - Dimensiones base del diseño de Figma
 * @returns Dimensiones escaladas según el viewport actual
 * 
 * @example
 * const { width, height, fontSize, padding } = useScaledDimensions({
 *   width: 320,
 *   height: 320,
 *   fontSize: 16,
 *   padding: 24
 * });
 */
export const useScaledDimensions = (baseDimensions: Record<string, number>) => {
  const { scale } = useResponsive();
  
  const scaledDimensions: Record<string, string> = {};
  
  Object.entries(baseDimensions).forEach(([key, value]) => {
    scaledDimensions[key] = `${scale(value)}px`;
  });
  
  return scaledDimensions;
};

/**
 * Hook para obtener dimensiones escaladas de componentes comunes
 */
export const useComponentDimensions = () => {
  const { scale } = useResponsive();
  
  return {
    // Cards
    card: {
      small: `${scale(240)}px`,
      medium: `${scale(320)}px`,
      rectangular: `${scale(480)}px`
    },
    
    // Botones
    button: {
      height: {
        xs: `${scale(30)}px`,
        sm: `${scale(35)}px`,
        md: `${scale(40)}px`,
        lg: `${scale(45)}px`
      },
      minWidth: {
        xs: `${scale(80)}px`,
        sm: `${scale(90)}px`,
        md: `${scale(100)}px`,
        lg: `${scale(120)}px`
      }
    },
    
    // Espaciado
    spacing: {
      xs: `${scale(4)}px`,
      sm: `${scale(8)}px`,
      md: `${scale(16)}px`,
      lg: `${scale(24)}px`,
      xl: `${scale(32)}px`,
      '2xl': `${scale(48)}px`,
      '3xl': `${scale(64)}px`,
      '4xl': `${scale(80)}px`,
      '5xl': `${scale(96)}px`,
      '6xl': `${scale(128)}px`,
      '8xl': `${scale(192)}px`
    },
    
    // Tipografía
    fontSize: {
      xs: `${scale(14)}px`,
      sm: `${scale(16)}px`,
      md: `${scale(18)}px`,
      lg: `${scale(20)}px`,
      xl: `${scale(22)}px`,
      '2xl': `${scale(26)}px`,
      '3xl': `${scale(32)}px`,
      '4xl': `${scale(36)}px`,
      '5xl': `${scale(40)}px`,
      '6xl': `${scale(48)}px`,
      '8xl': `${scale(64)}px`
    }
  };
};
