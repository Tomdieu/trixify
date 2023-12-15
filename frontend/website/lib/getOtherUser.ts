import {MininalUserType} from "@/types";
import {Session} from "next-auth";

export default function getOtherUser(users:MininalUserType[],userSession:Session){
    return users.find((user)=>user.id === userSession.user.user.id)
}