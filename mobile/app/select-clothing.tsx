import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useTryOnStore } from '../store/useTryOnStore';
import { Image } from 'expo-image';
import { CATEGORIES, IMAGE_QUALITY, IMAGE_MAX_WIDTH } from '../constants/config';
import type { Category } from '../constants/config';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SelectClothingScreen() {
    const router = useRouter();
    const { garmentImage, setGarmentImage, category, setCategory, modelImage } = useTryOnStore();

    // Redirect if no model image
    if (!modelImage) {
        router.replace('/select-photo');
        return null;
    }

    const pickGarment = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission Needed', 'Please allow photo library access.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.8,
            allowsEditing: true,
        });

        if (!result.canceled && result.assets[0]) {
            const compressed = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: IMAGE_MAX_WIDTH } }],
                { compress: IMAGE_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
            );
            setGarmentImage(compressed.uri);
        }
    };

    const handleSubmit = () => {
        if (!garmentImage) {
            Alert.alert('Missing Image', 'Please select a clothing item.');
            return;
        }
        router.push('/processing');
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            bounces={false}
        >
            <Animated.View entering={FadeInDown.duration(400)}>
                <View style={styles.stepBadge}>
                    <Text style={styles.stepText}>STEP 2 OF 3</Text>
                </View>

                <Text style={styles.title}>Choose Clothing</Text>
                <Text style={styles.description}>
                    Upload a photo of the clothing item you want to try on.
                    Use a product image with a clean background for best results.
                </Text>
            </Animated.View>

            {/* Category Selector */}
            <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                <Text style={styles.sectionTitle}>Category</Text>
                <View style={styles.categoryRow}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.categoryChip,
                                category === cat.id && styles.categoryChipActive,
                            ]}
                            onPress={() => setCategory(cat.id as Category)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.categoryIcon}>{cat.icon}</Text>
                            <Text
                                style={[
                                    styles.categoryLabel,
                                    category === cat.id && styles.categoryLabelActive,
                                ]}
                            >
                                {cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>

            {/* Garment upload */}
            <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                <Text style={styles.sectionTitle}>Clothing Image</Text>

                {garmentImage ? (
                    <View style={styles.previewContainer}>
                        <Image
                            source={{ uri: garmentImage }}
                            style={styles.preview}
                            contentFit="cover"
                        />
                        <TouchableOpacity style={styles.changeButton} onPress={pickGarment}>
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.uploadArea}
                        onPress={pickGarment}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.uploadIcon}>👕</Text>
                        <Text style={styles.uploadTitle}>Upload Clothing Image</Text>
                        <Text style={styles.uploadSubtitle}>
                            Product photo or flat lay works best
                        </Text>
                    </TouchableOpacity>
                )}
            </Animated.View>

            {/* Submit */}
            {garmentImage && (
                <Animated.View entering={FadeInDown.duration(300)}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.submitEmoji}>✨</Text>
                        <Text style={styles.submitText}>Generate Try-On</Text>
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
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    categoryRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 28,
    },
    categoryChip: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    categoryChipActive: {
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        borderColor: '#A78BFA',
    },
    categoryIcon: {
        fontSize: 18,
    },
    categoryLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8B8B9E',
    },
    categoryLabelActive: {
        color: '#A78BFA',
    },
    uploadArea: {
        backgroundColor: 'rgba(139, 92, 246, 0.08)',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(139, 92, 246, 0.2)',
        borderStyle: 'dashed',
        paddingVertical: 40,
        alignItems: 'center',
        marginBottom: 24,
    },
    uploadIcon: {
        fontSize: 40,
        marginBottom: 12,
    },
    uploadTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#A78BFA',
        marginBottom: 4,
    },
    uploadSubtitle: {
        fontSize: 14,
        color: '#8B8B9E',
    },
    previewContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 24,
    },
    preview: {
        width: '100%',
        height: 300,
        borderRadius: 16,
    },
    changeButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    changeText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    submitButton: {
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
    submitEmoji: {
        fontSize: 20,
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
});
