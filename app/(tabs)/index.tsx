import React from 'react';
import { Image, StyleSheet, Platform, View, TouchableOpacity, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                headerImage={
                    <Image
                        source={require('@/assets/images/partial-react-logo.png')}
                        style={styles.reactLogo}
                    />
                }>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Welcome!</ThemedText>
                    <HelloWave />
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                    <ThemedText>
                        Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
                        Press{' '}
                        <ThemedText type="defaultSemiBold">
                            {Platform.select({
                                ios: 'cmd + d',
                                android: 'cmd + m',
                                web: 'F12',
                            })}
                        </ThemedText>{' '}
                        to open developer tools.
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                    <ThemedText>
                        Tap the Explore tab to learn more about what's included in this starter app.
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
                </ThemedView>
            </ParallaxScrollView>

            {/* Floating Button */}
            <TouchableOpacity
                style={styles.bottomRightButton}
                onPress={() => alert('Button Pressed!')}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reactLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    titleContainer: {
        alignItems: 'center',
        padding: 20,
    },
    stepContainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    bottomRightButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#6200ee',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
