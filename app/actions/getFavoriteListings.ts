import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrenUser'

export default async function getFavoriteListings(){

    try {const currentUser = await getCurrentUser()

    if(!currentUser){
        return null
    }

    const listings = await prisma.listing.findMany({
        where : {
            id : {
                in : currentUser.favoriteIds
            }
        }
    })

    return listings}
    catch (error:any){
        throw new Error(error)
    }
}