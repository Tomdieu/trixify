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
        icon:<MessageCircle color={"#1c71d8"} />,
        href:"/chats/"
    },
    {
        name:"Friends",
        icon:<Users color={"#1c71d8"} />,
        href:"/friends/"
    },
    {
        name:"Posts",
        icon:<Package color={"#00999a"} />,
        href:"/posts/"
    },
    {
        name:"Stories",
        icon:<FileVideo color={"#FFCA28"}/>,
        href:"/story/"
    },
    {
        name:"Shorts",
        icon:<Video color={"#E53935"}/>,
        href:"/shorts/"
    },
    {
        name:"Musics",
        icon:<Music color={"#D500F9"} />,
        href:"/musics/"
    }
]