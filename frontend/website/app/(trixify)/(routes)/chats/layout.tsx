import ChatSideBar from "@/components/chats/ChatSideBar";
import React from "react";

type ChatLayoutProps = {
    children:React.ReactNode
}

export default async function ChatLayout({children}:ChatLayoutProps){
    return (
        <div className="flex-1 h-full w-full flex font-poppins">
            <div className={"w-4/12 md:w-3/12 h-full"}>
                <ChatSideBar/>
            </div>
            <div className="w-8/12 md:w-9/12 h-full border flex flex-col dark-theme">
                {children}
            </div>
        </div>
    )
}
