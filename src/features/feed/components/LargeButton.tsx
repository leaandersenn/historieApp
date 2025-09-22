import { Pressable, Text, StyleSheet } from "react-native";
import React from 'react';

interface LargeButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor: string;
}

export default function LargeButton({ title, onPress, backgroundColor }: LargeButtonProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: backgroundColor },
                pressed ? styles.buttonPressed : {}
            ]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 263,
        height: 73,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'OpenSans_400Regular',
    },
});