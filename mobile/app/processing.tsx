import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTryOnStore } from '../store/useTryOnStore';
import { submitTryOn } from '../services/api';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ErrorMessage } from '../components/ErrorMessage';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ProcessingScreen() {
    const router = useRouter();
    const {
        modelImage,
        garmentImage,
        category,
        status,
        error,
        setStatus,
        setResult,
        setError,
    } = useTryOnStore();

    const hasStarted = useRef(false);

    useEffect(() => {
        if (hasStarted.current) return;
        if (!modelImage || !garmentImage) {
            router.replace('/select-photo');
            return;
        }

        hasStarted.current = true;
        processTryOn();
    }, []);

    const processTryOn = async () => {
        try {
            setStatus('uploading');

            const result = await submitTryOn(modelImage!, garmentImage!, category);

            setResult(result.resultUrl);
            router.replace('/result');
        } catch (err: any) {
            console.error('[Processing] Error:', err);
            const message =
                err?.response?.data?.error ||
                err?.message ||
                'Something went wrong. Please try again.';
            setError(message);
        }
    };

    const handleRetry = () => {
        hasStarted.current = false;
        setStatus('idle');
        processTryOn();
    };

    const handleGoBack = () => {
        setStatus('idle');
        router.back();
    };

    return (
        <View style={styles.container}>
            {(status === 'uploading' || status === 'processing') && (
                <LoadingOverlay
                    message={status === 'uploading' ? 'Uploading images...' : 'AI is working...'}
                    submessage="This usually takes 15–30 seconds"
                />
            )}

            {status === 'error' && (
                <Animated.View entering={FadeInDown.duration(300)} style={styles.errorContainer}>
                    <ErrorMessage message={error || 'Unknown error'} onRetry={handleRetry} />
                    <Text style={styles.backLink} onPress={handleGoBack}>
                        ← Go back and change images
                    </Text>
                </Animated.View>
            )}

            {status === 'idle' && (
                <View style={styles.center}>
                    <Text style={styles.idleText}>Preparing...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0F',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    backLink: {
        color: '#8B8B9E',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    idleText: {
        color: '#8B8B9E',
        fontSize: 16,
    },
});
