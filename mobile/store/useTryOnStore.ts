import { create } from 'zustand';
import type { Category } from '../constants/config';

export type Status = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

interface TryOnState {
    // Image URIs (local file paths)
    modelImage: string | null;
    garmentImage: string | null;
    category: Category;

    // Result from AI
    resultUrl: string | null;

    // Status tracking
    status: Status;
    error: string | null;

    // Actions
    setModelImage: (uri: string) => void;
    setGarmentImage: (uri: string) => void;
    setCategory: (category: Category) => void;
    setResult: (url: string) => void;
    setStatus: (status: Status) => void;
    setError: (msg: string) => void;
    reset: () => void;
}

export const useTryOnStore = create<TryOnState>((set) => ({
    modelImage: null,
    garmentImage: null,
    category: 'tops',
    resultUrl: null,
    status: 'idle',
    error: null,

    setModelImage: (uri: string) =>
        set({ modelImage: uri, error: null }),

    setGarmentImage: (uri: string) =>
        set({ garmentImage: uri, error: null }),

    setCategory: (category: Category) =>
        set({ category }),

    setResult: (url: string) =>
        set({ resultUrl: url, status: 'done' }),

    setStatus: (status: Status) =>
        set({ status }),

    setError: (msg: string) =>
        set({ error: msg, status: 'error' }),

    reset: () =>
        set({
            modelImage: null,
            garmentImage: null,
            category: 'tops',
            resultUrl: null,
            status: 'idle',
            error: null,
        }),
}));
