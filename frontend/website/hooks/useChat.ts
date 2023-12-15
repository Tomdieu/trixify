import { create } from "zustand";
import {ChatMessageType, ChatType, ConversationType, GroupType} from "@/types";

interface ChatState {
    chats: ConversationType[]|GroupType[];
    selectedChat: ConversationType|GroupType|null;
    searchChats : ConversationType[]|GroupType[];


    replyMessage:ChatMessageType|null;
    setReplyMessage:(message:ChatMessageType|null)=>void;


    chatSearchOpen:boolean;
    chatMediaOpen:boolean;

    setSelectedChat: (chat: ConversationType|GroupType|null) => void;
    setChats: (chats: ConversationType[]|GroupType[]) => void;

    setSearchChats:(chats:ConversationType[]|GroupType[])=>void;

    toggleChatSearch:()=>void;
    toggleMediaOpen:()=>void;

    getChats:()=>void;
    getChat:()=>void;
}

export const useChatStore = create<ChatState>((set,get) => ({
    chats: [],
    selectedChat: null,
    searchChats:[],
    chatSearchOpen:false,
    chatMediaOpen:false,

    replyMessage:null,

    setReplyMessage:(message)=>{
        set((state)=>({replyMessage:message}))
    },

    toggleChatSearch:()=>{
        set((state)=>({chatSearchOpen:!get().chatSearchOpen}))
    },

    toggleMediaOpen:()=>{
        set((state)=>({chatMediaOpen:!get().chatMediaOpen}))
    },

    setSearchChats:(chats)=>{
        set((state)=>({searchChats:chats}))
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
