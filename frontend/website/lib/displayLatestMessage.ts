import { ChatMessageType, ChatType, ConversationType, FileMessageType, GroupType, TextMessageType } from "@/types";

export default function displayLatestMessage(chat:ChatType){

    if(chat.is_group){
        const group = chat as GroupType;
        if(group.latest_message){
            const message = group.latest_message as ChatMessageType;
            
            if(message.content.resourcetype=="TextMessage"){
                const textMessage = message.content as TextMessageType;
                return message.sender.username+": "+textMessage.text;
            }
            else if(message.content.resourcetype=="FileMessage"){
                const fileMessage = message.content as FileMessageType;
                return message.sender.username+": send a file";
            }
            else if(message.content.resourcetype=="StoryReplyMessage"){
                const storyReplyMessage = message.content as FileMessageType;
                return message.sender.username+": reply to a story";
            }
        }
    }

    const conversation = chat as ConversationType;
    if(conversation){
        if(conversation.latest_message){
            const message = conversation.latest_message as ChatMessageType;
            
            if(message.content.resourcetype=="TextMessage"){
                const textMessage = message.content as TextMessageType;
                return (conversation.self_chat? "You":message.sender.username)+": "+textMessage.text;
            }
            else if(message.content.resourcetype=="FileMessage"){
                const fileMessage = message.content as FileMessageType;
                return (conversation.self_chat? "You":message.sender.username)+": send a file";
            }
            else if(message.content.resourcetype=="StoryReplyMessage"){
                const storyReplyMessage = message.content as FileMessageType;
                return (conversation.self_chat? "You":message.sender.username)+": reply to a story";
            }
        }
    }

}