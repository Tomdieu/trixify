import {GroupType} from "@/types";

export default (chat:GroupType) =>{
    return chat.users.map((user)=>user.user.username).join(",")
}