"use client"

import {Avatar, Button} from "@nextui-org/react";
import {ChevronDown, ChevronRight, CircleDot, LogOut, Phone, Search, UserPlus, Users2, Video} from "lucide-react";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {useChatStore} from "@/hooks/useChat";
import {ConversationType, GroupType, MininalUserType} from "@/types";
import {useRouter} from "next/navigation";
import getOtherUser from "@/lib/getOtherUser";

export default function ChatSettings() {
    const {data: session} = useSession()
    const {selectedChat} = useChatStore()

    const isDiscussion = Boolean(selectedChat && !selectedChat.is_group)
    const selfChat = (isDiscussion && (selectedChat as ConversationType).self_chat)

    const router = useRouter()

    return <div
        className={"relative custom-scrollbar overflow-y-auto w-full gap-3 h-full bg-[#F7F8FA] shadow p-3 dark-theme"}>

        <div className={"w-full flex py-2 border-b pb-3 items-center justify-center flex-col"}>
            {selectedChat?.avatar &&
                <Image src={selectedChat?.avatar!} className={"border rounded-full"} alt={selectedChat?.name!}
                       width={200} height={200}/>}

            <div>
                <h5 className={"text-xl text-center text-slate-800 dark:text-slate-50"}>{session?.user.user.username == selectedChat?.name ? selectedChat?.name + " (You)" : selectedChat?.name!}</h5>
                {!selectedChat?.is_group && (
                    <h6 className={"text-xs text-gray-400 text-center"}>{session?.user.user.phone_number}</h6>)}
                {selectedChat?.is_group && (
                    <h6 className={"text-xs text-slate-600 text-center dark:text-slate-200"}>{(selectedChat as GroupType)?.description}</h6>)}

            </div>
            <div className={"flex gap-3 items-center my-2 justify-center select-none text-slate-500"}>
                {session?.user.user.username != selectedChat?.name && (
                    <>
                        <Button
                            className={"flex p-2 rounded-md items-center justify-center flex-col gap-2 cursor-pointer"}>
                            <Phone/>
                            <h6 className={"text-xs"}>Audio</h6>
                        </Button>

                        <Button
                            className={"flex p-2 rounded-md items-center justify-center flex-col gap-2 cursor-pointer"}>
                            <Video/>
                            <h6 className={"text-xs"}>Video</h6>
                        </Button>
                        {!isDiscussion && (
                            <Button
                                className={"flex p-2 rounded-md items-center justify-center flex-col gap-2 cursor-pointer"}>
                                <UserPlus/>
                                <h6 className={"text-xs"}>Add</h6>
                            </Button>
                        )}

                    </>
                )}

                <Button className={"flex p-2 rounded-md items-center justify-center flex-col gap-2 cursor-pointer"}>
                    <Search/>
                    <h6 className={"text-xs"}>Search</h6>
                </Button>
            </div>
        </div>

        {(!selectedChat?.is_group && session) && (
            <div className={"flex w-full flex-col py-1 gap-2 pb-3  my-2"}>
                <h5 className={"text-gray-500 text-sm font-poppins"}>{getOtherUser(selectedChat?.users as MininalUserType[], session)?.bio}</h5>
            </div>
        )}


        <div className={"flex w-full flex-col py-2 gap-2 pb-3  border-y my-2"}>
            <div className={"flex items-center justify-between"}>
                <h5 className={"text-sm text-[#9098A4]"}>Media, Links, and docs</h5>
                <div className={"flex items-center h-full"}>
                    <span className={"text-sm text-[#9098A4]"}>
                    1
                </span>
                    <ChevronRight color={"#9098A4"} size={20}/>

                </div>

            </div>
            <div className={"w-full flex items-center gap-1 custom-scrollbar overflow-x-scroll py-3 select-none"}>
                {/*<Image src={session?.user.user.avatar!} alt={session?.user.user.username!}  width={96} height={96}/>*/}

                {/*<div className={"border h-24 w-24 min-w-[6rem] rounded-md bg-yellow-400"}>*/}
                {/*    <Image src={session?.user.user.avatar!} alt={session?.user.user.username!}*/}
                {/*           className={"w-full h-full object-cover"} width={96} height={96}/>*/}
                {/*</div>*/}

            </div>
        </div>
        {(!isDiscussion) && (
            <div className={"flex w-full flex-col py-3 mt-2 gap-2 pb-3 border-y"}>
                <div className={"flex items-center justify-between"}>
                    <span className={"text-sm dark:text-slate-500"}>{selectedChat?.users.length} members</span>
                    <Button isIconOnly className={"p-1 rounded-full"}>
                        <Search className={"h-4 w-4 dark:text-slate-500"}/>
                    </Button>
                </div>
                {selectedChat && (
                    <>
                        {(selectedChat as GroupType).users.map(({user, is_admin, joined_on}) => {
                            return (
                                <Button
                                    className={"relative flex items-center gap-3 p-2 rounded-sm group hover:bg-blue-500 transition-all"}>
                                    <Image src={user.avatar!} alt={user.username} width={32} height={32}/>
                                    <div className={"flex-1"}>
                                        <div className={"flex items-center justify-between"}>
                                            <h5>{user.id == session?.user.user.id ? "You" : user.username}</h5>
                                            <div
                                                className={"rounded-sm px-1 text-xs text-stone-50 bg-blue-600 dark:bg-slate-700 dark:text-slate-50"}>{is_admin && 'Group Admin'}</div>
                                        </div>
                                        <h6 className={"text-xs text-slate-400 truncate text-left"}>{user.bio}</h6>
                                    </div>
                                    <Button isIconOnly={true}
                                            className={"absolute z-50 right-1 bottom-0 opacity-0 transition-all group-hover:opacity-1 rounded-full p-2"}>
                                        <ChevronDown className={"text-stone-200 w-4 h-4"}/>
                                    </Button>
                                </Button>
                            )
                        })}

                    </>
                )}
            </div>
        )}
        {/*session?.user.user.username != selectedChat?.name*/}
        {(!selfChat) && (
            <>
                {!selectedChat?.is_group && (
                    <div className={"flex w-full flex-col py-1 gap-2 pb-3 border-b"}>
                        <div>
                            <h5 className={"text-gray-400 text-sm"}>{(selectedChat as ConversationType).groups_in_common.length} Groups
                                in common</h5>
                        </div>
                        <div className={"flex flex-col gap-3 w-full"}>
                            <Button className={"flex w-full p-2 items-center gap-3 rounded-md"}>
                                {/*<Users2 color={"gray"}/>*/}
                                <Avatar
                                    icon={<Users2/>}
                                    classNames={{
                                        base: "border bg-blue-500",
                                        icon: "text-gray-300 text-stone-50",
                                    }}
                                />
                                <div className={"flex-1 text-left"}>
                                    <h3 className={"text-sm text-gray-600 dark:text-stone-200"}>Create Group with
                                        Ivantom</h3>
                                </div>
                            </Button>
                            {(selectedChat as ConversationType).groups_in_common.map(({id, name, avatar, members}) => (
                                <Button onPress={() => router.push("/chats/" + id)}
                                        className={"flex w-full p-2 items-center gap-3 rounded-md"}>
                                    {session && <Image src={avatar || session?.user.user.avatar!}
                                                       alt={name || session?.user.user.username!} width={40}
                                                       height={40}/>}

                                    <div className={"flex-1 text-left"}>
                                        <div className={"flex items-center justify-between"}>
                                            <h4 className={"text-sm text-gray-600 dark:text-stone-50"}>{name}</h4>
                                        </div>
                                        <h6 className={"text-xs text-gray-400 dark:text-slate-200"}>{members.join(",")}</h6>
                                    </div>

                                </Button>
                            ))}

                        </div>
                    </div>
                )}

                <div className={"flex w-full flex-col py-3 mt-2 gap-2 pb-3 border-y"}>

                    {isDiscussion && (
                        <Button className={"w-full px-2 py-3 rounded-md text-red-400 flex items-center gap-4"}>
                            <CircleDot/>
                            <div className={"flex-1 text-left"}>
                                <span>Block {selectedChat?.name}</span>
                            </div>
                        </Button>
                    )}

                    {selectedChat?.is_group && (
                        <Button className={"w-full px-2 py-3 rounded-md text-red-400 flex items-center gap-4"}>
                            <LogOut/>
                            <div className={"flex-1 text-left"}>
                                <span>Exit group</span>
                            </div>
                        </Button>
                    )}

                </div>
            </>
        )}

    </div>
}