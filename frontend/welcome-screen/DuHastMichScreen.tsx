import React from 'react'
import { NavigationProp } from '../App'
import Du from './components/Du'

interface DuProps {
  navigation: NavigationProp
}

const DuHastMichScreen = ({ navigation }: DuProps) => (
  <Du
    title="backendTestScreen"
    onPress={() => navigation.navigate('backendTestScreen')}
  />
)

export default DuHastMichScreen
