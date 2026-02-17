import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

interface Props {
    imageUri: string;
    label: string;
    isSelected?: boolean;
    onPress: () => void;
}

export function ClothingCard({ imageUri, label, isSelected, onPress }: Props) {
    return (
        <TouchableOpacity
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
            <View style={styles.labelContainer}>
                <Text style={[styles.label, isSelected && styles.labelSelected]} numberOfLines={1}>
                    {label}
                </Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '47%',
        backgroundColor: '#1A1A2E',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.06)',
        marginBottom: 12,
    },
    cardSelected: {
        borderColor: '#A78BFA',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
    },
    image: {
        width: '100%',
        height: 160,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
    },
    label: {
        color: '#C4C4D4',
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    },
    labelSelected: {
        color: '#A78BFA',
        fontWeight: '700',
    },
    checkmark: {
        color: '#A78BFA',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 4,
    },
});
