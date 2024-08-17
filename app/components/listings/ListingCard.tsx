'use client'
import { format } from 'date-fns'
import { Listing,Reservation, User } from '@prisma/client'
import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import HeartButton from '../inputs/HeartButton'
import useCountries from '@/app/hooks/useCountries'
import Button from '../Button'

interface ListingCardProps {
  data : any,
  reservation? :  any,
  onAction? : (id:string)=>void,
  actionLabel? : string,
  disabled? : boolean,
  currentUser? : User | any,
  actionId? : string
}

const ListingCard:React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  actionLabel,
  disabled,
  actionId = '',
  currentUser
}) => {

  const price = useMemo(()=>{
    if(reservation){
      return reservation.totalPrice
    }
    return data.price
  },[reservation,data])

  const {getByValue} = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(()=>{
    if(disabled){
      return 
    }
    onAction?.(actionId)
  },[disabled,onAction,actionId])

  const reservationDate = useMemo(()=>{
    if(!reservation){
      return
    }
    const startDate = new Date(reservation.startDate)
    const endDate = new Date(reservation?.endDate)
   return `${format(startDate,'PP')} - ${format(endDate,'PP')}`
  },[reservation])

  const router = useRouter()

  return (
    <div
    className='col-span-1 cursor-pointer group '
    >
      <div className='flex
      flex-col
      gap-2
      w-full
      '>
        <div
        onClick={()=>router.push(`/listings/${data.id}`)}
        className='
        relative 
        aspect-square 
        object-cover
        w-full
        overflow-hidden
        rounded-xl
        '>
          <Image
          fill
          className='object-cover
          h-full
          w-full
          group-hover:scale-110
          transition
          '
          src={data.imageSrc}
          alt='Listing'
          />
          <div className='absolute z-10 top-3 right-3'>
            <HeartButton
            listingId={data.id}
            currentUser ={currentUser}
            />
          </div>
        </div>
        <div className='text-semibold text-lg'>
            {location?.region}, {location?.label}
        </div>
        <div className='text-neutral-500 font-light'>
            {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
            <div className='font-semibold'>
                $ {price}
            </div>
            {!reservation && (
              <div className='font-light'>
                night
              </div>
            )}
        </div>
        {
          onAction && actionLabel && (
            <div className='z-10'>
              <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ListingCard