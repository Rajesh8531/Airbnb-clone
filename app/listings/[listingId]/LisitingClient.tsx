'use client'
import { categories } from '@/app/components/Categories'
import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'
import useLoginModal from '@/app/hooks/useLoginModal'
import { Reservation, User } from '@prisma/client'
import axios from 'axios'
import { eachDayOfInterval, differenceInCalendarDays} from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Range } from 'react-date-range'

interface LisitingClientProps {
    currentUser? : User | any,
    listing : any,
    reservations? : Reservation[]
}

const LisitingClient:React.FC<LisitingClientProps> = ({
    currentUser,
    listing,
    reservations = []
}) => {

    const category = useMemo(()=>{
        return categories.find(item=>item.label == listing.category)
    },[listing?.category])

    const initialDateRange = {
        startDate : new Date(),
        endDate : new Date(),
        key: 'selection'
    }

    const loginModal = useLoginModal()
    const router = useRouter()

    const disabledDates = useMemo(()=>{
        let dates: Date[] = []
        reservations.forEach(reservation=>{
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end : new Date(reservation.endDate)
            })

            dates = [...dates,...range]
        })
        return dates
    },[reservations])

    const [isLoading,setIsLoading] = useState(false)
    const [totalPrice,setTotalPrice] = useState(listing.price)
    const [dateRange,setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }

        setIsLoading(true)
        axios.post('/api/reservations',{
            totalPrice,
            startDate : dateRange.startDate,
            endDate : dateRange.endDate,
            listingId : listing?.id
        })
        .then(()=>{
            toast.success("Reserved!")
            setDateRange(initialDateRange)
            router.push('/trips')
        })
        .catch((error)=>{
            toast.error("Something went wrong")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[isLoading,listing?.id,currentUser,loginModal,totalPrice,dateRange,router])

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if(dayCount && listing?.price){
                setTotalPrice(dayCount * listing?.price)
            } else {
                setTotalPrice(listing?.price)
            }
        }

    },[dateRange,listing?.price])
  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <ListingHead
                title={listing.title}
                locationValue={listing.locationValue}
                id={listing.id}
                currentUser = {currentUser}
                imageSrc={listing.imageSrc}
                />
                <div className='grid grid-cols-1 md:grid-cols-7 gap-8'>
                    <ListingInfo
                    category={category}
                    listing={listing}
                    bathroomCount={listing.bathroomCount}
                    guestCount={listing.guestCount}
                    bedroomCount={listing.roomCount}
                    locationValue={listing.locationValue}
                    />
                    <div className='order-first
                    col-span-1
                    mb-10
                    md:order-last
                    md:col-span-3
                    '>
                        <ListingReservation
                        price={listing.price }
                        totalPrice={totalPrice}
                        onChangeDate={(value)=>setDateRange(value)}
                        dateRange={dateRange}
                        onSubmit={onCreateReservation}
                        disabled={isLoading}
                        disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>      
    </Container>
  )
}

export default LisitingClient