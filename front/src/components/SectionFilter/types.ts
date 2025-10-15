/**
 * Tipos para el componente SectionFilter
 */

export interface SectionOption {
  sectionId: string;
  title: string;
  count?: number;
}

export interface SectionFilterProps {
  /** ID de la sección seleccionada actualmente, o 'all' para todas */
  selectedSectionId: string | 'all';
  
  /** Callback cuando cambia la selección */
  onSectionChange: (sectionId: string | 'all') => void;
  
  /** Lista de secciones disponibles para filtrar */
  sections: SectionOption[];
  
  /** Clases CSS adicionales */
  className?: string;
  
  /** Si está cargando datos */
  loading?: boolean;
}

