import { useState, useCallback } from 'react';
import { getResourceByName, updateResource, softDeleteResource } from '../services/resourceManagementService';
import { 
  getGalleryResourceByName, 
  updateGalleryResource, 
  softDeleteGalleryResource 
} from '../services/galleryMockService';
import type { IResource } from '../types/resource';

interface UseResourceManagementOptions {
  isGallery?: boolean;
}

export const useResourceManagement = (options: UseResourceManagementOptions = {}) => {
  const { isGallery = false } = options;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<IResource | null>(null);

  const openEditModal = useCallback(async (resourceName: string) => {
    const resource = isGallery 
      ? await getGalleryResourceByName(resourceName)
      : await getResourceByName(resourceName);
    if (resource) {
      setSelectedResource(resource);
      setEditModalOpen(true);
    }
  }, [isGallery]);

  const openDeleteModal = useCallback(async (resourceName: string) => {
    const resource = isGallery 
      ? await getGalleryResourceByName(resourceName)
      : await getResourceByName(resourceName);
    if (resource) {
      setSelectedResource(resource);
      setDeleteModalOpen(true);
    }
  }, [isGallery]);

  const handleUpdateResource = useCallback(async (resourceData: {
    name: string;
    description: string;
    links: Array<{ label: string; url: string }>;
  }) => {
    if (!selectedResource) return;
    
    if (isGallery) {
      await updateGalleryResource(selectedResource._id, resourceData);
    } else {
      const updatedResource = await updateResource(selectedResource._id, resourceData);
      window.dispatchEvent(new CustomEvent('resourceUpdated', {
        detail: { 
          resourceId: selectedResource._id, 
          oldName: selectedResource.name,
          newName: resourceData.name,
          resource: updatedResource
        }
      }));
    }
  }, [selectedResource, isGallery]);

  const closeModals = useCallback(() => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedResource(null);
  }, []);

  const handleSoftDeleteResource = useCallback(async () => {
    if (!selectedResource) return;
    
    if (isGallery) {
      await softDeleteGalleryResource(selectedResource._id);
    } else {
      await softDeleteResource(selectedResource._id);
    }
    
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
  }, [selectedResource, closeModals, isGallery]);

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
