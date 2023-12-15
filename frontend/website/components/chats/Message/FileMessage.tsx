import {FileMessageType} from "@/types";

type FileMessageProps = {
    content:FileMessageType
}

export default function FileMessage({content}:FileMessageProps){
    const {file,text,id} = content
    return (<p>{content.text}</p>)
}