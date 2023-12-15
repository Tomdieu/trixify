import { useAuth } from "@/hooks/userAuth"
// import { useQuery } from "@tanstack/react-query"

export const checkPhoneNumbers = async (phoneNumbers: string[]) => {
    const {token} = useAuth()
    const res = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL+"api/contacts/check-contacts/",{
        method:"POST",
        body:JSON.stringify({contacts:phoneNumbers}),
        headers:{
            "Content-Type":"application/json",
            "Authorization":`token ${token}`
        }
    })
    return await res.json()
}

