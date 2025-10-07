import type { IResource } from "../types/resource";
import { api } from "./api";

const BASE_URL = '/resources';

export class ResourceService {
  /**
   * Obtener todos los recursos
   * GET /resources
   */
  async getAllResources(): Promise<IResource[]> {
    try {
      const response = await api.get(BASE_URL);
      const data = response.data;
      
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener recursos');
      }

      return data.data;
    } catch (error) {
      console.error('Error al obtener recursos:', error);
      throw error;
    }
  }

  /**
   * Obtener recursos por sección
   * GET /resources/section/:sectionId
   */
  async getResourcesBySection(sectionId: string): Promise<IResource[]> {
    try {
      const response = await api.get(`${BASE_URL}/section/${sectionId}`);
      const data = response.data;
      
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener recursos por sección');
      }

      return data.data;
    } catch (error) {
      console.error('Error al obtener recursos por sección:', error);
      throw error;
    }
  }

  /**
   * Obtener recurso por ID
   * GET /resources/:id
   */
  async getResourceById(id: string): Promise<IResource | null> {
    try {
      const response = await api.get(`${BASE_URL}/${id}`);
      const data = response.data;
      
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener recurso');
      }

      return data.data;
    } catch (error) {
      console.error('Error al obtener recurso:', error);
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }
}

export const resourceService = new ResourceService();
