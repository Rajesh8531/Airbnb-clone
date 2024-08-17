import { Listing } from '@prisma/client'

import React from 'react'
import Header from '../components/Header'
import Container from '../components/Container'
import ListingCard from '../components/listings/ListingCard'

interface FavoriteClientProps {
    listings? : Listing[] | any,
    currentUser? : any
}

const FavoriteClient:React.FC<FavoriteClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
        <Header
        label='Favorites'
        secondarylabel='Your favorites here!'
        />
        <div className='mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        '>
            {listings.map((listing:any)=>(
                <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default FavoriteClient