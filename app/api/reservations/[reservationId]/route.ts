interface Iparams {
    reservationId? : string
}

import getCurrentUser from '@/app/actions/getCurrenUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function DELETE(request:Request,{params}:{params:Iparams}){
    const currentUser= await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {reservationId} = params

    if(!reservationId || typeof reservationId !== 'string'){
        return NextResponse.error()
    }

    const reservation = await prisma.reservation.deleteMany({
        where : {
            id : reservationId,
            OR : [
                {listing : {userId : currentUser.id}},
                {userId : currentUser.id}
            ]
        }
    })

    return NextResponse.json(reservation)
}