"use client"

import ChatSearch from "./ChatSearch";
import ChatLists from "./ChatLists";
import NewChatBtn from "@/components/chats/NewChatBtn";
import {useChatStore} from "@/hooks/useChat";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getChats} from "@/lib/actions/chats";
import {useRouter} from "next/navigation";
import {ConversationType, GroupType} from "@/types";

export default function ChatSideBar() {
    const {chats, searchChats, setSearchChats,selectedChat} = useChatStore()
    const [isLoading,setIsLoading] = useState(true)
    const {setChats} = useChatStore()
    // const router = useRouter()
    useEffect(() => {
        getChats().then(chats=>{
            setIsLoading(false)
            setSearchChats(chats as  ConversationType[] | GroupType[])
        })
    }, []);

    // useEffect(() => {
    //     if(selectedChat){
    //         router.push("/chats/"+selectedChat.id)
    //     }
    // }, [selectedChat]);


    const {isLoading:chatsLoading} = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            return getChats()
        },
        onSuccess: setChats,
        onError: (error) => {
            console.log(error)
        },

    })

    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (searchValue === '') {
            setSearchChats(chats)
        }
        // @ts-ignore
        setSearchChats(chats.filter((chat: any) => chat.name.toLowerCase().includes(searchValue.toLowerCase())))


    }, [chats, searchValue, setSearchChats])


    return (
        <div className={"h-full relative flex flex-col dark:border-l-0"}>
            <div className={"flex flex-col w-full"}>
                <ChatSearch onSearch={setSearchValue}/>
            </div>
            <div className={"absolute bottom-3 right-3 z-50"}>
                <NewChatBtn/>
            </div>
            {isLoading ? (
                <div className={"flex-1 items-center justify-center flex"}>
                    <h1 className={"text-center"}>Loading chats...</h1>
                </div>
            ) : (
                <ChatLists chats={searchChats}/>
            )}

        </div>
    )
}