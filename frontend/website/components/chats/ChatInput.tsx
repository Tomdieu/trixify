"use client"
import {Textarea} from "@/components/ui/textarea"
import {AlignLeft, FileMinus, Image, Laugh, MapPin, Mic, Paperclip, Plus, Send, X} from "lucide-react";
import {Button as NxButton} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import {sideBarColors} from "@/constants/colors";
import EmojiPicker from "emoji-picker-react"
import {MotionDiv} from "@/components/motion";
import {Variants} from "framer-motion";
import {TextMessageType} from "@/types";
import {useChatStore} from "@/hooks/useChat";
import {createMessage} from "@/lib/actions/messages";

const variants: Variants = {
    active: {
        opacity: 1,
    },
    inactive: {
        opacity: 0,
        transition: {duration: 1, ease: "backOut"},
    }
}

export default function ChatInput() {
    const [open, setOpen] = useState(false)

    const [emojiOpen, setEmojiOpen] = useState(false);

    const [value, setValue] = useState("")

    const [file, setFile] = useState<File[]>()

    const {selectedChat, replyMessage} = useChatStore()


    const ref = useRef<HTMLDivElement>(null);


    const handleButtonClick = (event: any) => {
        // Prevent the click event from propagating to the document
        event.stopPropagation();
        setOpen(!open);
    };

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                // Click occurred outside the open element, close it
                setOpen(false);
            }
        };


        // Attach the event listener to the document
        document.addEventListener('click', handleClickOutside);


        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open]);


    const toggleEmoji = () => {
        setEmojiOpen(!emojiOpen)
    }


    const handleSendMessage = () => {
        if (value) {
            if (!file) {
                const textMessage: TextMessageType = {text: value, resourcetype: "TextMessage"}
                createMessage({chat: selectedChat?.id!, parent_message: replyMessage?.id, content: textMessage}).then(message => {
                    console.log("Message Created  : ", message)
                }).catch(err => {
                    console.log("Error : ", err)
                })
            }
        }
    }

    return (
        <div className={"w-full p-2 flex flex-col gap-2 border-t dark-theme shadow-none rounded-none"}>

            <div className={"flex gap-2 items-start w-full"}>
                <div className={"relative"}>
                    <NxButton onClick={toggleEmoji} isIconOnly={true} className={"border p-2 rounded-full"}>
                        <Laugh color={sideBarColors.iconColor}/>
                    </NxButton>
                    <div
                        className={`absolute dark-theme bottom-[55px] z-50 ease-in duration-1000 transition-all ${emojiOpen ? "flex" : "hidden"}`}>
                        <EmojiPicker onEmojiClick={(data) => {
                            setValue((value) => value + data.emoji)
                        }}/>
                        <NxButton onClick={toggleEmoji} isIconOnly
                                  className={"absolute right-1 top-1 p-1 rounded-full"}>
                            <X size={16} color={sideBarColors.iconColor}/>
                        </NxButton>
                    </div>
                </div>
                <div className={"relative"}>
                    <NxButton onClick={handleButtonClick} isIconOnly={true} className={"border p-2 rounded-full"}>

                        <Plus color={sideBarColors.iconColor}
                              className={`ease-in-out duration-200 transition-all ${open ? 'rotate-45' : ""}`}/>
                    </NxButton>
                    <MotionDiv
                        ref={ref}
                        variants={variants}
                        animate={open ? "active" : "inactive"}
                        className={`dark-theme flex items-center gap-2 border px-3 py-2 rounded-full absolute bg-[#F7F8FA] bottom-[55px] z-50 `}>

                        <NxButton onClick={() => {
                            console.log("Image")
                        }} isIconOnly={true} className={"border p-2 rounded-full"}>
                            <Image color={sideBarColors.iconColor}/>
                        </NxButton>
                        <NxButton isIconOnly={true} className={"border p-2 rounded-full"}>
                            <Paperclip color={sideBarColors.iconColor}/>
                        </NxButton>
                        <NxButton isIconOnly={true} className={"border p-2 rounded-full"}>
                            <FileMinus color={sideBarColors.iconColor}/>
                        </NxButton>
                        <NxButton isIconOnly={true} className={"border p-2 rounded-full"}>
                            <AlignLeft color={sideBarColors.iconColor}/>
                        </NxButton>
                        <NxButton disabled={true} isIconOnly={true}
                                  className={"border p-2 rounded-full disabled:bg-gray-200"}>
                            <MapPin color={sideBarColors.iconColor}/>
                        </NxButton>
                    </MotionDiv>
                </div>
                <Textarea value={value} placeholder={"Type a message"}
                          className={"focus:border-none outline-none text-gray-600 custom-scrollbar"}
                          onChange={(e) => setValue(e.target.value)}/>
                <div>
                    {value.length === 0 ? (
                        <NxButton aria-labelledby={"record"} isIconOnly={true} className={"border p-2 rounded-full"}>

                            <Mic color={sideBarColors.iconColor}/>
                        </NxButton>
                    ) : (
                        <NxButton onClick={handleSendMessage} aria-labelledby={"send"} isIconOnly={true}
                                  className={"border p-2 rounded-full"}>
                            <Send color={sideBarColors.iconColor}/>
                        </NxButton>
                    )}


                </div>
            </div>
        </div>
    )
}