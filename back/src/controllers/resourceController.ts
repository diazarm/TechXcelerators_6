import { NextFunction, Request, Response } from "express";
import { ResourceService } from "../services/resourceService";

const resourceService = new ResourceService();

export const getResources = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const includeDeleted = req.query.includeDeleted === 'true';
        console.log('includeDeleted:', includeDeleted);
        const resources = await resourceService.getAllResources(includeDeleted);

        res.status(200).json({
            success: true,
            message: "Recursos obtenidos correctamente",
            data: resources
        });
    } catch (error) {
        next(error);
    }
}

export const createResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resource = await resourceService.createResource(req.body);
    res.status(201).json({
      success: true,
      message: "Recurso creado correctamente",
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

export const getResourceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resource = await resourceService.getResourceById(req.params.id);
    if (!resource) {
      return res
        .status(404)
        .json({ success: false, message: "Recurso no encontrado" });
    }
    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    next(error);
  }
};

export const getResourcesBySection = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const sectionId = req.params.sectionId;
        const includeDeleted = req.query.includeDeleted === 'true';
        const resources = await resourceService.getResourcesBySection(sectionId, includeDeleted);
        res.status(200).json({
            success: true,
            message: "Recursos obtenidos correctamente",
            data: resources
        });
    } catch (error) {
        next(error);
    }
}

export const updateResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resource = await resourceService.updateResource(
      req.params.id,
      req.body
    );
    if (!resource) {
      return res
        .status(404)
        .json({ success: false, message: "Recurso no encontrado" });
    }
    res.status(200).json({
      success: true,
      message: "Recurso actualizado correctamente",
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resource = await resourceService.softDeleteResource(req.params.id);
    if (!resource) {
      return res
        .status(404)
        .json({ success: false, message: "Recurso no encontrado" });
    }
    res.status(200).json({
      success: true,
      message: "Recurso eliminado(soft delete) correctamente",
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

//Función para restaurar un recurso (en caso de necesitarlo)
export const restoreResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resource = await resourceService.restoreResource(req.params.id);
    if (!resource) {
      return res
        .status(404)
        .json({ success: false, message: "Recurso no encontrado" });
    }
    return res.status(200).json({
      success: true,
      message: "Recurso restaurado correctamente",
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

// Función para obtener recursos por alianza
export const getResourcesByAlliance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resources = await resourceService.getResourcesByAlliance(
      req.params.name
    );
    if (!resources || resources.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron recursos para la alianza solicitada",
        data: [],
      });
    }
    res.json({
      success: true,
      message: "Recursos obtenidos correctamente",
      data: resources,
    });
  } catch (error) {
    next(error);
  }
};
