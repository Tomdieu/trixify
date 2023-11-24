"use client"


import {Button} from "@nextui-org/react";
import {MessageSquare} from "lucide-react"

export default function NewChatBtn(){
    return (
        <Button className={"p-3 rounded-md bg-blue-500"} isIconOnly={true}>
           <MessageSquare className={"text-white"}/>
        </Button>
    )
}