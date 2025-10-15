import mongoose from "mongoose";
import Resource, { IResource } from "../models/Resource";
import { createFlexibleRegex, normalizeText } from "../utils/normalizeText";

export class ResourceService {
  //Obtener todos los recursos
  async getAllResources(includeDeleted = false, includeInactive = false): Promise<IResource[]> {
    const filter: any = {};

    if (!includeDeleted) filter.deletedAt = null; //Ignora los soft deleted
    if (!includeInactive) filter.isActive = true; //Ignora los inactivos

    return Resource.find(filter).setOptions({ includeDeleted: true }).sort({ createdAt: -1 }).exec();
  }

  //Crear un recurso
  async createResource(data: Partial<IResource>): Promise<IResource> {
    const resource = new Resource(data);
    return resource.save();
  }

  //Obtener un recurso por ID (incluye soft deleted)
  async getResourceById(
    id: string,
    includeDeleted = false,
    includeInactive = false
  ): Promise<IResource | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    // Construimos el filtro base
    const filter: any = { _id: id };

    if (!includeDeleted) filter.deletedAt = null; // Solo incluir eliminados si se indica explícitamente
    if (!includeInactive) filter.isActive = true; // Solo incluir inactivos si se indica explícitamente

    return Resource.findOne(filter).setOptions({ includeDeleted: true }).exec();
  }


  //Actualizar un recurso (aunque esté soft deleted o inactivo)
  async updateResource(
    id: string,
    data: Partial<Omit<IResource, "createdAt" | "updatedAt">>
  ): Promise<IResource | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    // Buscar incluso los inactivos, pero no los eliminados
    const resource = await Resource.findOne({ _id: id, deletedAt: null })
      .setOptions({ includeDeleted: true });

    if (!resource) return null;

    Object.assign(resource, data);
    return resource.save();
  }


  //Soft delete de un recurso (marca como eliminado sin borrarlo)
  async softDeleteResource(id: string): Promise<IResource | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const resource = await Resource.findById(id).setOptions({ includeDeleted: true });
    if (!resource) return null;

    //Actualizamos los campos isActive y deletedAt
    resource.isActive = false; //Al eliminarlo también lo desactivamos
    resource.deletedAt = new Date();
    return resource.save();
  }

  //Obtener recursos por sección (opcionalmente incluyendo los soft deleted)
  async getResourcesBySection(sectionId: string, includeDeleted = false, includeInactive = false): Promise<IResource[]> {
    const filter: any = { sectionId };

    if (!includeDeleted) filter.deletedAt = null; // Ignora los soft deleted
    if (!includeInactive) filter.isActive = true; // Ignora los inactivos

    return Resource.find(filter).setOptions({ includeDeleted: true }).sort({ createdAt: -1 }).exec();
  }

  //Método para restaurar un recurso
  async restoreResource(id: string): Promise<IResource | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    // Buscar incluso recursos eliminados
    const resource = await Resource.findById(id).setOptions({
      includeDeleted: true,
    });
    if (!resource) return null;

    // Restaurar solo si estaba eliminado
    if (!resource.isActive || resource.deletedAt) {
      resource.isActive = true;
      resource.deletedAt = null;
      return resource.save();
    }

    return resource; // Si ya estaba activo, lo devolvemos igual
  }

  //Método para buscar recursos por alianza
  async getResourcesByAlliance(allianceLabel: string): Promise<any[]> {
    const normalizedLabel = normalizeText(allianceLabel);
    const exactRegex = createFlexibleRegex(`.*${normalizedLabel}.*`);

    return Resource.aggregate([
      { $unwind: "$links" },
      { $match: { "links.label": exactRegex } },
      {
        $project: {
          _id: 0,
          name: 1,
          label: "$links.label",
          url: "$links.url",
        },
      },
    ]).exec();
  }
}
