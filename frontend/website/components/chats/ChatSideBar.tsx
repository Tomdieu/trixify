"use client"

import ChatSearch from "./ChatSearch";
import ChatLists from "./ChatLists";
import NewChatBtn from "@/components/chats/NewChatBtn";
import {useSession} from "next-auth/react";
import {useChatStore} from "@/hooks/useChat";
import {useEffect} from "react";
import {getChats} from "@/lib/chats";

export default function ChatSideBar(){
    const {data: session} = useSession()
    const {setChats, chats} = useChatStore()

    console.log("Chats ",chats)

    // useEffect(() => {
    //     if (session) {
    //         getChats(session?.user.token!).then(chats => {
    //             setChats(chats)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     }
    // }, [session]);
    return (
        <div className={"h-full relative flex flex-col"}>
            <div className={"flex flex-col w-full"}>
                <ChatSearch/>
            </div>
            <ChatLists chats={chats}/>
            <div className={"absolute bottom-3 right-3 z-50"}>
                <NewChatBtn/>
            </div>
        </div>
    )
}