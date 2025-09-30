import React from 'react';
import { useResponsiveImage } from '../../hooks';
import type { ImageType, AspectRatio } from '../../hooks/useResponsiveImage';

export interface ResponsiveImageProps {
  /** Ruta de la imagen */
  src: string;
  /** Texto alternativo para la imagen */
  alt: string;
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
  /** Clases CSS adicionales */
  className?: string;
  /** Estilos adicionales */
  style?: React.CSSProperties;
  /** Evento de click */
  onClick?: () => void;
}

/**
 * Componente de imagen responsiva que se adapta automáticamente
 * a diferentes tamaños de pantalla usando el hook useResponsiveImage
 * 
 * @example
 * ```tsx
 * // Imagen de background
 * <ResponsiveImage
 *   src="/img/background.jpg"
 *   alt="Background"
 *   type="background"
 *   aspectRatio="16/9"
 * />
 * 
 * // Imagen de card
 * <ResponsiveImage
 *   src="/img/card-image.jpg"
 *   alt="Card content"
 *   type="card"
 *   aspectRatio="4/3"
 * />
 * ```
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  type,
  aspectRatio,
  responsive = true,
  customWidth,
  customHeight,
  className = '',
  style = {},
  onClick
}) => {
  const { styles, classes } = useResponsiveImage({
    type,
    aspectRatio,
    responsive,
    customWidth,
    customHeight
  });

  return (
    <img
      src={src}
      alt={alt}
      className={`${classes} ${className}`}
      style={{ ...styles, ...style }}
      onClick={onClick}
      loading="lazy"
    />
  );
};

export interface ResponsiveBackgroundProps {
  /** Ruta de la imagen de background */
  src: string;
  /** Tipo de background para aplicar estilos específicos */
  type: 'background' | 'background-login' | 'background-login-full';
  /** Ratio de aspecto del background */
  aspectRatio?: AspectRatio;
  /** Si debe aplicar escalado dinámico */
  responsive?: boolean;
  /** Alto personalizado en pixels */
  customHeight?: number;
  /** Forzar configuración específica para mobile */
  forceMobileConfig?: boolean;
  /** Clases CSS adicionales */
  className?: string;
  /** Estilos adicionales */
  style?: React.CSSProperties;
  /** Contenido hijo */
  children?: React.ReactNode;
}

/**
 * Componente de background responsivo que se adapta automáticamente
 * a diferentes tamaños de pantalla
 * 
 * @example
 * ```tsx
 * <ResponsiveBackground
 *   src="/img/background.jpg"
 *   type="background"
 *   aspectRatio="16/9"
 * >
 *   <div>Contenido sobre el background</div>
 * </ResponsiveBackground>
 * ```
 */
export const ResponsiveBackground: React.FC<ResponsiveBackgroundProps> = ({
  src,
  type,
  aspectRatio,
  responsive = true,
  customHeight,
  forceMobileConfig = false,
  className = '',
  style = {},
  children
}) => {
  const { backgroundStyles, backgroundClasses } = useResponsiveImage({
    type,
    aspectRatio,
    responsive,
    customHeight,
    forceMobileConfig
  });

  return (
    <div
      className={`${backgroundClasses} ${className}`}
      style={{
        ...backgroundStyles,
        backgroundImage: `url(${src})`,
        ...style
      }}
    >
      {children}
    </div>
  );
};
