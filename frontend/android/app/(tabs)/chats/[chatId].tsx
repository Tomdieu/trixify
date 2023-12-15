import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ChatHeader from '@/components/chats/ChatHeader'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useChatStore } from '@/hooks/useChatStore'
import { useAuth } from '@/hooks/userAuth'
import { getChat } from '@/utils/lib/chats'
import { ChatMessageType, ConversationType, GroupType } from '@/types'
import MessageItem from '@/components/chats/messages/MessageItem'
import ChatInput from '@/components/chats/ChatInput'
import { useTab } from '@/hooks/tabStore'

type Props = {}


const ChatScreen = (props: Props) => {
    const {setShow} = useTab()
    const { chatId } = useLocalSearchParams()
    const { setSelectedChat, selectedChat } = useChatStore()
    const { token, user } = useAuth()
    useQuery({
        queryKey: ["chat", chatId],
        queryFn: () => {
            const _chatId = chatId as string
            return getChat(_chatId, token);
        },
        onSuccess: (data) => {
            console.log(data)
            setSelectedChat(data)
        }
    })

    useEffect(()=>{
        setShow(false)
    },[])

    // Function to format timestamp into a more human-readable format
    const formatTimestamp = (timestamp: string) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (messageDate.toDateString() === today.toDateString()) {
            return "Today";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else if (messageDate >= yesterday && messageDate.getDay() >= today.getDay() - 6) {
            return messageDate.toLocaleDateString(undefined, { weekday: "long" });
        } else {
            return messageDate.toLocaleDateString();
        }
    };

    // Group messages by formatted day
    const groupedMessages = selectedChat.messages.reduce((acc, message) => {
        const day = formatTimestamp(message.created_at);
        acc[day] = acc[day] || [];
        acc[day].push(message);
        return acc;
    }, {});


    return (
        <SafeAreaView style={{ flex: 1 }} className=''>
            <StatusBar barStyle='dark-content' backgroundColor={"white"} />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8, gap: 8 }}>
                {Object.entries(groupedMessages).map(([day, messagesInDay]) => (
                    <View key={day} className='mb-4'>
                        <View className={"flex items-center gap-4"}>
                            <Text className="text-center mb-2 py-0.5 text-xs bg-blue-100 text-gray-800 border border-gray-300 rounded-md px-3">{day}</Text>
                            

                        </View>
                        {messagesInDay?.map((message:ChatMessageType) => (
                    <MessageItem key={message.id} isMine={user.id === message.sender.id} message={message} />
                ))}
                    </View>
                ))}


            </ScrollView>
            <ChatInput/>
        </SafeAreaView>
    )
}

{/* {selectedChat.messages.map((message) => (
                    <MessageItem key={message.id} isMine={user.id === message.sender.id} message={message} />
                ))} */}

export default ChatScreen

const styles = StyleSheet.create({})