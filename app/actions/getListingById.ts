import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId : string
}
export default async function getListingById(params:IParams){
    const {listingId} = params

    if(!listingId || typeof listingId !== 'string'){
        return null
    }
    
    const listing = await prisma.listing.findUnique({
        where : {
            id : listingId
        },
        include : {
            user : true
        }
    })

    if(!listing){
        return null
    }

    return listing
}