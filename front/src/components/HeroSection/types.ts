/**
 * Props del componente HeroSection
 */
export interface HeroSectionProps {
  /** Título principal del hero section */
  title?: string;
  /** Descripción del contenido */
  description?: string;
  /** Si mostrar la imagen placeholder */
  showImage?: boolean;
  /** Clases CSS adicionales */
  className?: string;
  /** Contenido adicional (botones, etc.) que se renderiza debajo del texto */
  children?: React.ReactNode;
}
