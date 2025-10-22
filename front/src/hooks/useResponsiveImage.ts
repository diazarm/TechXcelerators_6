import { useMemo } from 'react';
import { useComponentDimensions } from './useScaledDimensions';
import { useBreakpoints } from './useResponsive';

export type ImageType = 'background' | 'background-login' | 'background-login-full' | 'card' | 'content' | 'hero';
export type AspectRatio = '16/9' | '4/3' | '3/2' | '1/1' | 'auto';

export interface UseResponsiveImageOptions {
  /** Tipo de imagen para aplicar estilos específicos */
  type: ImageType;
  /** Ratio de aspecto de la imagen */
  aspectRatio?: AspectRatio;
  /** Si debe aplicar escalado dinámico */
  responsive?: boolean;
  /** Ancho personalizado en pixels */
  customWidth?: number;
  /** Alto personalizado en pixels */
  customHeight?: number;
  /** Forzar configuración específica para mobile */
  forceMobileConfig?: boolean;
}

export interface ResponsiveImageStyles {
  /** Estilos inline para aplicar a la imagen */
  styles: React.CSSProperties;
  /** Clases CSS responsivas */
  classes: string;
  /** Estilos para backgrounds */
  backgroundStyles: React.CSSProperties;
  /** Clases para backgrounds */
  backgroundClasses: string;
}

/**
 * Hook para manejar imágenes responsivas de manera escalable
 * 
 * Integra useComponentDimensions y useBreakpoints para proporcionar
 * estilos y clases optimizados para diferentes tipos de imagen
 * 
 * @example
 * ```tsx
 * // Para imagen de background
 * const { backgroundStyles, backgroundClasses } = useResponsiveImage({
 *   type: 'background',
 *   aspectRatio: '16/9'
 * });
 * 
 * // Para imagen de card
 * const { styles, classes } = useResponsiveImage({
 *   type: 'card',
 *   aspectRatio: '4/3'
 * });
 * ```
 */
