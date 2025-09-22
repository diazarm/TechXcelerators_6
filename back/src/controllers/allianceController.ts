import { NextFunction, Request, Response } from 'express';
import { allianceService } from '../services/allianceService';

export const getAlliances = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const alliances = await allianceService.getAlliances();
        res.status(200).json({
            success: true,
            message: 'Alianzas obtenidas exitosamente',
            data: alliances
        });
    } catch (error) {
        next(error);
    }
};

export const getAllianceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const alliance = await allianceService.getAllianceById(req.params.id);
        if (!alliance) {
            return res.status(404).json({ 
                success: false,
                error: 'Alianza no encontrada' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Alianza obtenida exitosamente',
            data: alliance
        });
    } catch (error) {
        next(error);
    }
};

export const createAlliance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newAlliance = await allianceService.createAlliance(req.body);
        res.status(201).json({
            success: true,
            message: 'Alianza creada exitosamente',
            data: newAlliance
        });
    } catch (error) {
        next(error);
    }
};


export const updateAlliance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await allianceService.updateAlliance(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ 
                success: false,
                error: 'Alianza no encontrada o inactiva' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Alianza actualizada exitosamente',
            data: updated
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAlliance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await allianceService.softDeleteAlliance(req.params.id);
        if (!deleted) {
            return res.status(404).json({ 
                success: false,
                error: 'Alianza no encontrada' 
            });
        }
        res.status(200).json({ 
            success: true,
            message: 'Alianza eliminada exitosamente (eliminación suave)',
            data: deleted 
        });
    } catch (error) {
        next(error);
    }
};

export const restoreAlliance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restored = await allianceService.restoreAlliance(req.params.id);  
        if (!restored) {
            return res.status(404).json({ 
                success: false,
                error: 'Alianza no encontrada o no estaba eliminada' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Alianza restaurada exitosamente',
            data: restored
        });
    } catch (error) {
        next(error);
    }
};
