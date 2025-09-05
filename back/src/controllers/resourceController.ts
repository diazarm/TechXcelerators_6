import { Request, Response } from 'express';
import { ResourceService } from '../services/resourceService';

const resourceService = new ResourceService();

export const getResources = async (req: Request, res: Response) => {
    try {
        const resources = await resourceService.getAllResources();
        res.status(200).json({
            success: true,
            message: "Recursos obtenidos correctamente",
            data: resources
        });
    } catch (error) {
        console.error('Error al obtener los recursos:', error);
        res.status(500).json({ success: false, message: "Error al obtener los recursos" });
    }
}

export const createResource = async (req: Request, res: Response) => {
    try {
        const resource = await resourceService.createResource(req.body);
        res.status(201).json({
            success: true,
            message: "Recurso creado correctamente",
            data: resource
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al crear el recurso" });
    }
};
export const getResourceById = async (req: Request, res: Response) => {
    try {
        const resource = await resourceService.getResourceById(req.params.id);
        if (!resource) {
            return res.status(404).json({ success: false, message: "Recurso no encontrado" });
        }
        res.json({success: true, data: resource});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener el recurso" });
    }
};

export const getResourcesBySection = async (req: Request, res: Response) => {
    try {
        const resources = await resourceService.getResourcesBySection(req.params.sectionId);
        res.json({
            success: true,
            message: "Recursos obtenidos correctamente",
            data: resources
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener los recursos" });
    }
}

export const updateResource = async (req: Request, res: Response) => {
    try {
        const resource = await resourceService.updateResource(req.params.id, req.body);
        if (!resource) {
            return res.status(404).json({ success: false, message: "Recurso no encontrado" });
        }
        res.json({success: true, message: "Recurso actualizado correctamente", data: resource});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar el recurso" });
    }
};

export const deleteResource = async (req: Request, res: Response) => {
    try {
        const resource = await resourceService.softDeleteResource(req.params.id);
        if (!resource) {
            return res.status(404).json({success: false, message: 'Recurso no encontrado' });
        }
        res.status(200).json({ success: true, message: 'Recurso eliminado(soft delete) correctamente', data: resource });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el recurso' });
    }
    
};

//Función para restaurar un recurso (en caso de necesitarlo)
export const restoreResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.restoreResource(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: "Recurso no encontrado" });
    }
    return res.status(200).json({ success: true, message: "Recurso restaurado correctamente", data: resource });
  } catch (error) {
    console.error("Error al restaurar recurso:", error);
    return res.status(500).json({ success: false, message: "Error al restaurar recurso" });
  }
};
