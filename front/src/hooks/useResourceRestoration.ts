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
      setHasCheckedResources(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para agregar recurso eliminado al estado local
  const addDeletedResource = useCallback((resource: any) => {
    setDeletedResources(prev => {
      const exists = prev.some(r => r._id === resource._id);
      if (!exists) {
        return [...prev, resource];
      }
      return prev;
    });
    setHasCheckedResources(true);
  }, []);

  const handleRestoreResource = useCallback(async (resourceId: string, resourceName: string) => {
    try {
      setRestoreLoading(resourceId);
      await restoreResource(resourceId);
      
      // Actualizar la lista local - remover solo el recurso restaurado
      setDeletedResources(prev => prev.filter(resource => resource._id !== resourceId));
      
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
  }, []);

  // Función para cargar recursos eliminados solo cuando se necesite
  const loadDeletedResources = useCallback(() => {
    if (!hasCheckedResources) {
      fetchDeletedResources();
    }
  }, [hasCheckedResources, fetchDeletedResources]);

  // Escuchar eventos de recursos eliminados para actualizar automáticamente
  useEffect(() => {
    const handleResourceDeleted = (event: CustomEvent) => {
      // Usar el recurso completo del evento
      const { resource } = event.detail;
      const deletedResource = {
        ...resource,
        isActive: false,
        deletedAt: new Date().toISOString()
      };
      addDeletedResource(deletedResource);
    };

    window.addEventListener('resourceDeleted', handleResourceDeleted as EventListener);
    
    return () => {
      window.removeEventListener('resourceDeleted', handleResourceDeleted as EventListener);
    };
  }, [addDeletedResource]);

  // Escuchar eventos de recursos restaurados para actualizar automáticamente
  useEffect(() => {
    const handleResourceRestored = (event: CustomEvent) => {
      const { resourceId } = event.detail;
      // Solo remover el recurso restaurado de la lista local
      setDeletedResources(prev => prev.filter(resource => resource._id !== resourceId));
    };
    window.addEventListener('resourceRestored', handleResourceRestored as EventListener);
    return () => {
      window.removeEventListener('resourceRestored', handleResourceRestored as EventListener);
    };
  }, []);

  // Escuchar evento de forzar actualización de recursos eliminados
  useEffect(() => {
    const handleForceRefresh = (event: CustomEvent) => {
      const newDeletedResources = event.detail.deletedResources;
      newDeletedResources.forEach((resource: any) => {
        addDeletedResource(resource);
      });
    };
    window.addEventListener('forceRefreshDeletedResources', handleForceRefresh as EventListener);
    return () => {
      window.removeEventListener('forceRefreshDeletedResources', handleForceRefresh as EventListener);
    };
  }, [addDeletedResource]);

  return {
    deletedResources,
    loading,
    restoreLoading,
    handleRestoreResource,
    refreshDeletedResources: fetchDeletedResources,
    loadDeletedResources,
    hasCheckedResources
  };
};
