import { StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MessageSquare } from 'lucide-react-native'

type Props = {

} & TouchableOpacity['props']

const BtnNewChat = (props:Props) => {
  return (
    <TouchableOpacity {...props}>
        <View  className='items-center justify-center' style={{ position: "absolute", bottom: 20, right: 20, backgroundColor: "#2987FF", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
          {/* <Text style={{ color: "#fff", fontSize: 30 }}>+</Text> */}
          <MessageSquare size={25} color='#fff'/>
        </View>
      </TouchableOpacity>
  )
}

export default BtnNewChat

const styles = StyleSheet.create({})