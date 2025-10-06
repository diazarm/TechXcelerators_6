/**
 * Hook useAlliances
 * Maneja el estado y operaciones CRUD de alianzas
 */

import { useState, useCallback } from 'react';
import type {
  Alliance,
  CreateAllianceRequest,
  UpdateAllianceRequest,
  AllianceFilters,
  AllianceState,
  AllianceActions
} from '../types/alliance';
import { allianceService } from '../services/allianceService';

/**
 * Hook personalizado para manejo de alianzas
 * Proporciona estado y acciones para operaciones CRUD
 */
export const useAlliances = (): AllianceState & AllianceActions => {
  // Estado del hook
  const [alliances, setAlliances] = useState<Alliance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlliance, setSelectedAlliance] = useState<Alliance | null>(null);

  /**
   * Obtener todas las alianzas
   */
  const getAlliances = useCallback(async (filters?: AllianceFilters): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await allianceService.getAlliances(filters);
      setAlliances(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener alianzas';
      setError(errorMessage);
      console.error('Error en getAlliances:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtener alianza por ID
   */
  const getAllianceById = useCallback(async (id: string): Promise<Alliance | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const alliance = await allianceService.getAllianceById(id);
      if (alliance) {
        setSelectedAlliance(alliance);
      }
      return alliance;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener alianza';
      setError(errorMessage);
      console.error('Error en getAllianceById:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crear nueva alianza
   */
  const createAlliance = useCallback(async (data: CreateAllianceRequest): Promise<Alliance> => {
    try {
      setLoading(true);
      setError(null);
      
      const newAlliance = await allianceService.createAlliance(data);
      
      // Actualizar la lista de alianzas
      setAlliances(prev => [...prev, newAlliance]);
      
      return newAlliance;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear alianza';
      setError(errorMessage);
      console.error('Error en createAlliance:', err);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualizar alianza existente
   */
  const updateAlliance = useCallback(async (id: string, data: UpdateAllianceRequest): Promise<Alliance> => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedAlliance = await allianceService.updateAlliance(id, data);
      
      // Actualizar la lista de alianzas
      setAlliances(prev => 
        prev.map(alliance => 
          alliance._id === id ? updatedAlliance : alliance
        )
      );
      
      // Actualizar la alianza seleccionada si es la misma
      if (selectedAlliance?._id === id) {
        setSelectedAlliance(updatedAlliance);
      }
      
      return updatedAlliance;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar alianza';
      setError(errorMessage);
      console.error('Error en updateAlliance:', err);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  }, [selectedAlliance]);

  /**
   * Eliminar alianza (soft delete)
   */
  const deleteAlliance = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await allianceService.deleteAlliance(id);
      
      // Remover de la lista de alianzas
      setAlliances(prev => prev.filter(alliance => alliance._id !== id));
      
      // Limpiar selección si era la alianza seleccionada
      if (selectedAlliance?._id === id) {
        setSelectedAlliance(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar alianza';
      setError(errorMessage);
      console.error('Error en deleteAlliance:', err);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  }, [selectedAlliance]);

  /**
   * Restaurar alianza eliminada
   */
  const restoreAlliance = useCallback(async (id: string): Promise<Alliance> => {
    try {
      setLoading(true);
      setError(null);
      
      const restoredAlliance = await allianceService.restoreAlliance(id);
      
      // Agregar de vuelta a la lista de alianzas
      setAlliances(prev => [...prev, restoredAlliance]);
      
      return restoredAlliance;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al restaurar alianza';
      setError(errorMessage);
      console.error('Error en restoreAlliance:', err);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Limpiar errores
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Retornar estado y acciones
  return {
    // Estado
    alliances,
    loading,
    error,
    selectedAlliance,
    
    // Acciones
    getAlliances,
    getAllianceById,
    createAlliance,
    updateAlliance,
    deleteAlliance,
    restoreAlliance,
    clearError,
    setSelectedAlliance
  };
};
