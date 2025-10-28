// src/config/cloudinary.config.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Almacenamiento para todo tipo de archivos (PDF, Word, PPT, etc.)
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => ({
    folder: 'scala_documents',        // Carpeta opcional
    resource_type: 'raw',             // Archivos no visuales
    public_id: `${Date.now()}_${file.originalname}`,
    upload_preset: 'public_raw',      // preset Unsigned
  }),
});

export const upload = multer({ storage });
export default cloudinary;
