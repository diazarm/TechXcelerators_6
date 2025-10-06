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
  AllianceFilters
} from '../types/alliance';

import { mockAlliances } from '../Mock/mockAlliances';

// TODO: Reemplazar con la URL real del backend
// const BASE_URL = 'http://localhost:3000/api/alliances';

/**
 * Simula delay de red para testing
 */
const simulateNetworkDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Simula error de red ocasional para testing
 */
const simulateNetworkError = (): boolean => {
  return Math.random() < 0.1; // 10% de probabilidad de error
};

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
    try {
      await simulateNetworkDelay();
      
      if (simulateNetworkError()) {
        throw new Error('Error de conexión con el servidor');
      }

      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch(`${BASE_URL}?${new URLSearchParams(filters)}`);
      // const data: AllianceListApiResponse = await response.json();
      // return data.data;

      // Usar mock data temporal
      let filteredAlliances = [...mockAlliances];
      
      // Aplicar filtros
      if (filters?.isActive !== undefined) {
        filteredAlliances = filteredAlliances.filter(a => a.isActive === filters.isActive);
      }
      
      if (!filters?.includeDeleted) {
        filteredAlliances = filteredAlliances.filter(a => a.deleteAt === null);
      }

      return filteredAlliances;
    } catch (error) {
      console.error('Error al obtener alianzas:', error);
      throw error;
    }
  }

  /**
   * Obtener alianza por ID
   * GET /alliances/:id
   */
  async getAllianceById(id: string): Promise<Alliance | null> {
    try {
      await simulateNetworkDelay();
      
      if (simulateNetworkError()) {
        throw new Error('Error de conexión con el servidor');
      }

      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch(`${BASE_URL}/${id}`);
      // if (!response.ok) return null;
      // const data: AllianceApiResponse = await response.json();
      // return data.data;

      // Usar mock data temporal
      const alliance = mockAlliances.find(a => a._id === id);
      return alliance || null;
    } catch (error) {
      console.error('Error al obtener alianza:', error);
      throw error;
    }
  }

  /**
   * Crear nueva alianza
   * POST /alliances
   */
  async createAlliance(data: CreateAllianceRequest): Promise<Alliance> {
    try {
      await simulateNetworkDelay();
      
      if (simulateNetworkError()) {
        throw new Error('Error de conexión con el servidor');
      }

      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch(BASE_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // const result: AllianceApiResponse = await response.json();
      // return result.data;

      // Simular creación con mock data
      const newAlliance: Alliance = {
        _id: Date.now().toString(), // Simular ID generado por MongoDB
        name: data.name,
        siglas: data.siglas,
        url: data.url,
        isActive: true,
        deleteAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // En un caso real, aquí se guardaría en la base de datos
      console.log('Nueva alianza creada:', newAlliance);
      
      return newAlliance;
    } catch (error) {
      console.error('Error al crear alianza:', error);
      throw error;
    }
  }

  /**
   * Actualizar alianza existente
   * PUT /alliances/:id
   */
  async updateAlliance(id: string, data: UpdateAllianceRequest): Promise<Alliance> {
    try {
      await simulateNetworkDelay();
      
      if (simulateNetworkError()) {
        throw new Error('Error de conexión con el servidor');
      }

      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch(`${BASE_URL}/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // const result: AllianceApiResponse = await response.json();
      // return result.data;

      // Simular actualización con mock data
      const existingAlliance = mockAlliances.find(a => a._id === id);
      if (!existingAlliance) {
        throw new Error('Alianza no encontrada');
      }

      const updatedAlliance: Alliance = {
        ...existingAlliance,
        ...data, // Aplicar solo los campos que se actualizaron
        updatedAt: new Date()
      };

      // En un caso real, aquí se actualizaría en la base de datos
      console.log('Alianza actualizada:', updatedAlliance);
      
      return updatedAlliance;
    } catch (error) {
      console.error('Error al actualizar alianza:', error);
      throw error;
    }
  }

  /**
   * Eliminar alianza (soft delete)
   * DELETE /alliances/:id
   */
  async deleteAlliance(id: string): Promise<void> {
    try {
      await simulateNetworkDelay();
      
      if (simulateNetworkError()) {
        throw new Error('Error de conexión con el servidor');
      }

      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch(`${BASE_URL}/${id}`, {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error('Error al eliminar alianza');

      // Simular soft delete con mock data
      const existingAlliance = mockAlliances.find(a => a._id === id);
      if (!existingAlliance) {
        throw new Error('Alianza no encontrada');
      }

      // En un caso real, aquí se marcaría como eliminada en la base de datos
      console.log(`Alianza ${id} eliminada (soft delete)`);
    } catch (error) {
      console.error('Error al eliminar alianza:', error);
      throw error;
    }
  }

  /**
   * Restaurar alianza eliminada
   * POST /alliances/:id/restore
   */
  async restoreAlliance(id: string): Promise<Alliance> {
    try {
      await simulateNetworkDelay();
      
      if (simulateNetworkError()) {
        throw new Error('Error de conexión con el servidor');
      }

      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch(`${BASE_URL}/${id}/restore`, {
      //   method: 'POST'
      // });
      // const result: AllianceApiResponse = await response.json();
      // return result.data;

      // Simular restauración con mock data
      const existingAlliance = mockAlliances.find(a => a._id === id);
      if (!existingAlliance) {
        throw new Error('Alianza no encontrada');
      }

      const restoredAlliance: Alliance = {
        ...existingAlliance,
        isActive: true,
        deleteAt: null,
        updatedAt: new Date()
      };

      // En un caso real, aquí se restauraría en la base de datos
      console.log('Alianza restaurada:', restoredAlliance);
      
      return restoredAlliance;
    } catch (error) {
      console.error('Error al restaurar alianza:', error);
      throw error;
    }
  }
}

// Instancia singleton del servicio
export const allianceService = new AllianceService();
