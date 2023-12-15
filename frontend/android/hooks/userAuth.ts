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
        await AsyncStorage.setItem('user', JSON.stringify(user))

        set({ user,isLoggedIn:true })
    },
    setToken: async (token) => {
        await AsyncStorage.setItem('token', token)

        set({ token })
    },

    logout: async () => {
        set({ user: null,token:null, isLoggedIn: false })
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
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