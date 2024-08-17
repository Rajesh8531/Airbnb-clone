import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrenUser'

interface IParams {
    listingId? : string
}

export async function POST(
    req:Request,
    {params} : {params:IParams}
    ){

    try {
    
    const {listingId} = params

    const currentUser = await getCurrentUser()

    if(!currentUser){
        throw new Error("Not Signed In")
    }

    if(!listingId || typeof listingId !== 'string'){
        throw new Error("Invalid Credentials")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds.push(listingId as string)

    const user = await prisma.user.update({
        where : {
            id : currentUser?.id
        },
        data : {
            favoriteIds
        }
    })

    return NextResponse.json(user)

    } catch (error) {
          console.log(error)
          NextResponse.error()  
    }
}

export async function DELETE(
    req:Request,
    {params} : {params:IParams}
    ){

    try {
    
    const {listingId} = params

    const currentUser = await getCurrentUser()

    if(!currentUser){
        throw new Error("Not Signed In")
    }

    if(!listingId || typeof listingId !== 'string'){
        throw new Error("Invalid ID")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter(id=>id!==listingId)

    const user = await prisma.user.update({
        where : {
            id : currentUser?.id
        },
        data : {
            favoriteIds
        }
    })

    return NextResponse.json(user)

    } catch (error) {
          console.log(error)
          NextResponse.error()  
    }
}