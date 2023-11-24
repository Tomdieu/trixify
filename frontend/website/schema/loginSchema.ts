import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(4, { message: "Password  must contain atleast 8 character(s)" }).max(100, { message: "Password should be less than 100 character(s)" })
})

export type loginSchemaType = z.infer<typeof loginSchema>