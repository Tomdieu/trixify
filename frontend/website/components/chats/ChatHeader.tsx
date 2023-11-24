"use client"

// import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {Button} from "@nextui-org/react";

import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import ChatSettings from "@/components/chats/ChatSettings";


export default function ChatHeader() {
    return (
        <div className={"w-full py-3 px-3 flex items-center justify-between border-b"}>
            <h5 className={"text-[#494A4A] text-xl"}>Ivan Tom</h5>
            <Sheet>
                <SheetTrigger>
                    <Button isIconOnly className={"border-none bg-[#F7F8FA] p-2 rounded-full"}>
                        <MoreHorizontal/>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <ChatSettings/>
                </SheetContent>
            </Sheet>

        </div>
    )
}