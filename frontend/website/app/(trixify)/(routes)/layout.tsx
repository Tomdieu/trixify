import Sidebar from "@/components/sidebar/Sidebar";
import {getSession} from "@/lib/getSession";

type TrixifyLayoutProps = {
    children:React.ReactNode
}

export default async function TrixifyLayout({children}:TrixifyLayoutProps){
    // const session = await getSession()
    // console.log("Server Session : ",session?.user.token)
    return (
        <div className="h-screen flex w-full flex-1">
            <div className="w-1.5/12">
                <Sidebar/>
            </div>
            <div className="w-10.5/12 h-full flex flex-col flex-1">
                {children}
            </div>
        </div>
    )
}
