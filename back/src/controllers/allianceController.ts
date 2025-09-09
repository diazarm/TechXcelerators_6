import { Request, Response } from 'express';
import { allianceService } from '../services/allianceService';

export const getAlliances = async (req: Request, res: Response) => {
    try {
        const alliances = await allianceService.getAlliances();
        console.log(alliances);
        res.json(alliances);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching alliances' });
    }
};

export const getAllianceById = async (req: Request, res: Response) => {
    try {
        const alliance = await allianceService.getAllianceById(req.params.id);
        if (!alliance) {
            return res.status(404).json({ message: 'Alliance not found' });
        }
        res.json(alliance);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching alliance' });
    }
};

export const createAlliance = async (req: Request, res: Response) => {
    try{

        const newAlliance = await allianceService.createAlliance(req.body);
        console.log(newAlliance)
        res.status(201).json(newAlliance);
    } catch (error) {
        console.error("error creando la alianza: ", error)
        res.status(500).json({ error: 'Error creating alliance' });
    }
};

export const updateAlliance = async (req: Request, res: Response) => {
    try {
        const updated = await allianceService.updateAlliance(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Alliance not found or inactive' });
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error updating alliance' });
    }
};

export const deleteAlliance = async (req: Request, res: Response) => {
    try {
        const deleted = await allianceService.softDeleteAlliance(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Alliance not found' });
        }
        res.status(200).json({ message: 'Alliance soft-deleted successfully', deleted });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting alliance' });
    }
};
