import type { IResource } from '../types/api';
import { mockGalleryResources, GALLERY_MOCK_STORAGE_KEY, initializeGalleryMockData } from '../Mock/MockGalleryResources';

/**
 * Servicio mock para recursos de Galería
 * 
 * Simula las operaciones del backend usando localStorage como backing store.
 * Mantiene la misma interfaz que resourceManagementService para compatibilidad.
 */

/**
 * Obtener recursos desde localStorage
 */
const getStoredResources = (): IResource[] => {
  const stored = localStorage.getItem(GALLERY_MOCK_STORAGE_KEY);
  if (!stored) {
    initializeGalleryMockData();
    return mockGalleryResources;
  }
  return JSON.parse(stored);
};

/**
 * Guardar recursos en localStorage
 */
const saveResources = (resources: IResource[]): void => {
  localStorage.setItem(GALLERY_MOCK_STORAGE_KEY, JSON.stringify(resources));
};

/**
 * Disparar evento personalizado
 */
const dispatchResourceEvent = (eventName: string, detail: unknown): void => {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
};

/**
 * Simular delay de red
 */
const simulateNetworkDelay = (): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, 100));
};

/**
 * Obtener todos los recursos de galería
 */
export const getAllGalleryResources = async (): Promise<IResource[]> => {
  await simulateNetworkDelay();
  return getStoredResources();
};

/**
 * Obtener recurso por ID
 */
export const getGalleryResourceById = async (id: string): Promise<IResource> => {
  await simulateNetworkDelay();
  const resources = getStoredResources();
  const resource = resources.find(r => r._id === id);
  
  if (!resource) {
    throw new Error(`Recurso con ID ${id} no encontrado`);
  }
  
  return resource;
};

/**
 * Obtener recurso por nombre
 */
export const getGalleryResourceByName = async (name: string): Promise<IResource> => {
  await simulateNetworkDelay();
  const resources = getStoredResources();
  const resource = resources.find(r => r.name === name);
  
  if (!resource) {
    throw new Error(`Recurso con nombre ${name} no encontrado`);
  }
  
  return resource;
};

/**
 * Actualizar recurso
 */
export const updateGalleryResource = async (id: string, data: Partial<IResource>): Promise<IResource> => {
  await simulateNetworkDelay();
  const resources = getStoredResources();
  const index = resources.findIndex(r => r._id === id);
  
  if (index === -1) {
    throw new Error(`Recurso con ID ${id} no encontrado`);
  }
  
  const updatedResource = {
    ...resources[index],
    ...data,
    updatedAt: new Date()
  };
  
  resources[index] = updatedResource;
  saveResources(resources);
  
  // Disparar evento de actualización
  dispatchResourceEvent('resourceUpdated', { resource: updatedResource });
  
  return updatedResource;
};

/**
 * Soft delete de recurso (marcar como inactivo)
 */
export const softDeleteGalleryResource = async (id: string): Promise<IResource> => {
  await simulateNetworkDelay();
  const resources = getStoredResources();
  const index = resources.findIndex(r => r._id === id);
  
  if (index === -1) {
    throw new Error(`Recurso con ID ${id} no encontrado`);
  }
  
  const deletedResource = {
    ...resources[index],
    isActive: false,
    deletedAt: new Date(),
    updatedAt: new Date()
  };
  
  resources[index] = deletedResource;
  saveResources(resources);
  
  // Disparar evento de eliminación
  dispatchResourceEvent('resourceDeleted', { resource: deletedResource });
  
  return deletedResource;
};

/**
 * Restaurar recurso (marcar como activo)
 */
export const restoreGalleryResource = async (name: string): Promise<IResource> => {
  await simulateNetworkDelay();
  const resources = getStoredResources();
  const index = resources.findIndex(r => r.name === name);
  
  if (index === -1) {
    throw new Error(`Recurso con nombre ${name} no encontrado`);
  }
  
  const restoredResource = {
    ...resources[index],
    isActive: true,
    deletedAt: null,
    updatedAt: new Date()
  };
  
  resources[index] = restoredResource;
  saveResources(resources);
  
  // Disparar evento de restauración
  dispatchResourceEvent('resourceRestored', { resourceName: name });
  
  return restoredResource;
};

/**
 * Obtener recursos eliminados (inactivos)
 */
export const getDeletedGalleryResources = async (): Promise<IResource[]> => {
  await simulateNetworkDelay();
  const resources = getStoredResources();
  return resources.filter(r => !r.isActive);
};

/**
 * Crear nuevo recurso (para futuras expansiones)
 */
export const createGalleryResource = async (data: Omit<IResource, '_id' | 'createdAt' | 'updatedAt'>): Promise<IResource> => {
  await simulateNetworkDelay();
  const resources = getStoredResources();
  
  const newResource: IResource = {
    ...data,
    _id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  resources.push(newResource);
  saveResources(resources);
  
  return newResource;
};

/**
 * Resetear datos mock a estado inicial
 */
export const resetGalleryMockData = (): void => {
  localStorage.removeItem(GALLERY_MOCK_STORAGE_KEY);
  initializeGalleryMockData();
};
