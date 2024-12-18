import React, { ComponentProps, FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
    icon: ComponentProps<typeof Ionicons>['name'];
    color: ComponentProps<typeof Ionicons>['color'];
    size: ComponentProps<typeof Ionicons>['size'];
    onPress: () => void
}

const IconButton: FC<IconButtonProps> = ({ icon, color, size, onPress }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Ionicons name={icon} color={color} size={size} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    pressed: {
        opacity: 0.75
    }
})

export default IconButton;