import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: AuthOptions = {
    providers: [

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'supports@turl.com'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '************'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials');
                }

                const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/accounts/login/",{
                    method:"POST",
                    body:JSON.stringify({email:credentials.email,password:credentials.password}),
                    headers: { "Content-Type": "application/json" }
                })

                const resData = await res.json();

                const {data} = resData

                if(res.ok && data){

                    return Promise.resolve(data)
                }

                return Promise.resolve(null)
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/auth'
    },
    debug:false, //process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",

    },
    secret: process.env.NEXTAUTH_SCRET,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }