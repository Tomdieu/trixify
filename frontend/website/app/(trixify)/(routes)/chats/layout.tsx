import Sidebar from "@/components/sidebar/Sidebar";
import ChatSideBar from "@/components/chats/ChatSideBar";
import ChatSettings from "@/components/chats/ChatSettings";

type ChatLayoutProps = {
    children:React.ReactNode
}

export default async function ChatLayout({children}:ChatLayoutProps){
    return (
        <div className="flex-1 h-full w-full flex font-poppins">
            <div className={"w-3/12 h-full"}>
                <ChatSideBar/>
            </div>
            <div className="w-9/12 h-full border ">
                {children}
            </div>

        </div>
    )
}
