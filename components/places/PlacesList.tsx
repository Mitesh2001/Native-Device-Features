import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Place } from '../../types/place';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';

interface PlacesListProps {
    places: Place[];
}

const PlacesList: FC<PlacesListProps> = ({ places }) => {

    if (places.length === 0) {
        return (
            <View style={styles.fallBackContainer}>
                <Text style={styles.fallBackText}>No places found</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={places}
            renderItem={({ item, index }) => <PlaceItem place={item} onSelect={() => { }} key={index} />}
        />
    );
}

const styles = StyleSheet.create({
    fallBackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fallBackText: {
        fontSize: 16,
        color: Colors.primary200
    },
})

export default PlacesList;