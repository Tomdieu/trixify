import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Root = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:"800",fontSize:30}}>Root</Text>
    </View>
  )
}

export default Root

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:5
  }
})