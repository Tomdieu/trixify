export async function getChats(token:string){
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/chats/chats/`,{
        method:"GET",
        headers:{
            "Authorization":`token ${token}`
        }
    })

    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error(data)
    }
}

export async function getChat(chatId:string,token:string){
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/chats/chats/${chatId}/`,{
        method:"GET",
        headers:{
            "Authorization":`token ${token}`
        }
    })

    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error(data)
    }
}