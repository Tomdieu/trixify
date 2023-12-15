import Sidebar from "@/components/sidebar/Sidebar";

type TrixifyLayoutProps = {
    children:React.ReactNode
}

export default async function TrixifyLayout({children}:TrixifyLayoutProps){

    return (
        <div className="h-screen flex w-full flex-1 p-0 m-0">
            <div className="w-0 lg:w-2/12 dark-theme">
                <Sidebar/>
            </div>
            <div className="md:w-10/12 h-full flex flex-col flex-1 dark-theme">
                {children}
            </div>
        </div>
    )
}
