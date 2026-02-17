import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import { handleTryOn } from '../controllers/tryon.controller';

const router = Router();

/**
 * POST /api/tryon
 *
 * Accepts multipart form data with:
 *   - modelImage: The user's photo (JPEG/PNG/WebP, max 5MB)
 *   - garmentImage: The clothing item image (JPEG/PNG/WebP, max 5MB)
 *   - category: "tops" | "bottoms" | "one-pieces" (optional, defaults to "tops")
 *
 * Returns:
 *   - success: boolean
 *   - resultUrl: URL of the generated try-on image
 *   - modelImageUrl: URL of the uploaded model image
 *   - garmentImageUrl: URL of the uploaded garment image
 */
router.post(
    '/',
    upload.fields([
        { name: 'modelImage', maxCount: 1 },
        { name: 'garmentImage', maxCount: 1 },
    ]),
    handleTryOn
);

export { router as tryonRoutes };
