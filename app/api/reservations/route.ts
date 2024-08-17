import getCurrentUser from '@/app/actions/getCurrenUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'


export async function POST(req:Request) {

    const currentUser = await getCurrentUser()
    if(!currentUser){
        return NextResponse.error()
    }

    const body = await req.json()

    const {
        startDate,
        endDate,
        totalPrice,
        listingId
    } = body

    if(!startDate || !endDate || !totalPrice || !listingId){
        return NextResponse.error()
    }


    const listingAndReservation = await prisma.listing.update({
        where : {
            id : listingId
        },
        data : {
            reservation : {
                create : {
                    endDate,
                    totalPrice: parseInt(totalPrice),
                    startDate,
                    userId : currentUser?.id
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}