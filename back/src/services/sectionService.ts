import mongoose from "mongoose";
import Section, { ISection } from "../models/Section";

export class SectionService {
    async getAllSections(): Promise<ISection[]> {
        return await Section.find().exec();
    }       
    async createSection(data: Partial<ISection>): Promise<ISection> {
        const section = new Section(data);
        return await section.save();
    }
    async getSectionById(id: string): Promise<ISection | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Section.findById(id).exec();
    }
    async updateSection(id: string, data: Partial<Omit<ISection, "createdAt" | "updatedAt">>
    ): Promise<ISection | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Section.findOneAndUpdate({ _id: id }, data, { new: true }).exec();
    }
    async softDeleteSection(id: string): Promise<ISection | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Section.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
    }
    async getSectionsByResource(resourceId: string): Promise<ISection[]> {
        return await Section.find({ resourceId }).exec();
    }
    //Método para restaurar una sección
    async restoreSection(id: string): Promise<ISection | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        // Buscar incluso secciones eliminadas
        const section = await Section.findById(id).setOptions({ includeDeleted: true });
        if (!section) return null;

        // Restaurar solo si estaba eliminada
        if (!section.isActive) {
            section.isActive = true;
            return await section.save();
        }
        return await Section.findByIdAndUpdate(id, { isActive: true }, { new: true }).exec();
    }
};