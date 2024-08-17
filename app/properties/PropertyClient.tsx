'use client'
import React, { useCallback, useState } from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import ListingCard from '../components/listings/ListingCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

interface PropertyClientProps {
    currentUser? : any,
    listings? : any
}

const PropertyClient:React.FC<PropertyClientProps> = ({
    currentUser,
    listings
}) => {

    const router = useRouter()
    const [deletingId,setDeletingId] = useState('')
    const [isLoading,setIsLoading] = useState(false)
  const onSubmit = useCallback((id:string)=>{
      setDeletingId(id)
      setIsLoading(true)
      axios.delete(`/api/listings/${id}`)
      .then(()=>{
          toast.success("Reservation Cancelled")
          router.refresh()
      })
      .catch(()=>{
          toast.error("Something went wrong")
      })
      .finally(()=>{
          setDeletingId('')
          setIsLoading(false)
      })
  },[router])
  return (
   <Container>
    <Header
    label='Properties'
    secondarylabel='Your properties are here!'
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
        {
            listings.map((listing:any)=>(
                <ListingCard
                data={listing}
                key={listing.id}
                actionId={listing.id}
                currentUser={currentUser}
                actionLabel={'Delete Listing'}
                disabled={deletingId == listing.id}
                onAction={onSubmit}
                />
            ))
        }
    </div>
   </Container>
  )
}

export default PropertyClient