import { Schema, model, Document } from "mongoose";

export interface ISearchLog extends Document {
  term: string;
  normalizedTerm: string;
  userRole?: string;
  createdAt: Date;
}

const SearchLogSchema = new Schema<ISearchLog>({
  term: { type: String, required: true },
  normalizedTerm: { type: String, required: true },
  userRole: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const SearchLog = model<ISearchLog>("SearchLog", SearchLogSchema);
