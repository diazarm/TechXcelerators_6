import { useState, useCallback } from 'react';
import { getResourceByName, updateResource, softDeleteResource } from '../services/resourceManagementService';
import type { IResource } from '../types/resource';

export const useResourceManagement = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<IResource | null>(null);

  const openEditModal = useCallback(async (resourceName: string) => {
    try {
      const resource = await getResourceByName(resourceName);
      if (resource) {
        setSelectedResource(resource);
        setEditModalOpen(true);
      } else {
        console.warn(`No se encontró el recurso: ${resourceName}`);
      }
    } catch (error) {
      console.error('Error al obtener recurso para edición:', error);
    }
  }, []);

  const openDeleteModal = useCallback(async (resourceName: string) => {
    try {
      const resource = await getResourceByName(resourceName);
      if (resource) {
        setSelectedResource(resource);
        setDeleteModalOpen(true);
      } else {
        console.warn(`No se encontró el recurso: ${resourceName}`);
      }
    } catch (error) {
      console.error('Error al obtener recurso para eliminación:', error);
    }
  }, []);

  const handleUpdateResource = useCallback(async (resourceData: {
    name: string;
    description: string;
    links: Array<{ label: string; url: string }>;
  }) => {
    if (!selectedResource) return;
    
    try {
      const updatedResource = await updateResource(selectedResource._id, resourceData);
      
      // Emitir evento personalizado para notificar que se actualizó un recurso
      window.dispatchEvent(new CustomEvent('resourceUpdated', {
        detail: { 
          resourceId: selectedResource._id, 
          oldName: selectedResource.name, // nombre anterior
          newName: resourceData.name,      // nombre nuevo
          resource: updatedResource
        }
      }));
      
    } catch (error) {
      console.error('Error al actualizar recurso:', error);
      throw error;
    }
  }, [selectedResource]);

  const closeModals = useCallback(() => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedResource(null);
  }, []);

  const handleSoftDeleteResource = useCallback(async () => {
    if (!selectedResource) return;
    
    try {
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
    } catch (error) {
      console.error('Error al desactivar recurso:', error);
      throw error;
    }
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
