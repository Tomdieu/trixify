import { create } from "zustand";

interface TabState {
    shown: boolean;
    setShow: (shown: boolean) => void;
}

export const useTab = create<TabState>((set, get) => ({
    shown: true,
    setShow: (shown) => set({ shown }),
}));