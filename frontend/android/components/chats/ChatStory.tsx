import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar } from "@react-native-material/core";
import { useAuth } from '@/hooks/userAuth';
import StoryPreview from '../story/StoryPreview';

type Props = {}

const ChatStory = (props: Props) => {
    const {user} = useAuth()
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='gap-2 px-4 space-x-5' contentContainerStyle={{ alignItems: "center" }}>
            
            <StoryPreview user={user} isMine />
            <StoryPreview user={user}  />
            <StoryPreview user={user}  />
            <StoryPreview user={user}  />
            <StoryPreview user={user}  />
            <StoryPreview user={user}  />
            <StoryPreview user={user}  />
            <StoryPreview user={user}  />
            <StoryPreview user={user} isMine />
            <StoryPreview user={user} isMine />
            <StoryPreview user={user} isMine />
            <StoryPreview user={user} isMine />
            <StoryPreview user={user} isMine />


            {/* <TouchableOpacity>
            <View>
                <View className='relative'>
                    <View className='absolute animate-pin bottom-0 right-1 bg-yellow-400 z-50 w-5 h-5 rounded-full flex items-center justify-center'>
                        <Text className='text-sm'>+</Text>
                    </View>
                <Avatar image={{uri:user.avatar}} color='#2987FF' labelStyle={{color:"#fff",fontSize:20}} label={"Ivan Tom"} />
                </View>
                <Text className='text-xs text-gray-500'>Your Story</Text>
            </View>
            </TouchableOpacity> */}
            
        </ScrollView>
    )
}

export default ChatStory

const styles = StyleSheet.create({})