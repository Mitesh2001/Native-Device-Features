import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import { Colors } from './constants/colors';
import IconButton from './components/UI/IconButton';
import { Fragment } from 'react';
import Map from './screens/Map';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Fragment>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: {
            backgroundColor: Colors.gray700
          }
        }}
        >
          <Stack.Screen
            name='allPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Favorite Places",
              headerRight: ({ tintColor }) => <IconButton color={tintColor} size={24} icon='add' onPress={() => navigation.navigate("addPlace")} />
            })}
          />
          <Stack.Screen
            name='addPlace'
            component={AddPlace}
            options={{
              title: "Add new place"
            }}
          />
          <Stack.Screen
            name='map'
            component={Map}
            options={{
              title: "Map"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}