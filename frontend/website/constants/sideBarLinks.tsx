import React from "react";
import {FiBookOpen, FiFileText, FiFilm, FiMessageSquare, FiUsers} from "react-icons/fi";
import {FileVideo, MessageCircle, Music, Package, Users, Video} from "lucide-react";

type SideBarLinksType = {
    name:string;
    icon:React.ReactNode,
    href:string
}

export const sideBarLinks:SideBarLinksType[] = [
    {
        name:"chats",
        icon:<MessageCircle  />,
        href:"/chats/"
    },
    {
        name:"Friends",
        icon:<Users />,
        href:"/friends/"
    },
    {
        name:"Posts",
        icon:<Package />,
        href:"/posts/"
    },
    {
        name:"Stories",
        icon:<FileVideo />,
        href:"/story/"
    },
    {
        name:"Shorts",
        icon:<Video />,
        href:"/shorts/"
    },
    {
        name:"Musics",
        icon:<Music  />,
        href:"/music/"
    }
]