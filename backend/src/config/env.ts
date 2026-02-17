import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: parseInt(process.env.PORT || '3001', 10),

    // Fashn AI
    FASHN_API_KEY: process.env.FASHN_API_KEY || '',

    // Cloudinary
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',

    // Mock mode
    USE_MOCK_AI: process.env.USE_MOCK_AI === 'true',
};
