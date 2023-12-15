import { StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react-native'
import { Avatar } from '@react-native-material/core'
import { useRouter } from 'expo-router'
import { useChatStore } from '@/hooks/useChatStore'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useTab } from '@/hooks/tabStore'

type Props = {} &NativeStackHeaderProps

const ChatHeader = ({route,options,navigation,back}: Props) => {
    
    const router = useRouter()
    const {setShow} = useTab()
    const { selectedChat } = useChatStore()
    return (
        <View style={styles.root} className='flex-row space-x-3 px-3 py-1.5 items-center'>
            <TouchableOpacity onPress={() => {setShow(true);router.back()}}>
                <ArrowLeft size={30} color='gray' />
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 flex-row h-full items-center space-x-3 px-2'>
                <View className='flex-1 flex-row h-full items-center space-x-3 px-2'>
                    <Avatar color='#2987FF' image={{ uri: selectedChat.avatar }} size={45} labelStyle={{ color: "#fff", fontSize: 16 }} label={selectedChat.name} />
                    <View className=''>
                        <Text className='text-lg font-bold'>{selectedChat?.name}</Text>
                        <Text className='text-sm text-gray-500'>Online</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View className='flex-row h-full space-x-4 items-center justify-end'>
                <TouchableOpacity>
                    <Video size={26} color='gray' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Phone size={26} color='gray' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MoreVertical size={26} color='gray' />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ChatHeader

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1
        },
        marginTop: StatusBar.currentHeight
    }
})