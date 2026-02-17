import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface Props {
    message?: string;
    submessage?: string;
}

export function LoadingOverlay({
    message = 'Processing...',
    submessage = 'This may take up to 30 seconds',
}: Props) {
    return (
        <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={styles.overlay}
        >
            <View style={styles.card}>
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="#A78BFA" />
                </View>
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.submessage}>{submessage}</Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(10, 10, 15, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    card: {
        backgroundColor: '#1A1A2E',
        borderRadius: 24,
        padding: 40,
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.2)',
    },
    spinnerContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    message: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    submessage: {
        fontSize: 14,
        color: '#8B8B9E',
        textAlign: 'center',
    },
});
