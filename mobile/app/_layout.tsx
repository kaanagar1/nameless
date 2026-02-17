import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#0A0A0F',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: '700',
                    },
                    headerShadowVisible: false,
                    contentStyle: {
                        backgroundColor: '#0A0A0F',
                    },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="select-photo"
                    options={{ title: 'Your Photo' }}
                />
                <Stack.Screen
                    name="select-clothing"
                    options={{ title: 'Choose Clothing' }}
                />
                <Stack.Screen
                    name="processing"
                    options={{
                        title: 'Processing',
                        headerBackVisible: false,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="result"
                    options={{
                        title: 'Your Try-On',
                        headerBackVisible: false,
                    }}
                />
            </Stack>
        </>
    );
}
