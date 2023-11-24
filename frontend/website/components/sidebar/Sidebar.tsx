"use client"

import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {sideBarLinks} from "@/constants/sideBarLinks";
import {LogOut, Settings} from "lucide-react";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation"
import {sideBarColors} from "@/constants/colors";


const Sidebar: React.FC = () => {
    const {data: session} = useSession()

    console.log("Session Sidebar : ",session?.user.token)

    const pathname = usePathname()

    return (
        <div className="flex flex-col justify-between h-full bg-[#F2F6FF] p-4 shadow">
            <div className="flex items-center justify-center w-full flex-col">
                <div className="flex items-center mb-6 justify-center rounded-full">
                    <Avatar>
                        <AvatarImage className="object-conver" src={session?.user.user.avatar} alt={session?.user.user.username}/>
                        <AvatarFallback>{session?.user.user.username}</AvatarFallback>
                    </Avatar>
                </div>
                {sideBarLinks.map(link => (
                    <div key={link.name} 
                        title={link.name}
                         className={`drop-shadow-2xl w-full border-2 ${link.href.includes(pathname) ? 'border-blue-600 shadow shadow-blue-600' : null} flex items-center mb-2 p-2 cursor-pointer justify-center rounded-full bg-white/30 shadow active:scale-90 hover:shadow-2xl hover:shadow-blue-400 text-white`}>
                        <Link href={link.href}>
                            {link.icon}
                        </Link>
                    </div>
                ))}
            </div>
            <div className={"flex gap-2 flex-col"}>

                <div
                    onClick={()=>signOut()}
                    title={"logout"}
                    aria-labelledby={"logout"}
                     className={`w-full border-2 flex items-center mb-2 p-2 cursor-pointer justify-center rounded-full bg-white/30 shadow active:scale-90 hover:shadow-2xl hover:shadow-blue-400`}>
                    <LogOut color={sideBarColors.iconColor}/>
                </div>
                <div title={"settings"}
                     className={`w-full border-2 flex items-center mb-2 p-2 cursor-pointer justify-center rounded-full bg-white/30 shadow active:scale-90 hover:shadow-2xl hover:shadow-blue-400`}>
                    <Settings  color={sideBarColors.iconColor}/>
                    {/* <span>Settings</span> */}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
