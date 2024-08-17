import Container from '@/app/components/Container'
import React from 'react'
import LisitingClient from './LisitingClient'
import getCurrentUser from '@/app/actions/getCurrenUser'
import getListingById from '@/app/actions/getListingById'
import getReservations from '@/app/actions/getReservations'

interface Iparams {
    listingId : string
}

const page = async ({params}:{params:Iparams}) => {

    const {listingId} = params
    const currentUser = await getCurrentUser()
    const listing =await getListingById({listingId})
    const reservations = await getReservations(params)

  return (
      <>
          <LisitingClient
          currentUser={currentUser}
          listing={listing}
          reservations={reservations}
          />
      </>
  )
}

export default page