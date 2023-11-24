"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React, {MouseEventHandler, useState} from "react";
import {useSession} from "next-auth/react";
import {Button} from "@nextui-org/react";
import {ChatType, ConversationType, GroupType} from "@/types";
import {Avatar as NxAvatar} from "@nextui-org/react";
import {getRandomItem} from "@/lib/random";
import {colorCombinations} from "@/constants/colors";

type ChatItemProps = {
    chat:ConversationType|GroupType
}

export default function ChatItem({chat}:ChatItemProps) {
    const {bg,text} = getRandomItem(colorCombinations)
    // border-l-[#3399FF]
    return (
        <Button
            className={`flex items-center select-none border-l-2 border-l-transparent px-3 py-2  gap-3 w-full cursor-pointer hover:bg-gradient-to-r  hover:from-[#E2EBFF] hover:to-[#F7FAFF]`}
        >
            <Avatar className={chat.is_group ?"border border-blue-800":""}>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback className={`${bg}`}>{chat.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            {/*<NxAvatar isBordered radius="sm" src={chat.avatar} alt={chat.name} className={"border rounded-sm"} />*/}

            <div className={"flex flex-col flex-1 gap-2 overflow-hidden"}>
                <div className={"flex items-center justify-between"}>
                    <h5 className={"text-base text-[#444546] truncate "}>{chat.name}</h5>
                    <span className={"text-sm text-[#B3B3B3]"}>{chat.latest_message}</span>
                </div>
                <div className={"flex items-center justify-between w-full overflow-x-hidden"}>
                    <h5 className={"text-xs truncate text-gray-400"}>{chat.latest_message ? "" :""}</h5>
                    <div className="hidden w-5 h-5 rounded-full border bg-blue-400 border-blue-400 flex items-center justify-center">
                        <span className="text-xs text-white" aria-labelledby={"un-read-message"}></span>
                    </div>
                </div>
            </div>
        </Button>
    )
}