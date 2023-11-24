import NextAuth from "next-auth";
import {NextAuthUserType} from "@/types/index";

declare module "next-auth" {
    interface Session {
        user: NextAuthUserType
    }
}