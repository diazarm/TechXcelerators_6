import { useState, useCallback, useEffect, useMemo } from 'react';
import { getDeletedResources, restoreResource } from '../services/resourceManagementService';
import { showNotification } from '../services';
import { getAllSections } from '../constants';
import type { IResource } from '../types/resource';
import type { SectionOption } from '../components/Search/SectionFilter/types';

interface UseResourceRestorationProps {
  /** ID de la sección actual (opcional) */
  currentSectionId?: string;
}

export const useResourceRestoration = (props?: UseResourceRestorationProps) => {
  const currentSectionId = props?.currentSectionId;
  
  const [allDeletedResources, setAllDeletedResources] = useState<IResource[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | 'all'>(
    currentSectionId || 'all'
  );
  const [loading, setLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState<string | null>(null);
  const [hasCheckedResources, setHasCheckedResources] = useState(false);

  const fetchDeletedResources = useCallback(async () => {
    try {
      setLoading(true);
      const resources = await getDeletedResources();
      setAllDeletedResources(resources);
      setHasCheckedResources(true);
    } catch {
      showNotification('error', 'Error', 'No se pudieron cargar los recursos eliminados');
      setAllDeletedResources([]);
      setHasCheckedResources(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrar recursos según la sección seleccionada
  const filteredDeletedResources = useMemo(() => {
    if (selectedSectionId === 'all') {
      return allDeletedResources;
    }
    return allDeletedResources.filter(
      resource => resource.sectionId?.toString() === selectedSectionId
    );
  }, [allDeletedResources, selectedSectionId]);

  // Calcular count de recursos por sección
  const sectionOptions = useMemo((): SectionOption[] => {
    const sections = getAllSections();
    return sections.map(section => ({
      sectionId: section.sectionId,
      title: section.title,
      count: allDeletedResources.filter(
        resource => resource.sectionId?.toString() === section.sectionId
      ).length
    }));
  }, [allDeletedResources]);

  const handleRestoreResource = useCallback(async (resourceId: string, resourceName: string) => {
    try {
      setRestoreLoading(resourceId);
      await restoreResource(resourceId);
      
      // Refrescar la lista de recursos eliminados desde el backend
      await fetchDeletedResources();
      
      showNotification('success', 'Éxito', `El recurso "${resourceName}" ha sido restaurado correctamente`);
      
      // Emitir evento para notificar que se restauró un recurso
      window.dispatchEvent(new CustomEvent('resourceRestored', {
        detail: { resourceId, resourceName }
      }));
    } catch {
      showNotification('error', 'Error', 'No se pudo restaurar el recurso');
    } finally {
      setRestoreLoading(null);
    }
  }, [fetchDeletedResources]);

  // Función para cargar recursos eliminados solo cuando se necesite
  const loadDeletedResources = useCallback(() => {
    if (!hasCheckedResources) {
      fetchDeletedResources();
    }
  }, [hasCheckedResources, fetchDeletedResources]);

  // Escuchar eventos de recursos eliminados para actualizar automáticamente
  useEffect(() => {
    const handleResourceDeleted = () => {
      // Refrescar la lista desde el backend
      fetchDeletedResources();
    };

    window.addEventListener('resourceDeleted', handleResourceDeleted as EventListener);
    
    return () => {
      window.removeEventListener('resourceDeleted', handleResourceDeleted as EventListener);
    };
  }, [fetchDeletedResources]);

  // Escuchar eventos de recursos restaurados para actualizar automáticamente
  useEffect(() => {
    const handleResourceRestored = () => {
      // Refrescar la lista desde el backend
      fetchDeletedResources();
    };
    
    window.addEventListener('resourceRestored', handleResourceRestored as EventListener);
    return () => {
      window.removeEventListener('resourceRestored', handleResourceRestored as EventListener);
    };
  }, [fetchDeletedResources]);

  return {
    deletedResources: filteredDeletedResources,
    allDeletedResources,
    loading,
    restoreLoading,
    handleRestoreResource,
    refreshDeletedResources: fetchDeletedResources,
    loadDeletedResources,
    hasCheckedResources,
    hasDeletedResources: allDeletedResources.length > 0, // Basado en TODOS los recursos, no solo filtrados
    // Filtrado por sección
    selectedSectionId,
    setSelectedSectionId,
    sectionOptions
  };
};
