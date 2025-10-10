import { useState, useCallback, useEffect } from 'react';
import { getDeletedResources, restoreResource } from '../services/resourceManagementService';
import { showNotification } from '../services';
import type { IResource } from '../types/resource';

export const useResourceRestoration = () => {
  const [deletedResources, setDeletedResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState<string | null>(null);
  const [hasCheckedResources, setHasCheckedResources] = useState(false);

  const fetchDeletedResources = useCallback(async () => {
    try {
      setLoading(true);
      const resources = await getDeletedResources();
      setDeletedResources(resources);
      setHasCheckedResources(true);
    } catch (error) {
      console.error('Error fetching deleted resources:', error);
      showNotification('error', 'Error', 'No se pudieron cargar los recursos eliminados');
      setDeletedResources([]);
      setHasCheckedResources(true);
    } finally {
      setLoading(false);
    }
  }, []);

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
    } catch (error) {
      console.error('Error restoring resource:', error);
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
    deletedResources,
    loading,
    restoreLoading,
    handleRestoreResource,
    refreshDeletedResources: fetchDeletedResources,
    loadDeletedResources,
    hasCheckedResources,
    hasDeletedResources: deletedResources.length > 0
  };
};
