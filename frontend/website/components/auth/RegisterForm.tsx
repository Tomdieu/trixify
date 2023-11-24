"use client"

import { signUpSchema, signUpSchemaType } from "@/schema/signUpSchema";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { toast } from "@/components/ui/use-toast"


import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
    const { register, getValues, setValue, handleSubmit, formState: { errors, isValid }
    }
        = useForm<signUpSchemaType>({ resolver: zodResolver(signUpSchema) });

    const [avatarUrl, setAvatarUrl] = useState("")
    const [avatar, setAvatar] = useState<File | null>()

    const router = useRouter()

    function onSubmit(values: signUpSchemaType) {
        console.log(values)

        // append the different values to the form data

        const formData = new FormData()

        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                // @ts-ignore
                formData.append(key, values[key])
            }
        }

        formData.append("avatar", avatar as File)

        // send the form data to the server

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/accounts/register/", {
            method: "POST",
            body: formData
        }).then(async (response) => {
            const data = await response.json()
            console.log(data)

            if (response.ok) {

                toast({
                    title: "Account created",
                    description: "Your account has been created successfully",
                })

                setTimeout(() => {
                    router.push("/auth/login")
                }, 2000)
            }

            if (response.status === 400) {
                toast({
                    title: "Error",
                    description: data.detail,
                })
            }
        }).catch(error => {
            console.log(error)
        })


    }

    return (
        <div className="relative flex flex-col justify-center items-center h-full w-full px-5 overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full"}>
                <Card className={"w-full rounded-md"}>
                    <CardHeader className={"space-y-1"}>
                        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                        <CardDescription className="text-center">Fill the information&apos;s below</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <div className={"grid gap-2"}>
                            <Label htmlFor={"email"} className={"after:content-['*'] after:ml-0.5 after:text-red-500 "}>Email</Label>
                            <Input
                                placeholder="Enter your email here"
                                type={"email"}
                                className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"}
                                {...register("email")}
                            />
                            {errors.email && (
                                <small style={{ color: "red" }} className={"text-xs"}>{errors.email.message}</small>
                            )}
                        </div>
                        <div className={"grid gap-2"}>
                            <Label htmlFor={"username"} className={"after:content-['*'] after:ml-0.5 after:text-red-500 "}>Username</Label>
                            <Input
                                placeholder="Enter your username here"
                                type={"text"}
                                className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"}
                                {...register("username")}
                            />
                            {errors.username && (
                                <small style={{ color: "red" }} className={"text-xs"}>{errors.username.message}</small>
                            )}
                        </div>
                        <div className={"grid gap-2"}>
                            <Label htmlFor={"first_name"} >First name</Label>
                            <Input
                                placeholder="Enter your first name here"
                                type={"text"}
                                className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"}
                                {...register("first_name")}
                            />
                            {errors.first_name && (
                                <small style={{ color: "red" }} className={"text-xs"}>{errors.first_name.message}</small>
                            )}
                        </div>
                        <div className={"grid gap-2"}>
                            <Label htmlFor={"last_name"}>Last name</Label>
                            <Input
                                placeholder="Enter your last name here"
                                type={"text"}
                                className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"}
                                {...register("last_name")}
                            />
                            {errors.last_name && (
                                <small style={{ color: "red" }} className={"text-xs"}>{errors.last_name.message}</small>
                            )}
                        </div>
                        <div className={"grid gap-2"}>
                            <Label htmlFor={"phone_number"} className={"after:content-['*'] after:ml-0.5 after:text-red-500 "}>Phone number</Label>

                            <PhoneInput
                                placeholder="Enter phone number"
                                country={"CM"}
                                value={getValues("phone_number")}
                                inputComponent={Input}
                                containerComponent={"div"}
                                className={"w-full text-md leading-tight text-gray-700  rounded appearance-none focus:outline-none focus:shadow-outline"}
                                onChange={(value) => {
                                    if (value) {
                                        setValue("phone_number", value.toString())
                                    }
                                }} />
                            {errors.phone_number && (
                                <small style={{ color: "red" }} className={"text-xs"}>{errors.phone_number.message}</small>
                            )}
                        </div>
                        <div className={"grid gap-2"}>
                            <Label htmlFor={"last_name"} className={"after:content-['*'] after:ml-0.5 after:text-red-500 "}>Password</Label>
                            <Input
                                placeholder="Enter you password here"
                                type={"password"}
                                className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"}
                                {...register("password")}
                            />
                            {errors.password && (
                                <small style={{ color: "red" }} className={"text-xs"}>{errors.password.message}</small>
                            )}
                        </div>
                        <div className={"grid gap-2"}>
                            <Label htmlFor={"avatar"}>Avatar</Label>
                            <div className={"flex items-center gap-1"}>
                                <Input
                                    placeholder="Profile picture"
                                    type={"file"}
                                    accept={"image/*"}
                                    className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"}

                                    onChange={(e) => {
                                        if (e.target.files) {
                                            const file = e.target.files[0];
                                            const url = URL.createObjectURL(file)
                                            setAvatarUrl(url)
                                            setAvatar(file);
                                        }
                                    }}
                                />
                                {avatar && (
                                    <Avatar >
                                    <AvatarImage src={avatarUrl} />
                                    <AvatarFallback>{getValues("username")}</AvatarFallback>
                                </Avatar>
                                )}
                                
                            </div>

                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button disabled={!isValid} type={"submit"} variant={"default"} className="w-full bg-black text-white rounded-md cursor-pointer">Sign Up</Button>
                    </CardFooter>
                    <div className="w-full">
                        <p className="text-center text-gray-500">Already have an account ? <Link className="font-bold text-black" href={"/auth/login"}>Login</Link> </p>
                    </div>

                </Card>
            </form>
      <h5 className="text-gray-500 text-base my-2">Copyright &copy; {new Date().getFullYear()}  </h5>

        </div>
    )
}

export default RegisterForm