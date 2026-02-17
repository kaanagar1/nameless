// Backend API URL - change this to your production URL when deploying
// For local development, use your machine's local IP address
export const API_URL = 'http://192.168.1.100:3001';

// Image constraints
export const MAX_IMAGE_SIZE_MB = 5;
export const IMAGE_QUALITY = 0.7;
export const IMAGE_MAX_WIDTH = 1024;

// Clothing categories
export const CATEGORIES = [
    { id: 'tops', label: '👕 Tops', icon: '👕' },
    { id: 'bottoms', label: '👖 Bottoms', icon: '👖' },
    { id: 'one-pieces', label: '👗 One-Pieces', icon: '👗' },
] as const;

export type Category = (typeof CATEGORIES)[number]['id'];
