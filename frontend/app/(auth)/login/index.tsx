import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginForm from '../../../components/auth/loginForm'

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <LoginForm/>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})