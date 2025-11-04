import { StyleProp, StyleSheet, ViewStyle} from 'react-native'
import React from 'react'
import { Button } from '@ui-kitten/components'
import MyIcon from './MyIcon'

interface Props {
  iconName: string,
  onPress: () => void
  style?: StyleProp<ViewStyle>,
}

const FAB = ({ iconName, onPress, style }: Props) => {
  return (
    <Button 
      style={[style, styles.button]}
      accessoryLeft={<MyIcon name={iconName} white />}
      onPress={onPress}
    />
   
  )
}

export default FAB

const styles = StyleSheet.create({
  button: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 13
  }
})