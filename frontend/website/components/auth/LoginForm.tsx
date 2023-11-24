"use client"

import React from 'react'

import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast"

import {useRouter} from "next/navigation"

import {useFormStatus} from "react-dom"

import {useSession} from "next-auth/react"

import Link from "next/link"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"


type Props = {}

const LoginForm = (props: Props) => {

  const {pending} = useFormStatus()

  const router = useRouter()

  const {data:session} = useSession()

  console.log("Sessions : ",{...session})

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement);

    console.log("Submitting form")

    const {email,password} = Object.fromEntries(formData.entries())

    console.log({email,password})

    const res = await signIn("credentials",{email,password,redirect:false})
    console.log("Response : ", {...res})
    if(res && res.ok){
      toast({
        title:"Login",
        description:"You are being logged in",
      })
      router.refresh()
      console.log("Url : ",res.url)
      if(res.url){
        const url = new URL(res.url);
        const callbackUrl = url.searchParams.get('callbackUrl');
        if(callbackUrl){
          const decodedCallbackUrl = decodeURIComponent(callbackUrl);

          router.push(decodedCallbackUrl)
        }
        else{
          router.push("/")
        }
        

      }
      
    }

  }

  return (
    <div className='relative flex flex-col justify-center items-center h-full w-full px-5 overflow-hidden'>
      {/* <h2 className='text-5xl font-poppins  font-bold mb-3 select-none'>Trixify</h2> */}
      {/* className={"shadow-lg p-2 rounded-sm w-3/4 sm:w-[2/4] lg:min-w-[500px] bg-white"} */}
      <form onSubmit={handleSubmit} method='POST' className={"w-full"}>
      
      <Card className={"w-full"}>
        <CardHeader className={"space-y-1"}>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
        <CardContent className="grid gap-2 w-full">

        
          <div className='flex flex-col gap-2'>
            <Label htmlFor="email" className={"after:content-['*'] after:ml-0.5 after:text-red-500"}>Email</Label>
            <Input placeholder='email' type="email" required={true} name="email" id="email" className='px-3 py-3 rounded-sm border border-gray-400' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor="password" className={"after:content-['*'] after:ml-0.5 after:text-red-500"}>Password</Label>
            <Input placeholder='password' type="password" required={true} name="password" id="password" className='px-3 py-3 rounded-sm border border-gray-400' />
          </div>
        </CardContent>

          <CardFooter className="flex flex-col">
            <Button disabled={pending} type='submit' className='disabled:bg-gray-300 w-full py-5 px-2 bg-black text-white rounded-md'>Login</Button>
          </CardFooter>
          <div className="w-full items-center justify-center flex">
          <div className="w-full border mx-2"></div>
            </div>
          <div className="my-2 w-full items-center justify-center flex">
            <Link href={"#"} className="items-center">Forgot Password ?</Link>
            </div>
          <div className="my-3">
            <h5 className='text-center text-sm'>Don&apos; t have an account ? <span><a href="/auth/register" className='text-black font-bold'>Register</a></span></h5>
          </div>
      </Card>
        </form>
      <h5>Copyright &copy; {new Date().getFullYear()}  </h5>
    </div>
  )
}

export default LoginForm