import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['manual', 'informe', 'guia', 'politicas', 'faqs', 'otros'],
      required: true
    },
    type: { type: String, required: true }, // MIME (e.g., application/pdf)
    url: { type: String, required: true },  // ✅ URL pública de Cloudinary
    publicId: { type: String, required: true }, // ID en Cloudinary
    uploadDate: { type: Date, default: Date.now },
    uploadedBy: { type: String },
    size: { type: Number },
    originalName: { type: String },
    isDeleted: { type: Boolean, default: false }, // ✅ Soft delete
    visibleTo: {
      type: [String],
      enum: ['admin', 'director', 'user'],
      default: ['admin', 'director', 'user']
    }
  },
  { versionKey: false, timestamps: false }
);

export type DocumentType = mongoose.InferSchemaType<typeof DocumentSchema>;
export default mongoose.model('Document', DocumentSchema);
