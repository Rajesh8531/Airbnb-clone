import React from 'react'
import getCurrentUser from '../actions/getCurrenUser'
import getReservations from '../actions/getReservations'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import ReservationClient from './ReservationClient'


const ReservationPage = async () => {
    const currentUser = await getCurrentUser()
    const reservations = await getReservations({
        authorId : currentUser?.id
    })

    if(!currentUser){
      return (
            <Container>
                <EmptyState
                label='Unauthorized'
                secondaryLabel='Please Login'
                />
             </Container>)
    }

    if(reservations.length == 0){
        return (
            <Container>
                <EmptyState
                label='No Listings Found'
                secondaryLabel="Looks like you don't have listings"
                />
            </Container>
        )
    }

  return (
    <ReservationClient
    reservations={reservations}
    currentUser={currentUser}
    />
  )
}

export default ReservationPage