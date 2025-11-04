import { StyleProp, StyleSheet, ViewStyle} from 'react-native'
import React from 'react'
import { Icon, useTheme } from '@ui-kitten/components'


interface Props{
    iconStyles?: StyleProp<ViewStyle>
    color?: string,
    name: string,
    white?: boolean
}

const MyIcon = ({color = "#8F9BB3", name = 'start', white = false}: Props) => {
    const theme = useTheme();

    if(white){
        color = theme['color-info-100'];
    }else if(!color){
        color = theme['text-casic-color']
    } else{
        color= theme[color] ?? theme['text-basic-color']

    }
    
    return (
    <Icon 
        style = {styles.icon}
        fill = {color}
        name={name}
    />


  )
}

export default MyIcon

const styles = StyleSheet.create({
    icon: {
        width: 29,
        height: 29
    }
})