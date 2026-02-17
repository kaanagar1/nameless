import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { config } from '../config/env';

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image buffer to Cloudinary and return the public URL.
 */
export async function uploadImage(
    buffer: Buffer,
    mimeType: string
): Promise<string> {
    return new Promise((resolve, reject) => {
        const base64 = buffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64}`;

        cloudinary.uploader.upload(
            dataUri,
            {
                folder: 'virtual-tryon/uploads',
                resource_type: 'image',
            },
            (error, result?: UploadApiResponse) => {
                if (error) {
                    reject(new Error(`Upload failed: ${error.message}`));
                } else if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Upload failed: No result returned'));
                }
            }
        );
    });
}

/**
 * Upload a result image from URL to Cloudinary for permanent storage.
 */
export async function uploadFromUrl(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            imageUrl,
            {
                folder: 'virtual-tryon/results',
                resource_type: 'image',
            },
            (error, result?: UploadApiResponse) => {
                if (error) {
                    reject(new Error(`Upload from URL failed: ${error.message}`));
                } else if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Upload from URL failed: No result returned'));
                }
            }
        );
    });
}
