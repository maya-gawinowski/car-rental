import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import DuHastMichScreen from './welcome-screen/DuHastMichScreen'
import backendTestScreen from './welcome-screen/backendTestScreen'
import DuHastScreen from './welcome-screen/DuHastScreen'
import WelcomeScreen from './welcome-screen/WelcomeScreen'

const Stack = createNativeStackNavigator()

type RootStackParamList = {
  DuScreen: undefined
  DuHastScreen: undefined
  DuHastMichScreen: undefined
  backendTestScreen: undefined
}

export type NavigationProp = StackNavigationProp<RootStackParamList>

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Find your car"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="DuHastScreen" component={DuHastScreen} />
        <Stack.Screen name="DuHastMichScreen" component={DuHastMichScreen} />
        <Stack.Screen name="backendTestScreen" component={backendTestScreen} />
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
