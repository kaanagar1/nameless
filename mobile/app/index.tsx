import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTryOnStore } from '../store/useTryOnStore';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
    const router = useRouter();
    const reset = useTryOnStore((s) => s.reset);

    const handleStart = () => {
        reset();
        router.push('/select-photo');
    };

    return (
        <View style={styles.container}>
            {/* Background gradient effect */}
            <View style={styles.gradientOrb1} />
            <View style={styles.gradientOrb2} />

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.header}>
                    <Text style={styles.badge}>AI-POWERED</Text>
                    <Text style={styles.title}>Virtual{'\n'}Try-On</Text>
                    <Text style={styles.subtitle}>
                        See how clothes look on you before you buy.{'\n'}
                        Powered by generative AI.
                    </Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.features}>
                    <FeatureItem emoji="📸" text="Take or upload your photo" />
                    <FeatureItem emoji="👕" text="Choose a clothing item" />
                    <FeatureItem emoji="✨" text="Get a realistic try-on result" />
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.ctaContainer}>
                    <TouchableOpacity style={styles.ctaButton} onPress={handleStart} activeOpacity={0.8}>
                        <Text style={styles.ctaText}>Start Try-On</Text>
                        <Text style={styles.ctaArrow}>→</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}

function FeatureItem({ emoji, text }: { emoji: string; text: string }) {
    return (
        <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>{emoji}</Text>
            </View>
            <Text style={styles.featureText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0F',
    },
    gradientOrb1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
    },
    gradientOrb2: {
        position: 'absolute',
        bottom: -50,
        left: -80,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
    content: {
        flex: 1,
        paddingHorizontal: 28,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 48,
    },
    badge: {
        fontSize: 12,
        fontWeight: '800',
        color: '#A78BFA',
        letterSpacing: 3,
        marginBottom: 16,
    },
    title: {
        fontSize: 52,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 58,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#8B8B9E',
        lineHeight: 24,
    },
    features: {
        marginBottom: 48,
        gap: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureEmoji: {
        fontSize: 22,
    },
    featureText: {
        fontSize: 16,
        color: '#C4C4D4',
        fontWeight: '500',
    },
    ctaContainer: {
        alignItems: 'stretch',
    },
    ctaButton: {
        backgroundColor: '#7C3AED',
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    ctaText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
    },
    ctaArrow: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
});
