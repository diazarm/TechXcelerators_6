import type { IResource } from "../types/resource";
import type { ResourceListResponse, ResourceResponse } from "../types/api";
import { api } from "./api";

const BASE_URL = '/resources';

export class ResourceService {
  /**
   * Obtener todos los recursos
   * GET /resources
   */
  async getAllResources(): Promise<IResource[]> {
    const response = await api.get<ResourceListResponse>(BASE_URL);
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || 'Error al obtener recursos');
    }

    return data.data;
  }

  /**
   * Obtener recursos por sección
   * GET /resources/section/:sectionId
   */
  async getResourcesBySection(sectionId: string): Promise<IResource[]> {
    const response = await api.get<ResourceListResponse>(`${BASE_URL}/section/${sectionId}`);
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || 'Error al obtener recursos por sección');
    }

    return data.data;
  }

  /**
   * Obtener recurso por ID
   * GET /resources/:id
   */
  async getResourceById(id: string): Promise<IResource | null> {
    try {
      const response = await api.get<ResourceResponse>(`${BASE_URL}/${id}`);
      const data = response.data;
      
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener recurso');
      }

      return data.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error && 
          error.response && typeof error.response === 'object' && 'status' in error.response && 
          error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }
}

export const resourceService = new ResourceService();
