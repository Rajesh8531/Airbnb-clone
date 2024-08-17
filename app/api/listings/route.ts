import getCurrentUser from '@/app/actions/getCurrenUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (req:Request)=>{

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }
    const body = await req.json()
    const {
        category,
        location,
        imageSrc,
        guestCount,
        roomCount,
        bathroomCount,
        price,
        title,
        description
    } = body


    const listing = await prisma.listing.create({
        data : {
            category,
            locationValue : location.value,
            imageSrc,
            guestCount,
            roomCount,
            bathroomCount,
            price : parseInt(price,10),
            title,
            description,
            userId : currentUser.id
        }
    })

    return NextResponse.json(listing)
}
