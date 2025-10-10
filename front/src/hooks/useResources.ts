import { useEffect, useState } from "react";
import type { IResource } from "../types/resource";
import { resourceService } from "../services/resourceService";

export const useResources = () => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    setLoading(true);
    const data = await resourceService.getAllResources();
    setResources(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return { resources, loading };
};
