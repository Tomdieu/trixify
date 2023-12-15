"use server"

import { getSession } from "@/lib/getSession"
import { ChatType } from "@/types";

export const getChats = async () => {
    const session = await getSession();
    // process.env.NEXT_PUBLIC_BACKEND_URL+
    const response = await fetch("http://localhost:8000/api/chats/chats/",{
        method:"GET",
        headers:{
            "Authorization":`token ${session?.user.token}`,
            "Content-Type":"application/json"
        }
    })
    const data = await response.json()
    if(response.status==200){
        return data as ChatType[];
    }
    else{
        return Promise.reject(data)
    }
}

export const getChat = async (chatId:string) => {
    const session = await getSession();
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/chats/chats/"+chatId)
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/chats/chats/"+chatId,{
        method:"GET",
        headers:{
            "Authorization":`token ${session?.user.token}`,
            "Content-Type":"application/json"
        }
    })
    const data = await response.json()
    if(response.status==200){
        return data as ChatType;
    }
    else{
        return Promise.reject(data)
    }
}