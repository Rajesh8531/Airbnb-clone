'use client'

import { Listing, Reservation, User } from '@prisma/client'
import React, { useCallback, useState } from 'react'
import ListingCard from '../components/listings/ListingCard'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'

interface TripsClientProps {
    reservations? : any ,
    currentUser? : User | any
}

const TripsClient:React.FC<TripsClientProps> = ({
    reservations = [],
    currentUser
}) => {

    const router = useRouter()

    const [deletingId,setDeletingId] = useState('')

    const [isLoading,setIsLoading] = useState(false)

    const onSubmit = useCallback((id:string)=>{
        setDeletingId(id)
        setIsLoading(true)

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
    <>
    <Header
    label='Trips'
    secondarylabel="Where You've been and where you're going"
    />
    <div
    className='mt-10 grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    '
    >
        {reservations.map((reservation:Record<string,any>)=>{
            return (
            <ListingCard
            actionId={reservation.id}
            data={reservation?.listing }
            actionLabel='Cancel Reservation'
            currentUser={currentUser}
            key={reservation.id}
            reservation={reservation}
            disabled={isLoading}
            onAction={onSubmit}
            />
        )})}
    </div>
    </>
  )
}

export default TripsClient