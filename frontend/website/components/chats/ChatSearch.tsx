"use client"

import { Search} from "lucide-react";
import CreateChat from "@/components/chats/CreateChat";



export default function ChatSearch(){
    return (
        <div className={"p-4 flex items-center bg-white justify-center w-full gap-4"}>
            <div className={"flex gap-2 items-center bg-[#F2F4F7] flex-1 border px-2 py-0.5 rounded-md"}>
                <Search color={"#BCC1CA"} />
                <input type={"search"} className={"py-1.5 w-full flex-1 bg-[#F2F4F7] text-gray-500 border-none focus:border-none outline-none"} />
            </div>
            <CreateChat/>
        </div>
    )
}