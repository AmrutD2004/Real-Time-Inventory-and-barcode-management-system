
import { error } from "node:console";
import { cloudinary } from "./cloudinaryHelper.ts";

export const barcode = async (buffer: Buffer, sku: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: 'Scanventory/products/barcode',
            public_id: sku,
            resource_type: 'image'
        },
            (error, result) => {
                if (error) return reject(error);
                resolve(result!.secure_url);
            }
        ).end(buffer)
    })
}   