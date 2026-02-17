import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { useTryOnStore } from '../store/useTryOnStore';
import { ResultViewer } from '../components/ResultViewer';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function ResultScreen() {
    const router = useRouter();
    const { resultUrl, reset } = useTryOnStore();

    if (!resultUrl) {
        router.replace('/');
        return null;
    }

    const handleTryAnother = () => {
        reset();
        router.replace('/');
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out my virtual try-on result! ${resultUrl}`,
                url: resultUrl,
            });
        } catch {
            // User cancelled share
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            bounces={false}
        >
            <Animated.View entering={FadeInDown.duration(500)}>
                <View style={styles.successBadge}>
                    <Text style={styles.successIcon}>✨</Text>
                    <Text style={styles.successText}>Try-On Complete!</Text>
                </View>

                <Text style={styles.title}>Here's Your Look</Text>
                <Text style={styles.description}>
                    This is an AI-generated preview of how the garment would look on you.
                </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(500)}>
                <ResultViewer imageUrl={resultUrl} />
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.actions}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleTryAnother}
                    activeOpacity={0.8}
                >
                    <Text style={styles.primaryButtonText}>Try Another Outfit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleShare}
                    activeOpacity={0.7}
                >
                    <Text style={styles.secondaryButtonIcon}>📤</Text>
                    <Text style={styles.secondaryButtonText}>Share Result</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(600).duration(400)}>
                <Text style={styles.disclaimer}>
                    ⓘ Results are AI-generated and may not perfectly represent the actual garment. For reference only.
                </Text>
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0F',
    },
    content: {
        padding: 24,
        paddingBottom: 48,
    },
    successBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(34, 197, 94, 0.3)',
        marginBottom: 16,
    },
    successIcon: {
        fontSize: 16,
    },
    successText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#4ADE80',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: '#8B8B9E',
        lineHeight: 22,
        marginBottom: 24,
    },
    actions: {
        gap: 12,
        marginTop: 24,
    },
    primaryButton: {
        backgroundColor: '#7C3AED',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    secondaryButtonIcon: {
        fontSize: 16,
    },
    secondaryButtonText: {
        color: '#C4C4D4',
        fontSize: 16,
        fontWeight: '600',
    },
    disclaimer: {
        fontSize: 12,
        color: '#5A5A6E',
        textAlign: 'center',
        marginTop: 24,
        lineHeight: 18,
    },
});
