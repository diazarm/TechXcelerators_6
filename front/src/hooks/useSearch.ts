import { useState, useMemo, useCallback } from 'react';
import type { SearchResult } from '../types';

/**
 * Hook personalizado para manejar la funcionalidad de búsqueda
 * 
 * @param data - Array de datos a buscar
 * @returns Objeto con estado de búsqueda y funciones de búsqueda
 */
export const useSearch = (data: SearchResult[]) => {
  // Estado del término de búsqueda
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Estado de carga (para futuras implementaciones con API)
  const [isLoading] = useState<boolean>(false);

  /**
   * Función para actualizar el término de búsqueda
   */
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  /**
   * Función para limpiar la búsqueda
   */
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  /**
   * Resultados filtrados basados en la consulta de búsqueda
   * Se actualiza automáticamente cuando cambia searchQuery o data
   */
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return data; // Si no hay búsqueda, mostrar todos los datos
    }

    const query = searchQuery.toLowerCase().trim();
    
    return data.filter((item) => {
      // Buscar en título
      if (item.title.toLowerCase().includes(query)) return true;
      
      // Buscar en descripción
      if (item.description.toLowerCase().includes(query)) return true;
      
      // Buscar en categoría
      if (item.category.toLowerCase().includes(query)) return true;
      
      // Buscar en tipo
      if (item.type.toLowerCase().includes(query)) return true;
      
      // Buscar en palabras clave
      if (item.keywords.some((keyword: string) => keyword.toLowerCase().includes(query))) return true;
      
      // Buscar en path
      if (item.path.toLowerCase().includes(query)) return true;
      
      return false;
    });
  }, [searchQuery, data]);

  /**
   * Verificar si hay resultados
   */
  const hasResults = useMemo(() => filteredResults.length > 0, [filteredResults]);

  /**
   * Verificar si la búsqueda está activa
   */
  const isSearchActive = useMemo(() => searchQuery.trim().length > 0, [searchQuery]);

  /**
   * Obtener estadísticas de búsqueda
   */
  const searchStats = useMemo(() => ({
    totalItems: data.length,
    filteredItems: filteredResults.length,
    searchQuery: searchQuery.trim()
  }), [data.length, filteredResults.length, searchQuery]);

  return {
    // Estado
    searchQuery,
    isLoading,
    results: filteredResults,
    
    // Funciones
    handleSearchChange,
    clearSearch,
    
    // Utilidades
    hasResults,
    isSearchActive,
    searchStats
  };
};

/**
 * Tipos de retorno del hook useSearch
 */
export interface UseSearchReturn {
  searchQuery: string;
  isLoading: boolean;
  results: SearchResult[];
  handleSearchChange: (query: string) => void;
  clearSearch: () => void;
  hasResults: boolean;
  isSearchActive: boolean;
  searchStats: {
    totalItems: number;
    filteredItems: number;
    searchQuery: string;
  };
}