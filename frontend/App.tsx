import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {StackNavigationProp} from '@react-navigation/stack'
import {StyleSheet} from 'react-native'
import DuHastMichScreen from './welcome-screen/DuHastMichScreen'
import CarDisplayScreen from './car-display/CarDisplayScreen'
import DuHastScreen from './welcome-screen/DuHastScreen'
import WelcomeScreen from './welcome-screen/WelcomeScreen'
import CarPageScreen from "./car-page/CarPageScreen";
import {RootStackParamList} from "./RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>()

export type NavigationProp = StackNavigationProp<RootStackParamList>

// when adding new screen update file RootStackParamList with its props
// otherwise strange error occurs

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="DuHastScreen" component={DuHastScreen} />
        <Stack.Screen name="DuHastMichScreen" component={DuHastMichScreen} />
        <Stack.Screen name="CarDisplayScreen" component={CarDisplayScreen}
        options={{
          headerShown: false,
        }}
         />
        <Stack.Screen name="CarPageScreen" component={CarPageScreen}
        options={{
          headerShown: true,
          title: "Car details"
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
