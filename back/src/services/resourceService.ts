import mongoose from "mongoose";
import Resource, { IResource } from "../models/Resource";

export class ResourceService {
    async getAllResources(includeDeleted = false): Promise<IResource[]> {
        const query = includeDeleted
        ? Resource.find().setOptions({ includeDeleted: true }) //Incluye soft deleted
        : Resource.find({ isActive: true }); //Solo activos
        return query.exec();
    }
    async createResource(data: Partial<IResource>): Promise<IResource> {
        const resource = new Resource(data);
        return resource.save();
    }

    async getResourceById(id: string): Promise<IResource | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return Resource.findById(id).exec();
    }

    async updateResource(id: string, data: Partial<Omit<IResource, "createdAt" | "updatedAt">>
    ): Promise<IResource | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return Resource.findOneAndUpdate({ _id: id }, data, { new: true }).exec();
    }

    async softDeleteResource(id: string): Promise<IResource | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return Resource.findByIdAndUpdate(id, { isActive: false, deletedAt: new Date() }, { new: true }).exec();
    }

    async getResourcesBySection(sectionId: string, includeDeleted = false): Promise<IResource[]> {
        const filter = includeDeleted
            ? {sectionId} // Incluye soft deleted
            : { sectionId, isActive: true }; // Solo activos

            const query = Resource.find(filter).setOptions({ includeDeleted: true });
        return query.exec();
    }

    //Método para restaurar un recurso
    async restoreResource(id: string): Promise<IResource | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        // Buscar incluso recursos eliminados
        const resource = await Resource.findById(id).setOptions({ includeDeleted: true });
        if (!resource) return null;

        // Restaurar solo si estaba eliminado
        if (!resource.isActive || resource.deletedAt) {
            resource.isActive = true;
            resource.deletedAt = null;
            return resource.save();
        }

        return resource; // Si ya estaba activo, lo devolvemos igual
    }
};