import { useState, useMemo, useCallback } from 'react';
import type { SearchResult } from '../types';
import { searchService } from '../services/searchService';

/**
 * Hook personalizado para manejar la funcionalidad de búsqueda
 * Conectado directamente al backend real
 * 
 * @returns Objeto con estado de búsqueda y funciones de búsqueda
 */
export const useSearch = () => {
  // Estado del término de búsqueda
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Estado de carga
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Estado de resultados (para modo backend)
  const [backendResults, setBackendResults] = useState<SearchResult[]>([]);
  
  // Estado de error
  const [error, setError] = useState<string | null>(null);

  /**
   * Función para actualizar el término de búsqueda
   */
  const handleSearchChange = useCallback(async (query: string) => {
    setSearchQuery(query);
    setError(null);
    
    // Si hay query, hacer búsqueda en el backend
    if (query.trim()) {
      setIsLoading(true);
      try {
        const results = await searchService.search(query);
        setBackendResults(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error en búsqueda');
        setBackendResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Si no hay query, limpiar resultados
      setBackendResults([]);
    }
  }, []);

  /**
   * Función para limpiar la búsqueda
   */
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setBackendResults([]);
    setError(null);
  }, []);

  /**
   * Resultados de la búsqueda en el backend
   */
  const results = useMemo(() => {
    return backendResults;
  }, [backendResults]);

  /**
   * Verificar si hay resultados
   */
  const hasResults = useMemo(() => results.length > 0, [results]);

  /**
   * Verificar si la búsqueda está activa
   */
  const isSearchActive = useMemo(() => searchQuery.trim().length > 0, [searchQuery]);

  /**
   * Obtener estadísticas de búsqueda
   */
  const searchStats = useMemo(() => ({
    totalItems: results.length,
    filteredItems: results.length,
    searchQuery: searchQuery.trim()
  }), [results.length, searchQuery]);

  return {
    // Estado
    searchQuery,
    isLoading,
    results,
    error,
    
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