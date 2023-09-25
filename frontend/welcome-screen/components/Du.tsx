import React from 'react'
import { Button, View } from 'react-native'

interface DuProps {
  title: string
  onPress: () => void
}

const Du = (props: DuProps) => (
  <View>
    <Button title={props.title} onPress={props.onPress} />
  </View>
)

export default Du
