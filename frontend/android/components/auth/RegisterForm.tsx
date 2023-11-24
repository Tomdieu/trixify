import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const RegisterForm = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Register</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex:1
  }
}) 

export default RegisterForm