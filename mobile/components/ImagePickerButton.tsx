import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Image } from 'expo-image';
import { IMAGE_QUALITY, IMAGE_MAX_WIDTH } from '../constants/config';

interface Props {
    onImageSelected: (uri: string) => void;
    selectedImage: string | null;
    label: string;
    sublabel?: string;
}

export function ImagePickerButton({ onImageSelected, selectedImage, label, sublabel }: Props) {
    const pickFromGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission Needed', 'Please allow photo library access to select images.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.8,
            allowsEditing: true,
            aspect: [3, 4],
        });

        if (!result.canceled && result.assets[0]) {
            const compressed = await compressImage(result.assets[0].uri);
            onImageSelected(compressed);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission Needed', 'Please allow camera access to take photos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.8,
            allowsEditing: true,
            aspect: [3, 4],
        });

        if (!result.canceled && result.assets[0]) {
            const compressed = await compressImage(result.assets[0].uri);
            onImageSelected(compressed);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {sublabel && <Text style={styles.sublabel}>{sublabel}</Text>}

            {selectedImage ? (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: selectedImage }} style={styles.preview} contentFit="cover" />
                    <TouchableOpacity style={styles.changeButton} onPress={pickFromGallery}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={takePhoto} activeOpacity={0.7}>
                        <Text style={styles.buttonIcon}>📷</Text>
                        <Text style={styles.buttonText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={pickFromGallery} activeOpacity={0.7}>
                        <Text style={styles.buttonIcon}>🖼️</Text>
                        <Text style={styles.buttonText}>Gallery</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

async function compressImage(uri: string): Promise<string> {
    const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: IMAGE_MAX_WIDTH } }],
        { compress: IMAGE_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    sublabel: {
        fontSize: 14,
        color: '#8B8B9E',
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.3)',
        paddingVertical: 28,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonIcon: {
        fontSize: 32,
    },
    buttonText: {
        color: '#A78BFA',
        fontSize: 16,
        fontWeight: '600',
    },
    previewContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    preview: {
        width: '100%',
        height: 280,
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
});
