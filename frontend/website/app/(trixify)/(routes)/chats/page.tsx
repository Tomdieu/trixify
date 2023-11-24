"use client"

import ChatHeader from "@/components/chats/ChatHeader";
import ChatContainer from "@/components/chats/ChatContainer";
import ChatInput from "@/components/chats/ChatInput";
import {getChats} from "@/lib/chats";
// import {getSession} from "@/lib/getSession";
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {useChatStore} from "@/hooks/useChat";
import {useEffect, useState} from "react";
import wait from "@/lib/wait";
import {Session} from "next-auth";

export default function ChatPage() {
    const {data:session} = useSession()
    const {setChats} = useChatStore()

    console.log("Si : ",session)

    const [userSession, setUserSession] = useState<Session|null>(null);

    useQuery({
        queryKey: ["chats"],
        queryFn: () => wait(1000).then(()=>{
            return  getChats(userSession?.user.token!)
        }),
        onSuccess:setChats,
        onError:(error)=>{
            console.log(error)
        },
        enabled:userSession?.user.token !== null
    })

    useEffect(() => {
        if(session!==null){
            setUserSession(session)
        }
    }, [session]);


    return (
        <div className={"w-full flex-1 flex h-full flex-col bg-[#F7F8FA]"}>
            <ChatHeader/>
            <ChatContainer/>
            <ChatInput/>
        </div>
    )
}
