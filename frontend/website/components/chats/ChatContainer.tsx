"use client"

import MessageItem from "@/components/chats/Message/MessageItem";
import {useChatStore} from "@/hooks/useChat";
import {useEffect, useMemo, useState} from "react";
import {ChatMessageType, ChatType, ConversationType, GroupType, UserType} from "@/types";
import {Session} from "next-auth";
import {useQuery} from "@tanstack/react-query";
import {getSession} from "@/lib/getSession";
import {Divider} from "@nextui-org/react";

type ChatContainerProps = {
    chat:ChatType,
    userSession:Session
}

type _TransformType = {
    isMine:boolean,
    timestamp:string
} & ChatMessageType

type _GroupMessageType = Record<string,_TransformType[]>

export default function ChatContainer({chat,userSession}:ChatContainerProps){

    const {selectedChat} = useChatStore()

    // Function to format timestamp into a more human-readable format
    const formatTimestamp = (timestamp:string) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (messageDate.toDateString() === today.toDateString()) {
            return "Today";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else if (messageDate >= yesterday && messageDate.getDay() >= today.getDay() - 6) {
            return messageDate.toLocaleDateString(undefined, { weekday: "long" });
        } else {
            return messageDate.toLocaleDateString();
        }
    };

    const _transformMessages = (chat:ChatType)=>{
          return chat?.messages.map(message=>({...message,isMine:message.sender.id === userSession.user.user.id,timestamp:message.created_at})) || []
    }

    const _messages = useMemo(()=>{return _transformMessages(chat)},[])
    console.log({_messages})
    // Group messages by formatted day
    const groupedMessages = _messages?.reduce((acc, message) => {
        const day = formatTimestamp(message.timestamp);
        // @ts-ignore
        acc[day] = acc[day] || [];
        // @ts-ignore
        acc[day].push(message);
        return acc;
    }, {}) as _GroupMessageType;

    return (
        <div className={"w-full h-full flex-1 flex flex-col px-2 py-3 overflow-y-auto custom-scrollbar dark-theme border-none shadow-none"}>
            {/*<MessageItem message={"You can use the rounded and rounded-[specific direction] utility classes in Tailwind CSS to achieve rounded corners. In your case, you want all corners rounded except for the top-left. Here's how you can do it:"} isMine={false} sender={"ivantom"}/>*/}
            {/*<MessageItem message={"In your case, you want all corners rounded except for the top-left. Here's how you can do it:"} isMine={true} sender={"tester"}/>*/}

            {Object.entries(groupedMessages).map(([day, messagesInDay]) => (

                <div key={day} className="mb-4">
                    <div className={"flex items-center gap-4 justify-center"}>
                        {/*<div className={"w-full border-t"}></div>*/}
                        <h3 className="text-center mb-2 py-0.5 text-xs bg-[#EEF1F5] text-[#BABBBD] select-none rounded-xl border px-3 dark:text-stone-50 dark:bg-slate-800">{day}</h3>
                        {/*<div className={"w-full border-t"}></div>*/}

                    </div>
                    {messagesInDay.map((msg,index) => (
                        <MessageItem
                            key={index}
                            message={msg as unknown as ChatMessageType}
                            isMine={msg.isMine}
                            sender={msg.sender}
                        />
                    ))}
                </div>
            ))}

        </div>
    )
}