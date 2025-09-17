import mongoose, { Document, model, Schema } from "mongoose";

export interface ISection extends Document {
    sectionId: Schema.Types.ObjectId;
    title: string;
    description: string;
    resources: Schema.Types.ObjectId;
    isActive: boolean;
}

const sectionSchema = new Schema<ISection>({
    sectionId: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    resources: { 
        type: Schema.Types.ObjectId, 
        ref: "Resource" 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
},
    { timestamps: true }
);

const Section = model<ISection>('Section', sectionSchema);

export default Section;
