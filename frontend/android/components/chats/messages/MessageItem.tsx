import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { ChatMessageType } from '@/types'
import TextMessage from './TextMessage'

type Props = {
  message: ChatMessageType,
  isMine?: boolean,
}

const MessageItem = ({ isMine, message }: Props) => {
  console.log("Content : ")
  console.log(message.content)
  const date = new Date(message.created_at)
  const hrs = date.getHours()
  const min = date.getMinutes()
  return (
    <Pressable onLongPress={()=>{console.log("Long Press")}}>
    <View className={`w-full ${isMine ? "items-end" : "items-start"}`}>
      {/* <Avatar size={30}/> */}
      <View className={`flex-row items-end space-x-2 bg-white p-2 max-w-[60%] ${isMine ? "rounded-l-lg rounded-b-lg" : "rounded-r rounded-b"}`}>
        <View className='space-x-1 items-center justify-between flex-row'>
          {!isMine && (
            <>
            {/* <Text className='text-xs text-gray-500'>~ {message.sender.phone_number}</Text> */}
          <Text className='text-sm text-gray-500'>{message.sender.username}</Text>
            </>
          )}
          

        </View>
        {message.content.resourcetype === "TextMessage" && (
          <TextMessage message={message.content} />
        )}
        {/* {message.content.resourcetype === "FileMessage" && (
        
      )} */}
      <View className='items-end'>

        <Text className='text-xs text-gray-400' style={{textAlign:"right"}}>{hrs+":"+min}</Text>
      </View>
      </View>
    </View>
    </Pressable>
  )
}

export default MessageItem

const styles = StyleSheet.create({})