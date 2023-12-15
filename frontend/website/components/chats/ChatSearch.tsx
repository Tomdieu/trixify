"use client"
import React, {useState} from "react"
import { Search} from "lucide-react";
import CreateChat from "@/components/chats/CreateChat";

type ChatSearchProps = {
    onSearch:(text:string)=>void
}

export default ({onSearch}: ChatSearchProps) => {
    const [value,setValue] = useState('')

    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | undefined)=>{
        if(e){
            setValue(e.target.value);
            onSearch(e.target.value);
        }
    }


    return (
        <div className={"p-2 md:p-3 lg:p-4 flex items-center bg-white justify-center w-full gap-4 dark-theme"}>
            <div className={"flex gap-2 items-center bg-[#F2F4F7] dark:bg-slate-600 flex-1 border px-2 py-0.5 rounded-md "}>
                <Search color={"#BCC1CA"} className={"h-4 w-4 lg:h-6 lg:w-6"} />
                <input value={value} onChange={handleChange} type={"search"} placeholder={"Search..."} className={"py-1.5 w-full flex-1 bg-[#F2F4F7]  text-gray-500 border-none focus:border-none outline-none caret-blue-500 dark:caret-stone-50 dark:bg-slate-600"} />
            </div>
            <CreateChat/>
        </div>
    )
}