import { UserType } from "@/types"
import {create} from "zustand"

interface AuthState {
    user:UserType|null;
    setUser:(user:UserType)=>void;
    token:string|null;
    setToken:(token:string)=>void;

    
}

export const useAuthStore = create<AuthState>((set,get)=>({
    user:null,
    setUser:(user)=>{
        set((state)=>({user:user}))
    },
    token:null,
    setToken:(token)=>{
        set((state)=>({token:token}))
    }
}))