"use client"
import {NextUIProvider} from "@nextui-org/react";

type NextUiProviderProps = {
    children:React.ReactNode
}

export default function NextUiProvider({children}:NextUiProviderProps){
  return (
      <NextUIProvider>
          {children}
      </NextUIProvider>
  )
}