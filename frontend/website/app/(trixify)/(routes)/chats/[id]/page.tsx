"use client"

import ChatHeader from "@/components/chats/ChatHeader";
import ChatContainer from "@/components/chats/ChatContainer";
import ChatInput from "@/components/chats/ChatInput";
import {useChatStore} from "@/hooks/useChat";
import {useQuery} from "@tanstack/react-query";
import {getChat} from "@/lib/actions/chats";
import {getSession} from "@/lib/getSession";
import {ChatType, ConversationType, GroupType} from "@/types";
import {useEffect, useState} from "react";
import {Session} from "next-auth";
import React from "react";

type ChatPageProps = {
    params:{
        id:string
    }
}

export default function ChatPage({params}:ChatPageProps) {
    const {setSelectedChat,selectedChat} = useChatStore()

    const [isLoading,setIsLoading]  = useState(true)
    const [userDataLoading,setUserDataLoading] = useState(true)
    const [user,setUser] = useState<Session|null>(null)

    useEffect(()=>{
        getChat(params.id).then(chat=>{
            setIsLoading(false)
            setSelectedChat(chat as ConversationType | GroupType)

        })
    },[params.id]);

    useEffect(() => {
        getSession().then(session=>{
            setUserDataLoading(false)
            setUser(session)
        })
    }, []);


    useQuery({
        queryKey: ["chats",params.id],
        queryFn: ()=>{
            return getChat(params.id)
        },
        onSuccess:setSelectedChat,
        onError:(error)=>{
            console.log(error)
        },
    })

    useQuery({
        queryKey:['user'],
        queryFn: async ()=>{
            return getSession()
        },
        onSuccess:(data)=>{
            console.log("User session : ",data)
        }
    })

    return (
        <div className={"w-full flex-1 flex h-full flex-col bg-[#F7F8FA]"}>
            {(isLoading || userDataLoading ) ? (
            <div className={"flex-1 items-center w-full h-full justify-center flex dark-theme gap-3"}>
                <h1 className={"text-3xl font-medium font-poppins text animate-pulse"}>Loading </h1>
                <div className={"bg-stone-900 dark:bg-stone-50 w-3 h-3 rounded-full  animate-bounce delay-100"}></div>
                <div className={"bg-stone-900 dark:bg-stone-50 w-3 h-3 rounded-full  animate-bounce scale-110 delay-200"}></div>
                <div className={"bg-stone-900 dark:bg-stone-50 w-3 h-3 rounded-full  animate-bounce scale-125 delay-300"}></div>

            </div>
            ):(
                <React.Fragment>
                    <ChatHeader/>
                    <ChatContainer userSession={user!} chat={selectedChat as ChatType}/>
                    <ChatInput/>
                </React.Fragment>
            )}

        </div>
    )
}
