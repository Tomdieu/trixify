import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar } from '@react-native-material/core'
import { UserType } from '@/types'

type Props = {
    user: UserType,
    isMine?: boolean
}

const StoryPreview = ({ user, isMine=false }: Props) => {
    return (
        <TouchableOpacity>
            <View className='mx-1'>
                <View className='relative'>
                    {isMine && (
                        <View className='absolute animate-pin bottom-0 right-1 bg-yellow-400 z-50 w-5 h-5 rounded-full flex items-center justify-center'>
                        <Text className='text-sm'>+</Text>
                    </View>
                    )}
                    <Avatar image={{ uri: user.avatar }} color='#2987FF' labelStyle={{ color: "#fff", fontSize: 20 }} label={user.username} />
                </View>
                <Text style={{fontFamily:'poppins-medium'}} className='text-xs text-gray-500'>{isMine ? "Your Story":user.username}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default StoryPreview

const styles = StyleSheet.create({})