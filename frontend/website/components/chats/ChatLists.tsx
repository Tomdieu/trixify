// "use client"

import ChatItem from "@/components/chats/ChatItem";
import {ConversationType, GroupType} from "@/types";

type ChatListsProps = {
    chats:ConversationType[]|GroupType[]
}

export default function ChatLists({chats}:ChatListsProps) {


    return (
        <div className={"h-full flex-1 relative overflow-y-auto custom-scrollbar"}>
            {chats.map((chat)=><ChatItem key={chat.id} chat={chat}/>)}
        </div>
    );
}