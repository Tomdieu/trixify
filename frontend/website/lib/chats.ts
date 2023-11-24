// import {getSession} from "@/lib/getSession";


export async  function getChats(token:string){


    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/chats/chats/",{
        method:"GET",
        headers:{
            "Authorization":`token ${token}`,
            "Content-Type":"application/json"
        }
    })
    const data = await response.json()
    if(response.status==200){
        return data;
    }
    else{
        return Promise.reject(data)
    }

}