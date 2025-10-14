import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true }, // MIME (e.g., application/pdf)
    url: { type: String, required: true },  // /uploads/<file>
    filePath: { type: String, required: true }, // ruta real
    uploadDate: { type: Date, default: Date.now },
    uploadedBy: { type: String },
    size: { type: Number },
    originalName: { type: String },
    isDeleted: { type: Boolean, default: false }, // ✅ Soft delete
  },
  { versionKey: false, timestamps: false }
);

export type DocumentType = mongoose.InferSchemaType<typeof DocumentSchema>;
export default mongoose.model('Document', DocumentSchema);
