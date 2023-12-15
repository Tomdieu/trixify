"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {Button} from "@nextui-org/react";
import {ConversationType, GroupType} from "@/types";
import {getRandomItem} from "@/lib/random";
import {colorCombinations} from "@/constants/colors";
import {useRouter} from "next/navigation";
import displayLatestMessage from "@/lib/displayLatestMessage";
import {useChatStore} from "@/hooks/useChat";
import {useSession} from "next-auth/react";

type ChatItemProps = {
    chat:ConversationType|GroupType
}

export default function ChatItem({chat}:ChatItemProps) {
    const {data:session} = useSession()
    const {bg,text} = getRandomItem(colorCombinations)
    const router = useRouter()
    const {selectedChat} = useChatStore()

    const selected = selectedChat?.id == chat.id;

    // border-l-[#3399FF]
    return (
        <Button
            disableRipple={true}
            onPress={()=>{router.push("/chats/"+chat.id)}}
            className={`group/chat ${selected ? "bg-blue-600 dark:bg-slate-800":"hover:bg-gradient-to-r hover:from-[#3584e4] hover:to-[#99c1f1] dark:hover:bg-gradient-to-r dark:hover:from-[#1E293B] dark:hover:to-[#1E293B]"} rounded-sm flex items-center select-none border-l-2 border-l-transparent px-3 py-2  gap-3 w-full cursor-pointer`}
        >
            <Avatar className={chat.is_group ?"border border-blue-800":""}>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback className={`${bg}`}>{chat.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className={"flex flex-col flex-1 gap-2 overflow-hidden"}>
                <div className={"flex items-start flex-col flex-1"}>
                    <h5 className={`${selected ? "text-slate-50":"text-[#444546] group-hover/chat:text-stone-50"} text-base dark:text-slate-50 truncate`}>{chat.name == session?.user.user.username ? session?.user.user.username +" (You)":chat.name}</h5>
                    <span className={`${selected ? "text-slate-100":"text-[#B3B3B3]"} dark:text-slate-100 text-xs `}>{chat.latest_message ? displayLatestMessage(chat):""}</span>
                </div>
                <div className={"flex items-center justify-between w-full overflow-x-hidden"}>
                    <h5 className={"text-xs truncate text-gray-400"}>{chat.latest_message ? "" :""}</h5>
                    <div className="hidden w-5 h-5 rounded-full border bg-blue-400 border-blue-400 items-center justify-center">
                        <span className="text-xs text-white" aria-labelledby={"un-read-message"}></span>
                    </div>
                </div>
            </div>
        </Button>
    )
}