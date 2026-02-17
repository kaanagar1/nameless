import axios from 'axios';
import { API_URL } from '../constants/config';

const client = axios.create({
    baseURL: API_URL,
    timeout: 120_000, // 2 min timeout — AI processing can take up to 60s
});

/**
 * Submit images for virtual try-on processing.
 * @param modelImageUri - Local URI of the user's photo
 * @param garmentImageUri - Local URI of the clothing item
 * @param category - Clothing category: 'tops' | 'bottoms' | 'one-pieces'
 * @returns URL of the generated try-on result image
 */
export async function submitTryOn(
    modelImageUri: string,
    garmentImageUri: string,
    category: string = 'tops'
): Promise<{ resultUrl: string; modelImageUrl: string; garmentImageUrl: string }> {
    const formData = new FormData();

    formData.append('modelImage', {
        uri: modelImageUri,
        name: 'model.jpg',
        type: 'image/jpeg',
    } as any);

    formData.append('garmentImage', {
        uri: garmentImageUri,
        name: 'garment.jpg',
        type: 'image/jpeg',
    } as any);

    formData.append('category', category);

    const { data } = await client.post('/api/tryon', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (!data.success) {
        throw new Error(data.error || 'Try-on failed');
    }

    return {
        resultUrl: data.resultUrl,
        modelImageUrl: data.modelImageUrl,
        garmentImageUrl: data.garmentImageUrl,
    };
}

/**
 * Check if the backend is reachable.
 */
export async function checkHealth(): Promise<boolean> {
    try {
        const { data } = await client.get('/api/health', { timeout: 5000 });
        return data.status === 'ok';
    } catch {
        return false;
    }
}
