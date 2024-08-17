'use client'
import React, { useCallback, useState } from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import ListingCard from '../components/listings/ListingCard'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { User } from '@prisma/client'

interface ReservationClientProps {
  reservations? : any,
  currentUser? : any
}

const ReservationClient:React.FC<ReservationClientProps> = ({
  reservations = [],
  currentUser
}) => {

  const [isLoading,setIsLoading] = useState(false)
  const [deletingId,setDeletingId] = useState('')
  const router = useRouter()
  const onSubmit = useCallback((id:string)=>{
      setIsLoading(true)
      setDeletingId(id)
      axios.delete(`/api/reservations/${id}`)
      .then(()=>{
          toast.success("Reservation Cancelled")
          router.refresh()
      })
      .catch(()=>{
          toast.error("Something went wrong")
      })
      .finally(()=>{
          setIsLoading(false)
          setDeletingId('')
      })
  },[router])

  return (
    <Container>
      <Header
      label='Reservations'
      secondarylabel='Bookings on your property'
      />
      <div className='grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
      mt-10
      '>
        {reservations.map((reservation:Record<string,any>)=>(
          <ListingCard
          data={reservation.listing}
          actionLabel='Cancel'
          disabled={deletingId === reservation.id}
          reservation={reservation}
          onAction={onSubmit}
          actionId={reservation.id}
          currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationClient