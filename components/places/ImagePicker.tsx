import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ImagePickerAsset, launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlineButton from './UI/OutlineButton';

const ImagePicker = () => {

    const [permissionInfo, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState<ImagePickerAsset | null>();

    const verifyPermission = async () => {
        if (permissionInfo) {
            const { status } = permissionInfo;
            if (status === PermissionStatus.UNDETERMINED) {
                const permissionResponse = await requestPermission();
                return permissionResponse.granted;
            }
            if (status === PermissionStatus.DENIED) {
                Alert.alert("Permission Denied!", "You need to grant camera permission");
                return false;
            }
            return true;
        }
        return false;
    }

    const pickImage = async () => {

        const hadPermission = await verifyPermission();

        if (!hadPermission) {
            return;
        }

        const result = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    }

    return (
        <View>
            <Pressable style={styles.preview}>
                {
                    image ? (<Image style={styles.preview} source={{ uri: image.uri }} />) : <Text>No Image Taken Yet.</Text>
                }
            </Pressable>
            <OutlineButton icon='camera' onPress={pickImage} >Take Image</OutlineButton>
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    preview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        height: "100%",
        width: "100%"
    }
})