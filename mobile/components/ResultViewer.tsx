import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    imageUrl: string;
}

export function ResultViewer({ imageUrl }: Props) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                contentFit="contain"
                transition={500}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 3 / 4,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#1A1A2E',
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.2)',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
