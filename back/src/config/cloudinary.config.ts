import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryParams {
    folder?: string;
    resource_type?: string;
    public_id?: string;
};

// ✅ Almacenamiento para todo tipo de archivos (PDF, Word, PPT, etc.)
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (_req, file): Promise<CloudinaryParams> => ({
        folder: 'scala_documents',
        resource_type: 'raw', // 👈 permite subir archivos no visuales
        public_id: `${Date.now()}_${file.originalname}`,
    }),
});

export const upload = multer({ storage });
export default cloudinary;
