import { api } from './api';
import type { IResource, ResourceResponse, ResourceListResponse } from '../types/api';

// Mapeo de nombres de recursos a IDs (basado en dataResource)
export const RESOURCE_NAME_TO_ID_MAP: Record<string, string> = {
  // Recursos de Nuestra Alianza
  'Portafolio y Precios': '68c22af480f85343fb2bf920',
  'Fichas técnicas y Grabaciones de capacitación en producto': '68cae80754f9344f27defc8b',
  'USP': '68cae87f54f9344f27defc8d',
  'Estructura organizacional de equipo de trabajo (Organigrama)': '68cae8c154f9344f27defc8f',
  'Directorio de contactos de la alianza': '68caf0e66e22346e481f8c72',
  'Resumen de Contrato': '68caf1f86e22346e481f8c7c',
  
  // Recursos de Gobernanza
  'Actas de comité de colaboración': '68caf35e6e22346e481f8c86',
  'Actas de comité de dirección': '68caf4586e22346e481f8c90',
  'Actas de comité de estrategia y crecimiento': '68caf4f56e22346e481f8c9a',
  'Grabación de los comités': '68caf5876e22346e481f8ca4',
  'Presentaciones de comités': '68caf5fe6e22346e481f8ca7',
  
  // Recursos de Gestión
  'Calendario académico de las alianzas': '68cb2547e7461e967e34e0ca',
  'Calendario operacional': '68cb2745e7461e967e34e0cd',
  'Tablero PBI experiencia': '68cb24e5e7461e967e34e0bf',
  'Tablero PBI éxito estudiantil': '68cb238de7461e967e34e0aa',
  'Tablero PBI Ventas': '68cb1a93e7461e967e34e09f',
  'Tablero PBI gestión docente': '68cb2443e7461e967e34e0b5',
  
  // Recursos de Iniciativas
  'Masterplan': '68cb27fae7461e967e34e0d8',
  'Plan de excelencia operativa en 360 - 2025': '68cb2880e7461e967e34e0db',
  
  // Recursos de Planeación
  'Proyección de crecimiento de la alianza con su portafolio': '68caf7e56e22346e481f8cad',
  'Estudios de viabilidad y factibilidad': '68caf8246e22346e481f8cb0',
  'Budget': '68caf67c6e22346e481f8caa',
  'Aprobación de portafolio por alianza': '68caf83c6e22346e481f8cb3',
  'EAFIT': '68cb2978e7461e967e34e0df',
  'Uninorte': '68cb2986e7461e967e34e0e2',
  'UNAB': '68cb298de7461e967e34e0e5',
  'UDD': '68cb2993e7461e967e34e0e8',
  'Central': '68cb2999e7461e967e34e0eb',
  'UNIS': '68cb29a0e7461e967e34e0ee',
  'UP': '68cb29a6e7461e967e34e0f1',
  'UCSS': '68cb29b5e7461e967e34e0f4',
  'UAC': '68dda1be69672674383c4b35'
};

export interface CreateResourceData {
  sectionId: string;
  name: string;
  description: string;
  links: Array<{ label: string; url: string }>;
}

export interface UpdateResourceData {
  name?: string;
  description?: string;
  links?: Array<{ label: string; url: string }>;
}

/**
 * Obtener todos los recursos
 */
export const getAllResources = async (): Promise<IResource[]> => {
  try {
    const response = await api.get<ResourceListResponse>('/resources');
    return response.data.data || [];
  } catch (error) {
    throw error;
  }
};

/**
 * Obtener un recurso por ID
 */
export const getResourceById = async (id: string): Promise<IResource> => {
  try {
    const response = await api.get<ResourceResponse>(`/resources/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Obtener recursos por sección
 */
export const getResourcesBySection = async (sectionId: string): Promise<IResource[]> => {
  try {
    const response = await api.get<ResourceListResponse>(`/resources/section/${sectionId}`);
    return response.data.data || [];
  } catch (error) {
    throw error;
  }
};

/**
 * Crear un nuevo recurso
 */
export const createResource = async (resourceData: CreateResourceData): Promise<IResource> => {
  try {
    const response = await api.post<ResourceResponse>('/resources', resourceData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Actualizar un recurso existente
 */
export const updateResource = async (id: string, resourceData: UpdateResourceData): Promise<IResource> => {
  try {
    const response = await api.put<ResourceResponse>(`/resources/${id}`, resourceData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Soft delete de un recurso (desactivar)
 */
export const softDeleteResource = async (id: string): Promise<IResource> => {
  try {
    const response = await api.delete<ResourceResponse>(`/resources/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Restaurar un recurso desactivado
 */
export const restoreResource = async (id: string): Promise<IResource> => {
  try {
    const response = await api.patch<ResourceResponse>(`/resources/restore/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Obtener ID de recurso por nombre
 */
export const getResourceIdByName = (resourceName: string): string | null => {
  return RESOURCE_NAME_TO_ID_MAP[resourceName] || null;
};

/**
 * Obtener recurso por nombre
 */
export const getResourceByName = async (resourceName: string): Promise<IResource | null> => {
  try {
    const resourceId = getResourceIdByName(resourceName);
    if (!resourceId) {
      return null;
    }
    
    const resource = await getResourceById(resourceId);
    return resource;
  } catch (error) {
    return null;
  }
};

/**
 * Obtener todos los recursos eliminados (soft delete)
 */
export const getDeletedResources = async (): Promise<IResource[]> => {
  try {
    const response = await api.get<ResourceListResponse>('/resources?includeDeleted=true');
    const allResources = response.data.data || [];
    
    return allResources.filter(resource => 
      resource.isActive === false || resource.deletedAt
    );
  } catch {
    return [];
  }
};
