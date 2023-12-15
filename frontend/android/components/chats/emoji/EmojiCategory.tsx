import { FlatList } from 'react-native'
import React, { memo } from 'react'
import { emojisByCategory } from '@/constants/emoji'
import Emoji from './Emoji'

type Props = {
    category:string,
    onEmojiSelected?:(emoji:string)=>void
    
}

const EmojiCategory = ({category,onEmojiSelected}: Props) => {
  return (
    <FlatList 
        data={emojisByCategory[category]}
        renderItem={({item})=> <Emoji onEmojiSelected={onEmojiSelected} item={item}/>}
        keyExtractor={(item)=>item}
        numColumns={8}
    />
  )
}

export default memo(EmojiCategory)
