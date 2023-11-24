import { create } from "zustand";
import {ChatType, ConversationType, GroupType} from "@/types";

interface ChatState {
    chats: ConversationType[]|GroupType[];
    selectedChat?: ConversationType|GroupType;
    searchChats : ConversationType[]|GroupType[];

    chatSearchOpen:boolean;
    chatMediaOpen:boolean;

    setSelectedChat: (chat: ConversationType|GroupType) => void;
    setChats: (chats: ConversationType[]|GroupType[]) => void;

    toggleChatSearch:()=>void;
    toggleMediaOpen:()=>void;

    getChats:()=>void;
    getChat:()=>void;
}

export const useChatStore = create<ChatState>((set,get) => ({
    chats: [],
    selectedChat: undefined,
    searchChats:[],
    chatSearchOpen:false,
    chatMediaOpen:false,

    toggleChatSearch:()=>{
        set((state)=>({chatSearchOpen:!get().chatSearchOpen}))
    },

    toggleMediaOpen:()=>{
        set((state)=>({chatMediaOpen:!get().chatMediaOpen}))
    },


    setChats: (chats) => {
        set((state) => ({ chats: chats }));
        set((state)=>({searchChats:chats}))
    },
    setSelectedChat: (chat) => {
        set((state) => ({ selectedChat: chat }));
    },

    getChats : ()=>{
    return get().chats;
    },
    getChat:()=>{
        const selectedChatId = get().selectedChat?.id;
        if(selectedChatId){
            return get().selectedChat
        }
        return null
    }
}));
