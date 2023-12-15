import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { MoreVertical, Search } from "lucide-react-native"
import ChatStory from './ChatStory'
import { Avatar } from '@react-native-material/core'
import { useAuth } from '@/hooks/userAuth'

type Props = {}

const ChatNavbar: React.FC = (props: Props) => {
    const {user} = useAuth()
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Text className='text-3xl text-blue-600' style={{fontFamily:'poppins-medium'}}>Chat</Text>
                <View className='gap-4 flex-row items-center'>
                    <TouchableOpacity className=''>

                        <Search size={24} color='gray' />
                    </TouchableOpacity>
                    <TouchableOpacity className=''>
                        <MoreVertical size={24} color='gray' />
                    </TouchableOpacity>
                    <TouchableOpacity className='flex items-center justify-center'>
                        {user && (

                <Avatar color='#2987FF' image={{uri:user.avatar}} size={32} labelStyle={{color:"#fff",fontSize:16}} label={"Ivan Tom"} />
                        )}

                    </TouchableOpacity>
                </View>
            </View>
            <ChatStory />
        </View>
    )
}

export default ChatNavbar


const styles = StyleSheet.create({
    root:{
        gap:12,
        paddingBottom:5,
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    container: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
        
    }
})