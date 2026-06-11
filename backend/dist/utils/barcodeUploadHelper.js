import { error } from "node:console";
import { cloudinary } from "./cloudinaryHelper.js";
export const barcode = async (buffer, sku) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: 'Scanventory/products/barcode',
            public_id: sku,
            resource_type: 'image'
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result.secure_url);
        }).end(buffer);
    });
};
//# sourceMappingURL=barcodeUploadHelper.js.map