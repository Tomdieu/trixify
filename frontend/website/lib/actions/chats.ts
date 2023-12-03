"use server"

import { getSession } from "@/lib/getSession"
import { ConversationType,GroupType,ChatType } from "@/types";

export const getChats = async () => {
    const session = await getSession();

    if(session){
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/chats/chats/",{
            method:"GET",
            headers:{
                "Authorization":`token ${session.user.token}`,
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        if(response.status==200){
            return data as ChatType[]; //ConversationType[]|GroupType[];
        }
        else{
            return Promise.reject(data)
        }
    }

    return []
}