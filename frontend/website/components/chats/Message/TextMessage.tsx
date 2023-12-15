import {MessageType, TextMessageType} from "@/types";

type TextMessageProps = {
    content:TextMessageType
}

export default function TextMessage({content}:TextMessageProps){
    return (<p>{content.text}</p>)
}