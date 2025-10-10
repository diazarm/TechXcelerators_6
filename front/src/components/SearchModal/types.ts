import type { SearchResult } from '../../types';

/**
 * Props del componente SearchModal
 */
export interface SearchModalProps {
  /** Controla si el modal está visible */
  isOpen: boolean;
  /** Función para cerrar el modal */
  onClose: () => void;
  /** Array de resultados de búsqueda */
  results: SearchResult[];
  /** Término de búsqueda actual */
  searchQuery: string;
  /** Índice del resultado seleccionado */
  selectedIndex: number;
  /** Función para manejar la selección de un resultado */
  onResultSelect: (result: SearchResult) => void;
  /** Estado de carga */
  isLoading?: boolean;
  /** Mensaje de error */
  error?: string | null;
}
