"use client"

import {Avatar, Button} from "@nextui-org/react";
import {ChevronRight, LogOut, Phone, Search, Users2, Video, X} from "lucide-react";
import Image from "next/image";
import {useSession} from "next-auth/react";

export default function ChatSettings() {
    const {data: session} = useSession()

    return <div className={"relative custom-scrollbar overflow-y-auto w-full h-full bg-[#F7F8FA] shadow p-3"}>
        <div className={"absolute top-1 right-1 z-50 flex items-center justify-end"}>
            {/*<h5 className={"text-xl font-poppins"}>Setting</h5>*/}
            <Button isIconOnly={true} className={"relative p-2 rounded-full"}>
                <X color={"#9098A4"}/>
            </Button>
        </div>
        <div className={"w-full flex py-2 border-b pb-3 items-center justify-center flex-col"}>
            {session && <Image src={session?.user.user.avatar!} alt={session?.user.user.username!} width={200} height={200}/>}

            <div>
                <h5 className={"text-xl"}>{session?.user.user.username!}</h5>
                <h6 className={"text-xs text-gray-400"}>{session?.user.user.phone_number}</h6>
            </div>
            <div className={"flex gap-6 items-center my-2 select-none"}>
                <div className={"flex items-center justify-center flex-col gap-2 cursor-pointer"}>
                    <Phone/>
                    <h6 className={"text-xs"}>Audio</h6>
                </div>
                <div className={"flex items-center justify-center flex-col gap-2 cursor-pointer"}>
                    <Video/>
                    <h6 className={"text-xs"}>Video</h6>
                </div>
                <div className={"flex items-center justify-center flex-col gap-2 cursor-pointer"}>
                    <Search/>
                    <h6 className={"text-xs"}>Search</h6>
                </div>
            </div>
        </div>
        <div className={"flex w-full flex-col py-1 gap-2 pb-3 border-b"}>
            <div className={"flex items-center justify-between"}>
                <h5 className={"text-sm text-[#9098A4]"}>Media, Links, and docs</h5>
                <div className={"flex items-center h-full"}>
                    <span className={"text-sm text-[#9098A4]"}>
                    5
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
                {/*<div className={"border h-24 w-24 min-w-[6rem] rounded-md bg-yellow-400"}>*/}
                {/*    <Image src={session?.user.user.avatar!} alt={session?.user.user.username!}*/}
                {/*           className={"w-full h-full object-cover"} width={96} height={96}/>*/}
                {/*</div>*/}
                {/*<div className={"border h-24 w-24 min-w-[6rem] rounded-md bg-yellow-400"}>*/}
                {/*    <Image src={session?.user.user.avatar!} alt={session?.user.user.username!}*/}
                {/*           className={"w-full h-full object-cover"} width={96} height={96}/>*/}
                {/*</div>*/}
                {/*<div className={"border h-24 w-24 min-w-[6rem] rounded-md bg-yellow-400"}>*/}
                {/*    <Image src={session?.user.user.avatar!} alt={session?.user.user.username!}*/}
                {/*           className={"w-full h-full object-cover"} width={96} height={96}/>*/}
                {/*</div>*/}
                {/*<div className={"border h-24 w-24 min-w-[6rem] rounded-md bg-yellow-400"}>*/}
                {/*    <Image src={session?.user.user.avatar!} alt={session?.user.user.username!}*/}
                {/*           className={"w-full h-full object-cover"} width={96} height={96}/>*/}
                {/*</div>*/}
                {/*<div className={"border h-24 w-24 min-w-[6rem] rounded-md bg-yellow-400"}>*/}
                {/*    <Image src={session?.user.user.avatar!} alt={session?.user.user.username!}*/}
                {/*           className={"w-full h-full object-cover"} width={96} height={96}/>*/}
                {/*</div>*/}
                {/*<div className={"border h-24 w-24 min-w-[6rem] rounded-md bg-yellow-400"}>*/}
                {/*    <Image src={session?.user.user.avatar!} alt={session?.user.user.username!}*/}
                {/*           className={"w-full h-full object-cover"} width={96} height={96}/>*/}
                {/*</div>*/}

            </div>
        </div>
        <div className={"flex w-full flex-col py-1 gap-2 pb-3 border-b"}>
            <div>
                <h5 className={"text-gray-400 text-sm"}>5 Groups in common</h5>
            </div>
            <div className={"flex flex-col gap-3 w-full"}>
                <Button className={"flex w-full p-2 items-center gap-3 rounded-md"}>
                    {/*<Users2 color={"gray"}/>*/}
                    <Avatar
                        icon={<Users2/>}
                        classNames={{
                            base: "border",
                            icon: "text-gray-300",
                        }}
                    />
                    <div className={"flex-1 text-left"}>
                        <h3 className={"text-sm text-gray-600"}>Create Group with Ivantom</h3>
                    </div>
                </Button>
                <Button className={"flex w-full p-2 items-center gap-3 rounded-md"}>
                    {session && <Image src={session?.user.user.avatar!} alt={session?.user.user.username!} width={40} height={40}/>}

                    <div className={"flex-1 text-left"}>
                        <div className={"flex items-center justify-between"}>
                            <h4 className={"text-sm text-gray-600"}>X Group</h4>
                            {/*<span className={"rounded-sm px-1 text-xs text-blue-400 bg-blue-100"}>*/}
                            {/*    Group Admin*/}
                            {/*</span>*/}
                        </div>
                        <h6 className={"text-xs text-gray-400"}>Poeple</h6>
                    </div>

                </Button>
            </div>
        </div>
        <div className={"flex w-full flex-col py-3 mt-2 gap-2 pb-3 border-y"}>

            <Button className={"w-full px-2 py-3 rounded-md text-red-400 flex items-center gap-4"}>
                <LogOut/>
                <div className={"flex-1 text-left"}>
                    <span>Exit group</span>
                </div>
            </Button>
        </div>
    </div>
}