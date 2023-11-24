import { ConversationType, GroupType } from "@/types";
import {create} from "zustand"

interface ChatState {
    chats: GroupType[]|ConversationType[],
    setChats:(chats:GroupType[]|ConversationType[])=>void;

    selectedChat?:GroupType|ConversationType|null,
    setSelectedChat:(chat:GroupType|ConversationType|null)=>void;


}

export const useChatStore = create<ChatState>((set, get) =>({
    chats: [],
    setChats: (chats) => set({ chats }),

    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat:chat }),

}))