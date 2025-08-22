import React from "react";
import {View, Text, Pressable, StyleSheet} from "react-native";
import {Colors} from "../constants/palette";

interface PrimaryButtonProps {
    label: React.ReactNode,
    onPress(): void,
}
export const PrimaryButton = ({label, onPress}:PrimaryButtonProps) => {

    return(
        <View style={styles.outerContainer}>
            <Pressable
                onPress={onPress}
                android_ripple={{color: Colors.primary700}}
                style={(pressedData) => (
                    pressedData.pressed
                        ? [styles.innerContainer, styles.pressed]
                        : styles.innerContainer
                )}
            >
                <Text style={styles.buttonText}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    innerContainer: {
        backgroundColor: Colors.primary600,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: "center"
    },

    pressed: {
        opacity: 0.75
    }
})