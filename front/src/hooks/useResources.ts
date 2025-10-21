import { useEffect, useState } from "react";
import type { IResource } from "../types/resource";
import { resourceService } from "../services/resourceService";
import { useAuth } from "./useAuth";

export const useResources = () => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchResources = async () => {
    if (!isAuthenticated) {
      return; // No hacer llamada si no está autenticado
    }
    
    setLoading(true);
    try {
      const data = await resourceService.getAllResources();
      setResources(data);
    } catch {
      // Si hay error, mantener array vacío
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [isAuthenticated]); // Solo ejecutar cuando cambie el estado de autenticación

  return { resources, loading };
};
