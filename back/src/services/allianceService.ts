import mongoose from 'mongoose';
import Alliance, { IAlliance } from '../models/Alliance';

export class AllianceService {
    async getAlliances(): Promise<IAlliance[]> {
        return await Alliance.find({ is_active: true, deleteAt: null }).exec();
    }

    async getAllianceById(id: string): Promise<IAlliance | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Alliance.findOne({ _id: id, is_active: true, deleteAt: null }).exec();
    }

    async createAlliance(data: Partial<IAlliance>): Promise<IAlliance> {
        const newAlliance = new Alliance(data);
        console.log(newAlliance)
        return await newAlliance.save();
    }

    async updateAlliance(id: string, data: Partial<IAlliance>): Promise<IAlliance | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Alliance.findOneAndUpdate(
            { _id: id, is_active: true, deleteAt: null },
            { ...data, updatedAt: new Date() },
            { new: true, runValidators: true }
        ).exec();
    }

    async softDeleteAlliance(id: string): Promise<IAlliance | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Alliance.findOneAndUpdate(
            { _id: id, is_active: true },
            { is_active: false, deleteAt: new Date() },
            { new: true }
        ).exec();
    }

    async restoreAlliance(id: string): Promise<IAlliance | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const alliance = await Alliance.findById(id).exec();
        if (!alliance) return null;

        if (!alliance.is_active && alliance.deleteAt) {
            alliance.is_active = true;
            alliance.deleteAt = null;
            await alliance.save();
        }
        return alliance;
    }
}

export const allianceService = new AllianceService();
