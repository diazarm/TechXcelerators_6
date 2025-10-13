/**
 * Tipos para el componente AllianceSlider
 */

import type { AllianceData } from '../../constants';

export interface AllianceSliderProps {
  /** Clases CSS adicionales */
  className?: string;
}

export interface AllianceItemProps {
  /** Datos de la alianza */
  alliance: AllianceData;
}
