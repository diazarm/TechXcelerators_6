/**
 * Servicio de Alianzas
 * Simula las respuestas del backend para el módulo de alianzas
 * 
 * TODO: Reemplazar URLs mock con endpoints reales del backend
 * Base URL: http://localhost:3000/api/alliances
 */

import type {
  Alliance,
  CreateAllianceRequest,
  UpdateAllianceRequest,
  AllianceFilters,
  AllianceApiResponse,
  AllianceListApiResponse
} from '../types/alliance';
import { api } from './api';

const BASE_URL = '/alliances';


/**
 * Servicio de Alianzas
 * Implementa todos los endpoints del backend
 */
export class AllianceService {
  /**
   * Obtener todas las alianzas activas
   * GET /alliances
   */
  async getAlliances(filters?: AllianceFilters): Promise<Alliance[]> {
    const params = new URLSearchParams();
    if (filters?.isActive !== undefined) {
      params.append('isActive', filters.isActive.toString());
    }
    if (filters?.includeDeleted) {
      params.append('includeDeleted', 'true');
    }

    const response = await api.get<AllianceListApiResponse>(`${BASE_URL}?${params.toString()}`);
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || 'Error al obtener alianzas');
    }

    return data.data;
  }

  /**
   * Obtener alianza por ID
   * GET /alliances/:id
   */
  async getAllianceById(id: string): Promise<Alliance | null> {
    try {
      const response = await api.get<AllianceApiResponse>(`${BASE_URL}/${id}`);
      const data = response.data;
      
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener alianza');
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

  /**
   * Crear nueva alianza
   * POST /alliances
   */
  async createAlliance(data: CreateAllianceRequest): Promise<Alliance> {
    const response = await api.post<AllianceApiResponse>(BASE_URL, data);
    const result = response.data;
    
    if (!result.success) {
      throw new Error(result.message || 'Error al crear alianza');
    }

    return result.data;
  }

  /**
   * Actualizar alianza existente
   * PUT /alliances/:id
   */
  async updateAlliance(id: string, data: UpdateAllianceRequest): Promise<Alliance> {
    const response = await api.put<AllianceApiResponse>(`${BASE_URL}/${id}`, data);
    const result = response.data;
    
    if (!result.success) {
      throw new Error(result.message || 'Error al actualizar alianza');
    }

    return result.data;
  }

  /**
   * Eliminar alianza (soft delete)
   * DELETE /alliances/:id
   */
  async deleteAlliance(id: string): Promise<void> {
    const response = await api.delete<AllianceApiResponse>(`${BASE_URL}/${id}`);
    const result = response.data;
    
    if (!result.success) {
      throw new Error(result.message || 'Error al eliminar alianza');
    }
  }

  /**
   * Restaurar alianza eliminada
   * PATCH /alliances/restore/:id
   */
  async restoreAlliance(id: string): Promise<Alliance> {
    const response = await api.patch<AllianceApiResponse>(`${BASE_URL}/restore/${id}`);
    const result = response.data;
    
    if (!result.success) {
      throw new Error(result.message || 'Error al restaurar alianza');
    }

    return result.data;
  }
}

// Instancia singleton del servicio
export const allianceService = new AllianceService();
