import React from 'react'
import { NavigationProp } from '../App'
import Du from './components/Du'

interface DuProps {
  navigation: NavigationProp
}

const DuScreen = ({ navigation }: DuProps) => (
  <Du title="Du" onPress={() => navigation.navigate('DuHastScreen')} />
)

export default DuScreen
