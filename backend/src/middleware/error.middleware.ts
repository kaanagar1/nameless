import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error('[Error]', err.message);

    // Multer file size error
    if (err.message?.includes('File too large')) {
        return res.status(413).json({
            success: false,
            error: 'Image must be under 5MB.',
        });
    }

    // Multer file type error
    if (err.message?.includes('Invalid file type')) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }

    // AI-related errors
    if (err.message?.includes('AI generation')) {
        return res.status(502).json({
            success: false,
            error: 'AI service is temporarily unavailable. Please try again.',
        });
    }

    // Default
    return res.status(500).json({
        success: false,
        error: 'An unexpected error occurred. Please try again.',
    });
}
