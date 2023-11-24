"use client"

import ChatHeader from "@/components/chats/ChatHeader";
import ChatContainer from "@/components/chats/ChatContainer";
import ChatInput from "@/components/chats/ChatInput";

export default function ChatPage() {

    return (
        <div className={"w-full flex-1 flex h-full flex-col bg-[#F7F8FA]"}>
            <ChatHeader/>
            <ChatContainer/>
            <ChatInput/>
        </div>
    )
}
