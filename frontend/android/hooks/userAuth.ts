import { UserType } from "@/types";
import { create } from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
    user?: UserType | null,
    token:string|null;
    isLoggedIn: boolean,

    setUser:(user:UserType)=>void;
    setToken:(token:string)=>void;

    logout:()=>void;

    loadData:()=>void;
}

export const useAuth = create<AuthState>((set, get) =>({
    user: null,
    token:null,
    isLoggedIn: false,

    setUser: async (user) => {
        set({ user,isLoggedIn:true })
        await AsyncStorage.setItem('user', JSON.stringify(user))
    },
    setToken: async (token) => {
        set({ token })
        await AsyncStorage.setItem('token', token)
    },

    logout: () => {
        set({ user: null,token:null, isLoggedIn: false })
        AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('token')
        
    },

    loadData: async () => {
        const user = await AsyncStorage.getItem('user')
        const token = await AsyncStorage.getItem('token')
        if (user && token) {
            set({ user: JSON.parse(user),token,isLoggedIn:true })
        }
    }

}))

useAuth.getState().loadData()