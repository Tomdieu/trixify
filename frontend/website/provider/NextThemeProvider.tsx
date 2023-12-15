"use client"
import { ThemeProvider } from "next-themes"
import React from "react";

type NextThemeProviderProps = {
    children:React.ReactNode
}


export default function NextThemeProvider({children}:NextThemeProviderProps){
    return (
        <ThemeProvider attribute={"class"} enableSystem={true}>
            {children}
        </ThemeProvider>
    );
}