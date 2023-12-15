import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextMessageType } from '@/types'

type Props = {
    message:TextMessageType
}

const TextMessage = ({message}: Props) => {
  return (
    <View>
        <Text>{message.text}</Text>
    </View>
  )
}

export default TextMessage

const styles = StyleSheet.create({})