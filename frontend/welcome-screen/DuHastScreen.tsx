import React from 'react'
import { NavigationProp } from '../App'
import Du from './components/Du'

interface DuProps {
  navigation: NavigationProp
}

const DuHastScreen = ({ navigation }: DuProps) => (
  <Du title="Du hast" onPress={() => navigation.navigate('DuHastMichScreen')} />
)

export default DuHastScreen
