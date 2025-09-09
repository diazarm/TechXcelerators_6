import type { IResource } from "../types/resource";
import { mockResources } from "../Mock/MockResources";

export const ResourceService = {
  getAll: async (): Promise<IResource[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResources), 300);
    });
  },
};
