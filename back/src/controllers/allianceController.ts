import { Request, Response } from 'express';
import { allianceService } from '../services/allianceService';

export const getAlliances = async (req: Request, res: Response) => {
    try {
        const alliances = await allianceService.getAlliances();
        res.json({
            success: true,
            message: 'Alianzas obtenidas exitosamente',
            data: alliances
        });
    } catch (error) {
        console.error('Error al obtener alianzas:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al obtener las alianzas' 
        });
    }
};

export const getAllianceById = async (req: Request, res: Response) => {
    try {
        const alliance = await allianceService.getAllianceById(req.params.id);
        if (!alliance) {
            return res.status(404).json({ 
                success: false,
                error: 'Alianza no encontrada' 
            });
        }
        res.json({
            success: true,
            message: 'Alianza obtenida exitosamente',
            data: alliance
        });
    } catch (error) {
        console.error('Error al obtener alianza por ID:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al obtener la alianza' 
        });
    }
};

export const createAlliance = async (req: Request, res: Response) => {
    try {
        const newAlliance = await allianceService.createAlliance(req.body);
        res.status(201).json({
            success: true,
            message: 'Alianza creada exitosamente',
            data: newAlliance
        });
    } catch (error) {
        console.error('Error al crear la alianza:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al crear la alianza' 
        });
    }
};

export const updateAlliance = async (req: Request, res: Response) => {
    try {
        const updated = await allianceService.updateAlliance(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ 
                success: false,
                error: 'Alianza no encontrada o inactiva' 
            });
        }
        res.json({
            success: true,
            message: 'Alianza actualizada exitosamente',
            data: updated
        });
    } catch (error) {
        console.error('Error al actualizar la alianza:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al actualizar la alianza' 
        });
    }
};

export const deleteAlliance = async (req: Request, res: Response) => {
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
        console.error('Error al eliminar la alianza:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al eliminar la alianza' 
        });
    }
};

export const restoreAlliance = async (req: Request, res: Response) => {
    try {
        const restored = await allianceService.restoreAlliance(req.params.id);  
        if (!restored) {
            return res.status(404).json({ 
                success: false,
                error: 'Alianza no encontrada o no estaba eliminada' 
            });
        }
        res.json({
            success: true,
            message: 'Alianza restaurada exitosamente',
            data: restored
        });
    } catch (error) {
        console.error('Error al restaurar la alianza:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al restaurar la alianza' 
        });
    }
};
