import {withAuth} from "next-auth/middleware"

export type {NextMiddlewareWithAuth} from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: "/auth/login",
        signOut: "/auth"
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export const config = {
    matcher: [
        "/chats/:path*",
        "/friends/:path*",
        "/musics/:path*",
        "/channel/:path*",
    ]
}