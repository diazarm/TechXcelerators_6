import mongoose, { Schema, model, Document } from "mongoose";

export interface IAlliance extends Document {
    name: string;
    siglas: string;
    url?: string;
    logos: {
    label?: string;
    url?: string;
  }[];
    isActive: boolean;
    deleteAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const allianceSchema = new Schema<IAlliance>({
    name: { type: String, required: true },
    siglas: { type: String, required: true },
    url: { type: String },
    logos: [
      {
        label: {type: String},
        url: {type: String},
      },
    ],
    isActive: { type: Boolean, default: true },
    deleteAt: { type: Date, default: null }
}, {
    timestamps: true
});

const Alliance = model<IAlliance>("Alliance", allianceSchema);

export default Alliance;
