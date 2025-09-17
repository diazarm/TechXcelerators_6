import { Request, Response } from "express";
import { SectionService } from "../services/sectionService";

const sectionService = new SectionService();

export const getSections = async (req: Request, res: Response) => {
  try {
    const sections = await sectionService.getAllSections();
    res.json({
      success: true,
      message: "Secciones obtenidas exitosamente",
      data: sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al obtener las secciones",
    });
  }
};

export const getSectionById = async (req: Request, res: Response) => {  
    try {
        const section = await sectionService.getSectionById(req.params.id);
        if (!section) {
            return res.status(404).json({
                success: false,
                error: "Sección no encontrada"
            });
        }   
        res.json({
            success: true,
            message: "Sección obtenida exitosamente",
            data: section
        });
    } catch (error) {
        res.status(500).json({  
            success: false,
            error: "Error interno del servidor al obtener la sección"
        });
    }   
};

export const createSection = async (req: Request, res: Response) => {
    try {
        const section = await sectionService.createSection(req.body);
        res.status(201).json({
            success: true,
            message: "Sección creada exitosamente",
            data: section
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error interno del servidor al crear la sección"
        });
    }
};
export const updateSection = async (req: Request, res: Response) => {
    try {
        const section = await sectionService.updateSection(req.params.id, req.body);
        if (!section) {
            return res.status(404).json({
                success: false,
                error: "Sección no encontrada"
            });
        }
        res.json({
            success: true,
            message: "Sección actualizada exitosamente",
            data: section
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error interno del servidor al actualizar la sección"
        });
    }
};
export const softDeleteSection = async (req: Request, res: Response) => {
    try {
        const section = await sectionService.softDeleteSection(req.params.id);
        if (!section) {
            return res.status(404).json({
                success: false,
                error: "Sección no encontrada"
            });
        }
        res.json({
            success: true,
            message: "Sección eliminada exitosamente",
            data: section
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error interno del servidor al eliminar la sección"
        });
    }
};
export const restoreSection = async (req: Request, res: Response) => {
    try {
        const section = await sectionService.restoreSection(req.params.id);
        if (!section) {
            return res.status(404).json({
                success: false,
                error: "Sección no encontrada"
            });
        }
        res.json({
            success: true,
            message: "Sección restaurada exitosamente",
            data: section
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error interno del servidor al restaurar la sección"
        });
    }
};