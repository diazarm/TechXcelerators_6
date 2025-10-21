import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

/**
 * Componente OptimizedImage que usa WebP con fallback automático
 * Usa el elemento <picture> para máxima compatibilidad
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  loading = 'lazy',
  width,
  height
}) => {
  // Generar la ruta WebP basada en la ruta original
  const getWebPPath = (originalSrc: string): string => {
    const lastDotIndex = originalSrc.lastIndexOf('.');
    if (lastDotIndex === -1) return originalSrc + '.webp';
    return originalSrc.substring(0, lastDotIndex) + '.webp';
  };

  const webpSrc = getWebPPath(src);

  return (
    <picture>
      {/* Fuente WebP para navegadores que lo soporten */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Imagen original como fallback */}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        width={width}
        height={height}
      />
    </picture>
  );
};

export default OptimizedImage;
