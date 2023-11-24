"use client"

import { SessionProvider } from "next-auth/react"
import React from "react";

type AppProviderProps = {
    children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {

    return <SessionProvider>{children}</SessionProvider>

}