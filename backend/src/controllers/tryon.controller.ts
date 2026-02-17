import { Request, Response, NextFunction } from 'express';
import { uploadImage } from '../services/storage.service';
import { generateTryOn } from '../services/ai.service';

type MulterFiles = { [fieldname: string]: Express.Multer.File[] };

/**
 * Handle virtual try-on request.
 * Expects multipart form with `modelImage` and `garmentImage` files,
 * plus an optional `category` field.
 */
export async function handleTryOn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const files = req.files as MulterFiles;

        // Validate that both images are present
        if (!files?.modelImage?.[0] || !files?.garmentImage?.[0]) {
            return res.status(400).json({
                success: false,
                error: 'Both modelImage and garmentImage are required.',
            });
        }

        const modelFile = files.modelImage[0];
        const garmentFile = files.garmentImage[0];
        const category = (req.body.category as string) || 'tops';

        // Validate category
        const validCategories = ['tops', 'bottoms', 'one-pieces'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                error: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
            });
        }

        console.log(`[TryOn] Processing request - category: ${category}`);
        console.log(`  Model image: ${modelFile.originalname} (${modelFile.size} bytes)`);
        console.log(`  Garment image: ${garmentFile.originalname} (${garmentFile.size} bytes)`);

        // Upload both images to cloud storage in parallel
        const [modelImageUrl, garmentImageUrl] = await Promise.all([
            uploadImage(modelFile.buffer, modelFile.mimetype),
            uploadImage(garmentFile.buffer, garmentFile.mimetype),
        ]);

        console.log(`[TryOn] Images uploaded to cloud storage`);

        // Call AI API to generate try-on result
        const resultUrl = await generateTryOn({
            modelImageUrl,
            garmentImageUrl,
            category: category as 'tops' | 'bottoms' | 'one-pieces',
        });

        console.log(`[TryOn] AI result generated: ${resultUrl}`);

        return res.json({
            success: true,
            resultUrl,
            modelImageUrl,
            garmentImageUrl,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Health check endpoint.
 */
export function healthCheck(_req: Request, res: Response) {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
}
