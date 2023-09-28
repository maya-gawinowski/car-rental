import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import DuScreen from './welcome-screen/DuScreen'
import DuHastScreen from './welcome-screen/DuHastScreen'
import DuHastMichScreen from './welcome-screen/DuHastMichScreen'
import backendTestScreen from './welcome-screen/backendTestScreen'

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
        <Stack.Screen name="DuScreen" component={DuScreen} />
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
