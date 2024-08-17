import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { AuthOptions } from "next-auth";
import prisma from '@/app/libs/prismadb'
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOptions :AuthOptions = ({
    adapter : PrismaAdapter(prisma),
    providers : [
        Github({
            clientId : process.env.GITHUB_ID as string,
            clientSecret : process.env.GITHUB_SECRET as string
        }),
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name : 'credentials',
            credentials : {
                email : {name : 'email',type : 'text'},
                password : {name : 'password',type : 'password'}
            },
            async authorize(credientials){
                if(!credientials?.email || !credientials?.password){
                    throw new Error("Invalid Credentials")
                }
                
                const currentUser = await prisma.user.findUnique({
                    where : {
                        email : credientials?.email
                    }
                })

                if(!currentUser || !currentUser?.hashedPassword){
                    throw new Error('Invalid Credentials')
                }
                const isCorrectPassword = await bcrypt.compare(credientials.password,currentUser?.hashedPassword)

                if(!isCorrectPassword){
                    throw new Error("Invaid Credentials")
                }

                return currentUser
            }
        })
    ],
    session : {
        strategy : 'jwt'
    },
    pages : {
        'signIn' : "/"
    },
    secret : process.env.NEXTAUTH_SECRET,
    debug : process.env.NODE_ENV === 'development'
})

export default nextAuth(authOptions)