import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTryOnStore } from '../store/useTryOnStore';
import { ImagePickerButton } from '../components/ImagePickerButton';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SelectPhotoScreen() {
    const router = useRouter();
    const { modelImage, setModelImage } = useTryOnStore();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            bounces={false}
        >
            <Animated.View entering={FadeInDown.duration(400)}>
                <View style={styles.stepBadge}>
                    <Text style={styles.stepText}>STEP 1 OF 3</Text>
                </View>

                <Text style={styles.title}>Upload Your Photo</Text>
                <Text style={styles.description}>
                    Take a full-body photo or select one from your gallery.
                    For best results, use a photo with good lighting and a clear background.
                </Text>

                <View style={styles.tipsContainer}>
                    <Text style={styles.tipsTitle}>📋 Tips for best results</Text>
                    <Text style={styles.tip}>• Full body photo (head to toe)</Text>
                    <Text style={styles.tip}>• Stand facing the camera</Text>
                    <Text style={styles.tip}>• Good, even lighting</Text>
                    <Text style={styles.tip}>• Simple, uncluttered background</Text>
                </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                <ImagePickerButton
                    label="Your Photo"
                    sublabel="Full-body photo works best"
                    onImageSelected={setModelImage}
                    selectedImage={modelImage}
                />
            </Animated.View>

            {modelImage && (
                <Animated.View entering={FadeInDown.duration(300)}>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => router.push('/select-clothing')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.nextText}>Next: Choose Clothing</Text>
                        <Text style={styles.nextArrow}>→</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
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
    stepBadge: {
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 16,
    },
    stepText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#A78BFA',
        letterSpacing: 1.5,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#8B8B9E',
        lineHeight: 22,
        marginBottom: 24,
    },
    tipsContainer: {
        backgroundColor: 'rgba(139, 92, 246, 0.08)',
        borderRadius: 14,
        padding: 16,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.15)',
    },
    tipsTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#A78BFA',
        marginBottom: 8,
    },
    tip: {
        fontSize: 14,
        color: '#8B8B9E',
        lineHeight: 22,
    },
    nextButton: {
        backgroundColor: '#7C3AED',
        borderRadius: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 8,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    nextText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
    nextArrow: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});
