import { NextFunction, Request, Response } from "express";
import { SectionService } from "../services/sectionService";

const sectionService = new SectionService();

export const getSections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sections = await sectionService.getAllSections();
    res.json({
      success: true,
      message: "Secciones obtenidas exitosamente",
      data: sections,
    });
  } catch (error) {
    next(error);
  }
};

export const getSectionById = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
};

export const createSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const section = await sectionService.createSection(req.body);
        res.status(201).json({
            success: true,
            message: "Sección creada exitosamente",
            data: section
        });
    } catch (error) {
        next(error);
    }
};
export const updateSection = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
};
export const softDeleteSection = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
};
export const restoreSection = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
};