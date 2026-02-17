import axios from 'axios';
import { config } from '../config/env';

interface TryOnInput {
    modelImageUrl: string;
    garmentImageUrl: string;
    category: 'tops' | 'bottoms' | 'one-pieces';
}

interface FashnRunResponse {
    id: string;
    status: string;
}

interface FashnStatusResponse {
    id: string;
    status: 'completed' | 'processing' | 'starting' | 'failed';
    output: string[] | null;
    error: string | null;
}

/**
 * Submit a virtual try-on job to Fashn AI and poll until complete.
 * Returns the URL of the generated result image.
 */
export async function generateTryOn(input: TryOnInput): Promise<string> {
    // In mock mode, return a placeholder after a delay
    if (config.USE_MOCK_AI) {
        return mockGenerateTryOn(input);
    }

    // Step 1: Submit the try-on job
    const { data } = await axios.post<FashnRunResponse>(
        'https://api.fashn.ai/v1/run',
        {
            model_image: input.modelImageUrl,
            garment_image: input.garmentImageUrl,
            category: input.category,
        },
        {
            headers: {
                Authorization: `Bearer ${config.FASHN_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    console.log(`[AI] Job submitted: ${data.id}`);

    // Step 2: Poll for result
    const resultUrl = await pollForResult(data.id);
    return resultUrl;
}

/**
 * Poll Fashn AI until the job is completed or fails.
 */
async function pollForResult(predictionId: string): Promise<string> {
    const maxAttempts = 60; // up to 2 minutes
    const interval = 2000; // 2 seconds

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const { data } = await axios.get<FashnStatusResponse>(
            `https://api.fashn.ai/v1/status/${predictionId}`,
            {
                headers: {
                    Authorization: `Bearer ${config.FASHN_API_KEY}`,
                },
            }
        );

        console.log(`[AI] Poll attempt ${attempt + 1}: status=${data.status}`);

        if (data.status === 'completed' && data.output && data.output.length > 0) {
            return data.output[0];
        }

        if (data.status === 'failed') {
            throw new Error(`AI generation failed: ${data.error || 'Unknown error'}`);
        }

        await delay(interval);
    }

    throw new Error('AI generation timed out after 2 minutes');
}

/**
 * Mock AI response for development/testing without an API key.
 */
async function mockGenerateTryOn(input: TryOnInput): Promise<string> {
    console.log('[AI Mock] Simulating try-on generation...');
    console.log(`  Model: ${input.modelImageUrl}`);
    console.log(`  Garment: ${input.garmentImageUrl}`);
    console.log(`  Category: ${input.category}`);

    // Simulate processing delay (3 seconds)
    await delay(3000);

    // Return the model image as the "result" in mock mode
    // In production, this would be the AI-generated composite image
    return input.modelImageUrl;
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
