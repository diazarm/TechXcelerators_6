/**
 * Tipos para el componente AllianceSlider
 */

export interface AllianceSliderProps {
  /** Clases CSS adicionales */
  className?: string;
}

export interface AllianceItemProps {
  /** Datos de la alianza */
  alliance: {
    id: string;
    name: string;
    logo: string;
    url?: string;
  };
  /** Tamaño del logo */
  size?: 'sm' | 'md' | 'lg';
}
