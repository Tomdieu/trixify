import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import * as Contacts from 'expo-contacts';
// import { randomBgColor, twBgColors } from '@/constants/Colors';



type Props = {
    contact:Contacts.Contact
} & TouchableOpacityProps


const Contact = ({contact,...others}: Props) => {
    
    return (
        <TouchableOpacity onPress={() => { }}>
            <View className={`flex-row items-center px-3 py-2 bg-white/60`} style={{ elevation: 0 }}>
                <View className={`flex-row items-center justify-center border border-gray-300 bg-blue-400 rounded-full w-12 h-12`}>
                    <Text className='text-xl font-bold text-white'>{contact.name[0]}</Text>
                </View>
                <View className='flex-1 ml-3'>
                    <Text className='text-gray-600 text-base' style={{fontFamily:"poppins-semibold"}}>{contact.name}</Text>
                    <Text className='text-gray-500 text-sm' style={{fontFamily:"poppins-regular"}}>{(contact.phoneNumbers && contact.phoneNumbers[0]) ? contact.phoneNumbers[0].number : null}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Contact

const styles = StyleSheet.create({})