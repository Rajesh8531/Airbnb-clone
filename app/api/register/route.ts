import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'

export async function POST(request:NextRequest){
    const {email,password,name} = await request.json()

    const hashedPassword = await bcrypt.hash(password,12)

    const user = await prisma.user.create({
        data : {
            name,
            hashedPassword,
            email
        }
    })

    return NextResponse.json(user)
}