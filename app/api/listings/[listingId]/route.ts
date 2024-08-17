import getCurrentUser from "@/app/actions/getCurrenUser"
import { NextResponse } from "next/server"
import prisma from '@/app/libs/prismadb'

interface Params {
    listingId? : string
}
export const DELETE = async (req:Request,{params}:{params:Params})=>{

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {listingId} = params
    console.log(listingId,"LISTING ID")

    if(!listingId || typeof listingId !== 'string'){
        throw new Error("Invalid Id")
    }

    const listing = await prisma.listing.delete({
        where : {
            id: listingId,
            userId : currentUser.id
        }
    })

    return NextResponse.json(listing)
}