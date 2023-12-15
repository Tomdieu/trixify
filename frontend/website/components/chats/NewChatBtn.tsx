"use client"


import {Button} from "@nextui-org/react";
import {MessageSquare} from "lucide-react"

export default function NewChatBtn(){
    return (
        <Button className={"md:p-1 lg:p-3 rounded-md bg-blue-500 dark:bg-slate-800"} isIconOnly={true}>
           <MessageSquare className={"text-white h-4 w-4 lg:h-6 lg:w-6"}/>
        </Button>
    )
}