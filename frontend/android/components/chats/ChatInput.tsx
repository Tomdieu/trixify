import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera, Laugh, Mic, Paperclip, SendHorizontal } from 'lucide-react-native'
// import { TextInput } from '@react-native-material/core'
import EmojiSelector from 'react-native-emoji-selector';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import EmojiPicker from './emoji/EmojiPicker';
import { Keyboard } from 'lucide-react-native';

type Props = {
    reply?:any;
    closeReply?:()=>void;
}

const ChatInput = ({reply=null,closeReply}: Props) => {

    const [text,setText] = useState("")

    const inputRef = React.useRef<TextInput>(null)

    const [numberOfLines,setNumberOfLines] = useState(1)

    const [emojiOpen,setEmojiOpen] = useState(false)

    const height = useSharedValue(70)

    useEffect(()=>{
        if(emojiOpen){
            height.value = withTiming(400)
        }else{
            height.value = withTiming(70)
            inputRef.current?.focus()
        }
    },[emojiOpen])

    useEffect(() => {
		if (reply) {
			height.value = emojiOpen ? withTiming(450) : withTiming(130);
		} else {
			height.value = emojiOpen ? withSpring(400) : withSpring(70);
		}
	}, [reply]);

    const heightAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: height.value
		}
	})

    useEffect(() => {
        // split text into array of words and check if the number of lines is greater than 3
        const lines = text.split('\n')
        if(lines.length > 1){
            setNumberOfLines(5)
        }else{
            setNumberOfLines(lines.length)
        }

    }, [text])

    return (
        <Animated.View  style={[styles.container,heightAnimatedStyle]}>
            <View className='flex-row items-end w-full space-x-2 py-2 px-2 relative'>
                {/* {emojiOpen && (
            <Animated.View  className={"absolute left-10 right-10 bottom-9"} >
            <EmojiSelector onEmojiSelected={emoji => console.log(emoji)} />
            </Animated.View>
            )} */}
            <View className='border flex-1 flex-row px-3 py-2 items-end space-x-2 rounded-2xl
             border-gray-300 bg-white' style={{ elevation: 5 }}>
                <TouchableOpacity onPress={()=>setEmojiOpen(!emojiOpen)}>
                    {emojiOpen ? <Keyboard size={24} color='gray' /> : <Laugh size={24} color='gray' />}
                    
                </TouchableOpacity>
                <TextInput ref={inputRef}  placeholder='Message' value={text} onChangeText={setText} multiline  numberOfLines={numberOfLines}  className='flex-1 text-base w-full'/>

                <TouchableOpacity>
                    <Paperclip size={24} color='gray' className='-rotate-90' />
                </TouchableOpacity>
                {text.length == 0 && (
                    <TouchableOpacity>
                    <Camera size={24} color='gray' />
                </TouchableOpacity>
                )}
                
                
                
            </View>
            <TouchableOpacity className='cursor-pointer rounded-full items-center justify-center p-2  bg-blue-500 '>
                {text.replace(" ","").replace("\n","").length !== 0 ? <SendHorizontal size={24} color='white' /> : <Mic size={24} color='white' />}
            </TouchableOpacity>
            </View>
            {emojiOpen && (<EmojiPicker onEmojiSelected={(emoji)=>setText((previousText)=>previousText+emoji)}/>)}
        </Animated.View>
    )
}

export default ChatInput

const styles = StyleSheet.create({
    container:{
        justifyContent:"center"
    }
})