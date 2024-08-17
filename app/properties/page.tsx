import React from 'react'
import getCurrentUser from '../actions/getCurrenUser'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import getListings from '../actions/getListings'
import PropertyClient from './PropertyClient'

const Home =async () => {

    const currentUser = await getCurrentUser()
   
    if(!currentUser){
        return (
            <Container >
                <EmptyState
                label='Unauthorized'
                secondaryLabel='Please Login'
                />
            </Container>
        )
    }

    const listings = await getListings({userId:currentUser.id})

    if(listings.length == 0){
      return (
          <Container >
              <EmptyState
              label='No Properties'
              secondaryLabel='Looks like you do not have any properties!'
              />
          </Container>
      )
  }


  return (
    <PropertyClient
    currentUser={currentUser}
    listings={listings}
    />
  )
}

export default Home