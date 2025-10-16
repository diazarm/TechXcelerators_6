import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
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
  
  // Ref para el timeout del debounce
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Función para realizar la búsqueda real
   */
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setBackendResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const results = await searchService.search(query);
      setBackendResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en búsqueda');
      setBackendResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Función para actualizar el término de búsqueda con debounce
   */
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    
    // Limpiar timeout anterior
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Si no hay query, limpiar resultados inmediatamente
    if (!query.trim()) {
      setBackendResults([]);
      setError(null);
      return;
    }
    
    // Configurar nuevo timeout para búsqueda con debounce (500ms)
    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 500);
  }, [performSearch]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Función para limpiar la búsqueda
   */
  const clearSearch = useCallback(() => {
    // Limpiar timeout si existe
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
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