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
      large: `${scale(400)}px`
    },
    
    // Botones
    button: {
      height: {
        xs: `${scale(30)}px`,
        sm: `${scale(40)}px`,
        md: `${scale(50)}px`,
        lg: `${scale(60)}px`
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
      '2xl': `${scale(48)}px`
    },
    
    // Tipografía
    fontSize: {
      xs: `${scale(12)}px`,
      sm: `${scale(14)}px`,
      md: `${scale(16)}px`,
      lg: `${scale(18)}px`,
      xl: `${scale(20)}px`,
      '2xl': `${scale(24)}px`,
      '3xl': `${scale(30)}px`
    }
  };
};
