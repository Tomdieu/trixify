"use client"

import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {sideBarLinks} from "@/constants/sideBarLinks";
import {LogOut, MoonIcon, Settings, SunIcon} from "lucide-react";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation"
import {sideBarColors} from "@/constants/colors";
import {Switch} from "@nextui-org/react";
import {cn} from "@/lib/utils";
import {useTheme} from "next-themes";



const Sidebar: React.FC = () => {
    const {data: session} = useSession()

    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const pathname = usePathname()

    console.log(pathname)

    const _pathname = pathname.split('/')
    _pathname.push("")


    return (
        <div className="flex flex-col justify-between h-full bg-[#F2F6FF] p-4 dark-theme shadow-none border-none border-l-0 border-t-0 border-b-0">
            <div className="flex items-center justify-center w-full flex-col">
                <div className="flex w-full items-center justify-between mb-6 py-2 border-b">
                    <h5 className={"text-xl font-poppins font-bold cursor-pointer bg-gradient-to-tr bg-clip-text from-blue-400 to-red-200"}>Trixify</h5>
                    <Avatar className={"cursor-pointer"}>
                        <AvatarImage className="object-conver" src={session?.user.user.avatar} alt={session?.user.user.username}/>
                        <AvatarFallback>{session?.user.user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
                {sideBarLinks.map(link => {

                    return (
                        <div key={link.name}
                             aria-label={link.name}
                             className={`w-full ${pathname !="/"  && _pathname.join("/").includes(link.href) ? 'bg-blue-600 text-slate-50 dark:text-slate-50 dark:bg-slate-800 font-medium' : null}  mb-2 p-2 rounded-md cursor-pointer`}>
                            <Link href={link.href} className={"flex items-center flex-1 gap-3"}>
                                {link.icon}
                                <span className={"capitalize font-light text-base"}>{link.name}</span>

                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className={"flex gap-2 flex-col"}>
                <Switch
                    onChange={()=> theme == "dark"? setTheme('light'): setTheme("dark")}

                    endContent={theme !== "dark"?<MoonIcon className="w-5 h-5 text-slate-900" />: <SunIcon className="w-5 h-5 text-yellow-200" />}
                    classNames={{
                        base: cn(
                            "inline-flex flex-row-reverse w-full max-w-md hover:bg-content2 items-center",
                            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                            "data-[selected=true]:border-primary dark:text-white dark:text-slate-800 dark:bg-slate-800 font-poppins",
                        ),

                    }}
                >
                    <div className="flex flex-col gap-1">
                        <p className="text-sm"> Toggle theme</p>
                    </div>
                </Switch>
                <div
                    onClick={()=>signOut()}
                    aria-labelledby={"logout"}
                     className={`w-full flex items-center gap-3 mb-2 p-2 cursor-pointer rounded-md active:scale-90`}>
                    <LogOut color={sideBarColors.iconColor}/>
                    <span className={"capitalize font-light text-base"}>Logout</span>
                </div>
                <div                      className={`w-full flex items-center gap-3 mb-2 p-2 cursor-pointer rounded-md active:scale-90`}>
                    <Settings  color={sideBarColors.iconColor}/>

                    <span className={"capitalize font-light text-base"}>Settings</span>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;
