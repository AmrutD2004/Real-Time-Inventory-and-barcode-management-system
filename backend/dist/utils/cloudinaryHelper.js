import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { config } from "dotenv";
config();
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_SECRET_KEY;
const cloud_name = process.env.CLOUDINARY_NAME;
cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: 'Scanventory/products',
        format: 'png', // supports promises as well
        public_id: file.originalname + '-' + Date.now(),
    }),
});
export const upload = multer({ storage: storage, limits: { fieldSize: 5 * 1024 * 1024 } });
export { cloudinary };
//# sourceMappingURL=cloudinaryHelper.js.map