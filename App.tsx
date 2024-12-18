import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/places/UI/IconButton';
import { Colors } from './constants/colors';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}