import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Props {
    message: string;
    onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: Props) {
    return (
        <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>⚠️</Text>
            </View>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.7}>
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        padding: 24,
        alignItems: 'center',
        marginVertical: 16,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        fontSize: 28,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F87171',
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: '#FCA5A5',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.4)',
    },
    retryText: {
        color: '#F87171',
        fontWeight: '700',
        fontSize: 16,
    },
});
