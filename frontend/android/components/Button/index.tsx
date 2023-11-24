import { StyleSheet, Text, TouchableOpacity, View, StyleProp, TextProps, TouchableOpacityProps, ViewProps, TextStyle } from 'react-native'
import React from 'react'

interface ButtonTypes {
  title: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  style?: ViewProps["style"];
  textStyle?: TextStyle;
  className?: string;
  disabled?: boolean;
  bgColor?: TextStyle["backgroundColor"];
  color: TextStyle["color"];
}

const Button: React.FC<ButtonTypes> = ({ title, leading, trailing, style, textStyle,disabled=false,color, }) => {
  return (
    <TouchableOpacity style={style} disabled={disabled}>
      <View className={`flex flex-row py-3 bg-black/20 rounded-md space-x-2 items-center justify-center`}>
        {leading && leading}
        <Text style={{ textAlign: "center", ...textStyle, }} className="text-white uppercase">{title}</Text>
        {trailing && trailing}
      </View>
    </TouchableOpacity>
  )
}

export default Button


const styles = StyleSheet.create({
  btnStyles: {
    backgroundColor: "#000",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,
    textAlign: "center"
  }
})