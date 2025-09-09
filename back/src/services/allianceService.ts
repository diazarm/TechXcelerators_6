import mongoose from 'mongoose';
import Alliance, { IAlliance } from '../models/Alliance';

export class AllianceService {
    async getAlliances(): Promise<IAlliance[]> {
        return await Alliance.find({ isActive: true, deleteAt: null }).exec();
    }

    async getAllianceById(id: string): Promise<IAlliance | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Alliance.findOne({ _id: id, isActive: true, deleteAt: null }).exec();
    }

    async createAlliance(data: Partial<IAlliance>): Promise<IAlliance> {
        const newAlliance = new Alliance(data);
        return await newAlliance.save();
    }

    async updateAlliance(id: string, data: Partial<IAlliance>): Promise<IAlliance | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Alliance.findOneAndUpdate(
            { _id: id, isActive: true, deleteAt: null },
            data,
            { new: true, runValidators: true }
        ).exec();
    }

    async softDeleteAlliance(id: string): Promise<IAlliance | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Alliance.findOneAndUpdate(
            { _id: id, isActive: true, deleteAt: null },
            { isActive: false, deleteAt: new Date() },
            { new: true }
        ).exec();
    }

    async restoreAlliance(id: string): Promise<IAlliance | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const alliance = await Alliance.findById(id).exec();
        if (!alliance) return null;

        if (!alliance.isActive && alliance.deleteAt) {
            alliance.isActive = true;
            alliance.deleteAt = null;
            await alliance.save();
        }
        return alliance;
    }
}

export const allianceService = new AllianceService();
