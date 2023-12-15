"use server"

import {getSession} from "@/lib/getSession";
import {ChatMessageType, MessageTypeCreate} from "@/types";

type CreateMessageProps = {
    chat:number;
    parent_message?:number;
    content:MessageTypeCreate;
}

export const createMessage = async ({chat,content,parent_message}:CreateMessageProps) => {
    const user = await getSession()
    const sender = user?.user.user.id!;
    const data = {
        chat,
        sender,
        content,
        parent_message
    }

    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/chats/messages/",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Authorization":`token ${user?.user.token}`,
            "Content-Type":"application/json"
        }
    })

    return (await res.json()) as ChatMessageType

}