export const useResponsiveImage = (options: UseResponsiveImageOptions): ResponsiveImageStyles => {
  const { type, aspectRatio = 'auto', responsive = true, customWidth, customHeight } = options;
  const dimensions = useComponentDimensions();
  const { isMobile, isTablet, isDesktop } = useBreakpoints();

  return useMemo(() => {
    // Configuraciones base por tipo de imagen
    const typeConfigs = {
      background: {
        baseSize: dimensions.spacing['6xl'],
        mobileSize: dimensions.spacing['4xl'],
        tabletSize: dimensions.spacing['5xl'],
        desktopSize: dimensions.spacing['6xl'],
        objectFit: 'cover' as const,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center center' as const,
        backgroundAttachment: isMobile ? 'scroll' : 'fixed' as const
      },
      'background-login': {
        baseSize: dimensions.spacing['6xl'],
        mobileSize: dimensions.spacing['4xl'],
        tabletSize: dimensions.spacing['5xl'],
        desktopSize: dimensions.spacing['6xl'],
        objectFit: 'cover' as const,
        // Configuración específica para login - balance entre cobertura y visibilidad
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'scroll' as const,
        backgroundRepeat: 'no-repeat' as const
      },
      'background-login-full': {
        baseSize: dimensions.spacing['6xl'],
        mobileSize: dimensions.spacing['4xl'],
        tabletSize: dimensions.spacing['5xl'],
        desktopSize: dimensions.spacing['6xl'],
        objectFit: 'cover' as const,
        // Configuración para ver la imagen completa pero más grande
        backgroundSize: isMobile ? 'contain' : 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'scroll' as const,
        backgroundRepeat: 'no-repeat' as const
      },
      card: {
        baseSize: dimensions.spacing['3xl'],
        mobileSize: dimensions.spacing['2xl'],
        tabletSize: dimensions.spacing['3xl'],
        desktopSize: dimensions.spacing['4xl'],
        objectFit: 'cover' as const,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center center' as const
      },
      content: {
        baseSize: dimensions.spacing['4xl'],
        mobileSize: dimensions.spacing['3xl'],
        tabletSize: dimensions.spacing['4xl'],
        desktopSize: dimensions.spacing['5xl'],
        objectFit: 'contain' as const,
        backgroundSize: 'contain' as const,
        backgroundPosition: 'center center' as const
      },
      hero: {
        baseSize: dimensions.spacing['8xl'],
        mobileSize: dimensions.spacing['5xl'],
        tabletSize: dimensions.spacing['6xl'],
        desktopSize: dimensions.spacing['8xl'],
        objectFit: 'cover' as const,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center center' as const
      }
    };

    const config = typeConfigs[type];

    // Calcular dimensiones responsivas
    const getResponsiveSize = () => {
      if (customWidth || customHeight) {
        return {
          width: customWidth ? `${customWidth}px` : 'auto',
          height: customHeight ? `${customHeight}px` : 'auto'
        };
      }

      if (!responsive) {
        return {
          width: `${config.baseSize}px`,
          height: 'auto'
        };
      }

      let size: string;
      if (isMobile) {
        size = config.mobileSize;
      } else if (isTablet) {
        size = config.tabletSize;
      } else {
        size = config.desktopSize;
      }

      return {
        width: `${size}px`,
        height: 'auto'
      };
    };

    // Calcular ratio de aspecto
    const getAspectRatio = () => {
      if (aspectRatio === 'auto') return {};
      
      const ratios = {
        '16/9': { aspectRatio: '16/9' },
        '4/3': { aspectRatio: '4/3' },
        '3/2': { aspectRatio: '3/2' },
        '1/1': { aspectRatio: '1/1' }
      };

      return ratios[aspectRatio] || {};
    };

    // Estilos para imágenes normales
    const imageStyles: React.CSSProperties = {
      ...getResponsiveSize(),
      ...getAspectRatio(),
      objectFit: config.objectFit,
      objectPosition: 'center center',
      transition: 'all 0.3s ease-in-out'
    };

    // Estilos para backgrounds con configuraciones más específicas
    const backgroundImageStyles: React.CSSProperties = {
      backgroundSize: config.backgroundSize,
      backgroundPosition: config.backgroundPosition,
      backgroundRepeat: 'backgroundRepeat' in config ? config.backgroundRepeat : 'no-repeat',
      backgroundAttachment: 'backgroundAttachment' in config ? config.backgroundAttachment : 'scroll',
      transition: 'all 0.3s ease-in-out',
      // Configuraciones específicas para mobile
      ...(isMobile && type === 'background-login' && {
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: '55% 30%', // Un poco menos hacia la derecha
        backgroundColor: '#2a2a2a' // Color de fondo más oscuro para espacios vacíos
      }),
      // Configuraciones específicas para tablet
      ...(isTablet && type === 'background-login' && {
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh'
      }),
      // Configuraciones específicas para desktop
      ...(isDesktop && type === 'background-login' && {
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh'
      }),
      // Configuraciones específicas para background-login-full
      ...(isMobile && type === 'background-login-full' && {
        minHeight: '100vh',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundColor: '#2a2a2a'
      }),
      ...(isTablet && type === 'background-login-full' && {
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh'
      }),
      ...(isDesktop && type === 'background-login-full' && {
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh'
      })
    };

    // Clases CSS responsivas
    const imageClasses = [
      'transition-all duration-300 ease-in-out',
      responsive ? 'w-full' : '',
      type === 'card' ? 'rounded-lg' : '',
      type === 'content' ? 'shadow-sm' : ''
    ].filter(Boolean).join(' ');

    const backgroundClasses = [
      'transition-all duration-300 ease-in-out',
      'bg-cover bg-center bg-no-repeat'
    ].join(' ');

    return {
      styles: imageStyles,
      classes: imageClasses,
      backgroundStyles: backgroundImageStyles,
      backgroundClasses
    };
  }, [type, aspectRatio, responsive, customWidth, customHeight, dimensions, isMobile, isTablet, isDesktop]);
};
