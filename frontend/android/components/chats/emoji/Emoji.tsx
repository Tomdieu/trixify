import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import shortnameToUnicode from '@/constants/shortnameToUnicode'


type Props = {
    item:string,
    onEmojiSelected?:(emoji:string)=>void
}

const Emoji = ({item,onEmojiSelected}: Props) => {
  return (
    <TouchableOpacity style={styles.emojiContainer} onPress={()=>onEmojiSelected(shortnameToUnicode[`:${item}:`])}>
        <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
    </TouchableOpacity>
  )
}

export default Emoji

const styles = StyleSheet.create({
    emojiContainer: {
		marginHorizontal: 9,
	},
	emoji: {
		fontSize: 25
	}
})