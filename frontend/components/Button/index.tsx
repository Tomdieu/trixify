import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface ButtonTypes {
    children:React.ReactNode
}

const Button:React.FC<ButtonTypes> = ({children}) => {
  return (
    <TouchableOpacity style={styles.btnStyles}>
        <View >
      {children}
    </View>
    </TouchableOpacity>
  )
}

export default Button


const styles = StyleSheet.create({
    btnStyles:{
        backgroundColor:"#000",
        color:"#fff",
        paddingVertical:12,
        paddingHorizontal:5,
        borderRadius:8,
        textAlign:"center"
    }
})