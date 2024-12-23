import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import OutlineButton from '../UI/OutlineButton'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { Location } from '../../types/place';
import { getMapPreview } from '../../util/location';
import { useNavigation } from '@react-navigation/native';

const LocationPicker = () => {

    const [permissionInfo, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState<Location>();

    const navigation = useNavigation();

    const verifyPermission = async () => {
        if (permissionInfo) {
            const { status } = permissionInfo;
            if (status === PermissionStatus.UNDETERMINED) {
                const permissionResponse = await requestPermission();
                return permissionResponse.granted;
            }
            if (status === PermissionStatus.DENIED) {
                Alert.alert("Permission Denied!", "You need to grant location permission");
                return false;
            }
            return true;
        }
        return false;
    }

    const locateUser = async () => {
        const hadPermission = await verifyPermission();
        if (!hadPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    };

    const pickOnMap = () => {
        (navigation as any).navigate("map");
    };

    let locationPreview = <Text style={{ color: "white" }}>No location picked yet.</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={styles.image}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlineButton icon='location' onPress={locateUser}>Locate User</OutlineButton>
                <OutlineButton icon='map' onPress={pickOnMap}>Pick on Map</OutlineButton>
            </View>
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%',
    }
})