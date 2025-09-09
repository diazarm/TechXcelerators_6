import { useEffect, useState } from "react";
import type { IResource } from "../types/resource";
import { ResourceService } from "../services/resourceService";

export const useResources = () => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    setLoading(true);
    const data = await ResourceService.getAll();
    setResources(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return { resources, loading };
};
