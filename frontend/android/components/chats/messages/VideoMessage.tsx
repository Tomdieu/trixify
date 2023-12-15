import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FileMessageType } from '@/types'

type Props = {
    message:FileMessageType
}

const VideoMessage = (props: Props) => {
  return (
    <View>
      <Text>VideoMessage</Text>
    </View>
  )
}

export default VideoMessage

const styles = StyleSheet.create({})