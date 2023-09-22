import React from 'react'
import { NavigationProp } from '../App'
import Du from './components/Du'

interface DuProps {
  navigation: NavigationProp
}

const DuHastMichScreen = ({ navigation }: DuProps) => (
  <Du
    title="Du hast mich"
    onPress={() => navigation.navigate('DuHastMichScreen')}
  />
)

export default DuHastMichScreen
