"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {useSession} from "next-auth/react";
import {ChevronDown, Laugh, MoreHorizontal} from "lucide-react";
import {Button as NxButton} from "@nextui-org/react";
import {sideBarColors} from "@/constants/colors";
import {ChatMessageType, MininalUserType, TextMessageType} from "@/types";
import TextMessage from "@/components/chats/Message/TextMessage";
import {MotionDiv} from "@/components/motion";

const variants = {
    hidden:{
        opacity:0
    },
    visible:{
        opacity:1
    }
}

export default function MessageItem({isMine, sender, message}: MessageItemProps) {

    const {content} = message

    return (
        <MotionDiv variants={variants} animate={"visible"} aria-labelledby={"message-container"} className={`flex items-center gap-2 my-2  group/message ${isMine ? "justify-end" : "justify-start"}`}>
            {isMine && (<div aria-labelledby={"message-reactions"} className={"h-full flex opacity-0  group-hover/message:opacity-100 transition-opacity items-center justify-center"}>
                <NxButton isIconOnly={true} className={"border rounded-full"}>
                    <Laugh color={sideBarColors.iconColor}/>
                </NxButton>
            </div>)}
            <div className={`flex gap-2 h-full ${isMine?"justify-items-end":""}`}>
                {!isMine && (
                    <Avatar className={"h-7 w-7 cursor-pointer"}>
                        <AvatarImage src={sender.avatar} alt={sender.username}/>
                        <AvatarFallback>{sender.username}</AvatarFallback>
                    </Avatar>
                )}

                <div className={"flex flex-col"}>
                    <div aria-labelledby={"sender"} className={"flex items-center gap-4"}>
                        {!isMine && <h5 className={"text-[#B3B4B4] select-none"}>{sender.username}</h5>}
                    </div>
                    <div
                        aria-labelledby={"message-content"}
                        className={`dark-theme dark:bg-slate-800 dark:text-slate-50 selection:bg-blue-400 selection:text-white flex relative items-start gap-4 px-3 py-2 max-w-[400px] overflow-y-auto ${!isMine ? 'bg-white' : 'bg-[#3376FE]'} ${!isMine ? 'text-[#707070]' : 'text-white'} rounded-xl ${!isMine ? 'rounded-tl-none' : 'rounded-tr-none'} group`}>

                        {/*Message*/}
                        {
                            content.resourcetype == "TextMessage" && <TextMessage content={content as TextMessageType} />
                        }
                        <NxButton
                            aria-labelledby={"message-action"}
                            className={`cursor-pointer rounded-full absolute top-1 right-1 z-30 opacity-0  group-hover:opacity-100 transition-opacity`}

                        >


                    <span
                        // className={`cursor-pointer absolute top-1 right-1 z-30 opacity-0  group-hover:opacity-100 transition-opacity`}
                    >
                        <ChevronDown color={!isMine?"#9098A4":"#fff"}/>
                        {/*<MoreHorizontal className={"h-5 w-5"}/>*/}
                      </span>
                        </NxButton>

                    </div>
                    <h5 aria-labelledby={"message-date"} className={"text-[#B3B4B4] text-xs w-full text-right"}>{new Date(message.created_at).toLocaleTimeString()}</h5>


                </div>

            </div>
            {!isMine && (<div aria-labelledby={"message-reactions"} className={"h-full flex opacity-0  group-hover/message:opacity-100 transition-opacity items-center justify-center"}>
                <NxButton isIconOnly={true} className={"border rounded-full"}>
                    <Laugh color={sideBarColors.iconColor}/>
                </NxButton>
            </div>)}
        </MotionDiv>
    )
}

type MessageItemProps = {
    isMine: boolean,
    sender: MininalUserType,
    message: ChatMessageType
}
