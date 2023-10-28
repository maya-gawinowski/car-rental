import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {StackNavigationProp} from '@react-navigation/stack'
import {StyleSheet} from 'react-native'
import DuHastMichScreen from './welcome-screen/DuHastMichScreen'
import CarDisplayScreen from './car-display/CarDisplayScreen'
import DuHastScreen from './welcome-screen/DuHastScreen'
import WelcomeScreen from './welcome-screen/WelcomeScreen'
import CarPageScreen from "./car-page/CarPageScreen";
import MyReservationScreen from "./myreservation-screen/MyReservationScreen"
import {RootStackParamList} from "./RootStackParamList";
import LogInScreen from "./login-page/LoginPageScreen";
import SignInScreen from "./Signin-page/SignInScreen";
import Confirmation from "./Confirmation-page/confirmation";

const Stack = createNativeStackNavigator<RootStackParamList>()

export type NavigationProp = StackNavigationProp<RootStackParamList>

// when adding new screen update file RootStackParamList with its props
// otherwise strange error occurs

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Confirmation" component={Confirmation}/>
      <Stack.Screen name="SignInScreen" component={SignInScreen}/>

      <Stack.Screen name="LogInScreen" component={LogInScreen}/>
      <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="MyReservationScreen" component={MyReservationScreen}
        options={{
          title: "My account",
          headerStyle: {
            backgroundColor: '#22668D',
          },
          headerTitleStyle: {
            color: 'white', // This sets the header text color
        },
        headerTintColor: 'white',
        }}/>
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
