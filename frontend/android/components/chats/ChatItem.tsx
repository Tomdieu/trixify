import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import React from 'react'
import { Avatar } from "@react-native-material/core";
import { ConversationType, GroupType } from '@/types';

type ChatItemProps = {
    chat:ConversationType|GroupType,
    onPress?:()=>void;
} & ViewProps

const ChatItem = ({chat,onPress,...others}:ChatItemProps) => {
    // chat = chat.is_group ? chat as GroupType : chat as ConversationType
    return (
        <TouchableOpacity onPress={onPress}>
            <View {...others} className='flex gap-4 flex-row py-2 px-2 pl-4'>
                {/* <View className='h-8 w-8 rounded-full border'>
       
      </View> */}
                <Avatar label={chat.name} image={{uri:chat.avatar}}/>
                <View style={{flex:1,gap:3}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text className='text-base font-medium' style={{fontFamily:'poppins-medium'}}>
                            {chat.name}
                        </Text>
                        <Text className='text-gray-500 text-sm'>12:00</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text className='text-gray-500 text-sm' style={{fontFamily:'poppins-light'}}>Message</Text>
                    <Text className='text-white text-xs bg-red-400 rounded-xl py-0.5 px-0.5'>12</Text>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem

const styles = StyleSheet.create({})