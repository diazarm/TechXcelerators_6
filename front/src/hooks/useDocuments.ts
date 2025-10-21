/**
 * Hook para listar y filtrar documentos
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getDocuments } from '../services';
import type { IDocument } from '../types/document';
import { useNotification } from './useNotification';
import { useAuth } from './useAuth';

interface UseDocumentsReturn {
  documents: IDocument[];
  allDocuments: IDocument[];
  loading: boolean;
  error: string | null;
  refetch: (resetToFirstPage?: boolean) => Promise<void>;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  isAdmin: boolean;
  categoryFilter: string;
  handleCategoryFilterChange: (value: string) => void;
}

export const useDocuments = (
  itemsPerPage: number = 10,
  refreshKey: number = 0
): UseDocumentsReturn => {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin || false;
  const { showNotification } = useNotification();
  const showNotificationRef = useRef(showNotification);

  // Actualizar la referencia cuando cambie showNotification
  useEffect(() => {
    showNotificationRef.current = showNotification;
  }, [showNotification]);

  const [allDocuments, setAllDocuments] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const fetchDocuments = useCallback(async (resetToFirstPage = false) => {
    try {
      setLoading(true);
      setError(null);
      // El backend maneja automáticamente los permisos según el rol del usuario
      // Admin ve todos los documentos, otros solo los activos y visibles para su rol
      const data = await getDocuments();
      setAllDocuments(data);
      
      // Si se solicita reset, volver a la primera página
      if (resetToFirstPage) {
        setCurrentPage(1);
      }
    } catch (err) {
      setError('Error al cargar documentos');
      showNotificationRef.current('Error al cargar documentos', 'error');
      setAllDocuments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Refetch cuando cambie el usuario
  useEffect(() => {
    if (user?.email) {
      fetchDocuments();
    }
  }, [user?.email, isAdmin, fetchDocuments]);

  // Refetch cuando cambie el refreshKey
  useEffect(() => {
    if (refreshKey > 0) {
      fetchDocuments(true);
    }
  }, [refreshKey, fetchDocuments]);

  // Aplicar filtro de categoría
  const filteredDocuments = useMemo(() => {
    if (categoryFilter === 'all') {
      return allDocuments;
    }
    const filtered = allDocuments.filter(doc => doc.category === categoryFilter);
    return filtered;
  }, [allDocuments, categoryFilter]);

  // Calcular paginación con documentos filtrados
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);
  

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Resetear a la primera página
  };

  const refetch = useCallback(async (resetToFirstPage = false) => {
    await fetchDocuments(resetToFirstPage);
  }, [fetchDocuments]);

  return {
    documents: paginatedDocuments,
    allDocuments,
    loading,
    error,
    refetch,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredDocuments.length,
    handlePageChange,
    isAdmin,
    categoryFilter,
    handleCategoryFilterChange,
  };
};

