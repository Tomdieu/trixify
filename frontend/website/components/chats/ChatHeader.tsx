"use client"

// import {Button} from "@/components/ui/button";
import {MoreHorizontal, PhoneCall} from "lucide-react";
import {Button} from "@nextui-org/react";

import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import ChatSettings from "@/components/chats/ChatSettings";
import {useChatStore} from "@/hooks/useChat";
import Image from "next/image";
import getMembers from "@/lib/getMembers";
import {GroupType} from "@/types";
import {useSession} from "next-auth/react";


export default function ChatHeader() {
    const {selectedChat} = useChatStore()
    const {data:session} = useSession()
    const isGroup = selectedChat && selectedChat.is_group;
    return (
        <div className={"w-full py-3 px-3 flex items-center justify-between border-b dark-theme shadow-none"}>
            <div className={"flex flex-1 gap-2 items-center justify-between"}>
                {selectedChat?.avatar && <Image src={selectedChat.avatar} className={"border rounded-full"} alt={selectedChat.name.charAt(0)} width={46} height={46}/>}

                <div className={"flex flex-col flex-1 cursor-pointer"}>
                    <h5 className={"text-[#494A4A] text-lg font-poppins dark:text-slate-50 select-none cursor-pointer"}>{session?.user.user.username == selectedChat?.name ?selectedChat?.name + " (You)": selectedChat?.name}</h5>
                    {isGroup && (<div><h5 className={"text-xs"}>{getMembers(selectedChat as GroupType)}</h5></div>)}
                    {session?.user.user.username == selectedChat?.name && <h5 className={"text-xs"}>Message yourself</h5>}
                </div>
            </div>
            <div className={"flex items-center gap-2"}>
                <Button isIconOnly className={"border-none bg-[#F7F8FA] dark:bg-transparent p-2 rounded-full"}>
                    <PhoneCall className={"dark:text-stone-50"}/>
                </Button>
                <Sheet>
                    <SheetTrigger asChild={true}>
                        <Button isIconOnly className={"border-none bg-[#F7F8FA] dark:bg-transparent p-2 rounded-full"}>
                            <MoreHorizontal className={"dark:text-stone-50"}/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className={"h-full w-full flex flex-col p-0 flex-1 dark-theme"}>
                        <ChatSettings/>
                    </SheetContent>
                </Sheet>
            </div>


        </div>
    )
}