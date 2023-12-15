import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FileMessageType } from '@/types'

type Props = {
    message:FileMessageType
}

const ImageMessage = ({message}: Props) => {
  return (
    <View style={styles.container}>
        <Image source={{uri:message.file}} style={{width:200,height:200}}/>
        <Text>{message.text}</Text>
    </View>
  )
}

export default ImageMessage

const styles = StyleSheet.create({
    container:{
      flex:1
    }
})