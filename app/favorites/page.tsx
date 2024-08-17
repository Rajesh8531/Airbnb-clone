import React from 'react'
import getCurrentUser from '../actions/getCurrenUser'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoriteClient from './FavoriteClient'

const FavoritesHomePage = async () => {
    const currentUser = await getCurrentUser()
    const listings = await getFavoriteListings()

    if(!currentUser){
        <Container >
            <EmptyState
            label='Unauthorized'
            secondaryLabel='Please Log in'
            />
        </Container>
    }

    if(!listings){
        <Container>
            <EmptyState
            label='No favorites found'
            secondaryLabel='Looks like you have no favorite listings'
            />
        </Container>
    }
  return (
    <FavoriteClient
    listings={listings}
    currentUser={currentUser}
    />
  )
}

export default FavoritesHomePage