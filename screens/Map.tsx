import React, { FC, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { Location } from '../types/place';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import IconButton from '../components/UI/IconButton';

const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

type MapScreenProps = NativeStackScreenProps<any>;

const Map: FC<MapScreenProps> = ({ navigation }) => {

    const [markerLocation, setMarkerLocation] = useState<Location>({ lat: initialRegion.latitude, lng: initialRegion.longitude });

    const selectLocationHandler = (event: MapPressEvent) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarkerLocation({ lat: latitude, lng: longitude });
    }

    const saveLocationHandler = () => {
        navigation.navigate("addPlace", { pickedLocation: markerLocation });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton color={tintColor} icon='save' size={24} onPress={saveLocationHandler} />
        });
    }, [navigation])

    return (
        <MapView onPress={selectLocationHandler} style={styles.map} initialRegion={initialRegion}>
            {
                markerLocation && (
                    <Marker title='Picked Location' coordinate={{ latitude: markerLocation.lat, longitude: markerLocation.lng }} draggable />
                )
            }
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default Map;