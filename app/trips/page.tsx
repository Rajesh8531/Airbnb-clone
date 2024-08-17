import React from 'react'
import TripsClient from './TripsClient'
import Container from '../components/Container'
import getCurrentUser from '../actions/getCurrenUser'
import getReservations from '../actions/getReservations'
import EmptyState from '../components/EmptyState'

const Home = async () => {

    const currentUser = await getCurrentUser()
    const reservations = await getReservations({userId:currentUser?.id})

    if(!currentUser){
      return <EmptyState
      label='Unauthorized'
      secondaryLabel='Please login'
      />
    }

    if(reservations.length == 0){
      return <EmptyState
              label="No trips found"
              secondaryLabel="Looks like you haven't reserved any trips"
              />
    }
    
  return (
    <Container>
        <TripsClient
        reservations={reservations}
        currentUser={currentUser}
        />
    </Container>
  )
}

export default Home