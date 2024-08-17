import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId? : string,
    authorId? : string,
    userId? : string
}

export default async function getReservations(params:IParams){

   try { 
        let query:any = {}
        const {listingId,authorId,userId} = params

        if(listingId){
            query.listingId = listingId
        }

        if(userId){
            query.userId = userId
        }

        if(authorId){
            query.listing = {userId:authorId}
        }

        const reservations = await prisma.reservation.findMany({
            where : query,
            include : {
                listing : true
            },
            orderBy : {
                createdAt : 'desc'
            }
        })

        return reservations

    } catch(error:any){
        throw new Error(error)
    }
}