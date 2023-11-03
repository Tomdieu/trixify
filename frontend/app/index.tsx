import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from "expo-router";

type Props = {}

const Root = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:"800",fontSize:30}}>Welcome To Trixify</Text>
      <Link href={'/login'}>
      <TouchableOpacity>
        <View style={{backgroundColor:"red",borderRadius:9,paddingHorizontal:10,paddingVertical:10}}>

        <Text>Next</Text>
        </View>
      </TouchableOpacity>
      </Link>
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