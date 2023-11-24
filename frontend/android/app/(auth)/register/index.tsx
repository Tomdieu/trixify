import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Register = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1,marginTop:StatusBar.currentHeight }}>
      <View className='flex-1 bg-blue-50 justify-center'>
      <Text className='font-bold text-xl'>Register</Text>
      </View>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({})