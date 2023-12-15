"use client"

import Image from "next/image";
import {useEffect} from "react";
import {useChatStore} from "@/hooks/useChat";
import {useRouter} from "next/navigation";

export default function ChatPage() {

    const {selectedChat} = useChatStore()
    const router = useRouter()

    useEffect(() => {
        if(selectedChat){
            router.push("/chats/"+selectedChat.id)
        }
    }, [selectedChat]);

    return (
        <div className={"w-full flex-1 flex h-full flex-col items-center justify-center bg-[#F7F8FA] font-poppins dark-theme dark:bg-slate-800"}>
            <div className={"flex items-center justify-center flex-col gap-5"}>
                <Image src={"/logo.svg"} alt={"trixify"} width={200} height={200} className={"animate-bounce"}/>
                <h1 className={"text-3xl font-medium text-center animate-pulse"}>Select a chat and start discussing</h1>
            </div>
        </div>
    )
}
