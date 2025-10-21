import { useState, useCallback } from 'react';
import { getResourceByName, updateResource, softDeleteResource } from '../services/resourceManagementService';
import type { IResource } from '../types/resource';

export const useResourceManagement = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<IResource | null>(null);

  const openEditModal = useCallback(async (resourceName: string) => {
    const resource = await getResourceByName(resourceName);
    if (resource) {
      setSelectedResource(resource);
      setEditModalOpen(true);
    }
  }, []);

  const openDeleteModal = useCallback(async (resourceName: string) => {
    const resource = await getResourceByName(resourceName);
    if (resource) {
      setSelectedResource(resource);
      setDeleteModalOpen(true);
    }
  }, []);

  const handleUpdateResource = useCallback(async (resourceData: {
    name: string;
    description: string;
    links: Array<{ label: string; url: string }>;
  }) => {
    if (!selectedResource) return;
    
    // 1. Actualizar en backend
    const updatedResource = await updateResource(selectedResource._id, resourceData);
    
    // 2. Disparar evento para refresh automático
    window.dispatchEvent(new CustomEvent('resourceUpdated', {
      detail: { 
        resourceId: selectedResource._id,
        shouldRefresh: true, // ← Nueva bandera
        resource: updatedResource
      }
    }));
  }, [selectedResource]);

  const closeModals = useCallback(() => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedResource(null);
  }, []);

  const handleSoftDeleteResource = useCallback(async () => {
    if (!selectedResource) return;
    
    await softDeleteResource(selectedResource._id);
    
    // Emitir evento personalizado para notificar que se eliminó un recurso
    window.dispatchEvent(new CustomEvent('resourceDeleted', {
      detail: { 
        resourceId: selectedResource._id, 
        resourceName: selectedResource.name,
        resource: selectedResource
      }
    }));
    
    // También cerrar el modal de eliminación
    closeModals();
  }, [selectedResource, closeModals]);

  const handleEditClick = useCallback((resourceName: string) => {
    openEditModal(resourceName);
  }, [openEditModal]);

  const handleDeleteClick = useCallback((resourceName: string) => {
    openDeleteModal(resourceName);
  }, [openDeleteModal]);

  return {
    editModalOpen,
    deleteModalOpen,
    selectedResource,
    handleEditClick,
    handleDeleteClick,
    handleUpdateResource,
    handleSoftDeleteResource,
    closeModals
  };
};
