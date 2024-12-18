import React, { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Place } from '../../types/place';

interface PlaceItem {
    place: Place;
    onSelect: () => void
}

const PlaceItem: FC<PlaceItem> = ({ place }) => {
    return (
        <Pressable>
            <View>
                <Image source={{ uri: place.imageUrl }} />
                <View>
                    <Text>{place.title}</Text>
                    <Text>{place.address}</Text>
                </View>
            </View >
        </Pressable>
    );
}

const styles = StyleSheet.create({})

export default PlaceItem;
