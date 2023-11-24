import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginForm from '../../../components/auth/LoginForm'
import { StatusBar } from 'react-native'

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop:StatusBar.currentHeight}} className='bg-blue-50'>
      <LoginForm/>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})