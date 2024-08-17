'use client'
import { Listing, User } from '@prisma/client'
import React, { useMemo } from 'react'
import { IconType } from 'react-icons'
import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'
import useCountries from '@/app/hooks/useCountries'
import dynamic from 'next/dynamic'

interface ListingInfoProps {
    category : {
        icon : IconType,
        label : string,
        description : string
    } | undefined,
    listing : Listing & {
        user : User
    },
    bathroomCount : number,
    locationValue : string,
    guestCount : number,
    bedroomCount : number
}

const ListingInfo:React.FC<ListingInfoProps> = ({
    category,
    listing,
    bathroomCount,
    locationValue,
    guestCount
}) => {

    const {getByValue} = useCountries()

    const location = getByValue(locationValue)
    const Map =useMemo(()=>dynamic(()=>import('../inputs/Map'),{ssr:false}),[])
  return (
    <div className='flex flex-col gap-8 col-span-4'>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2'>
                <div className='text-xl font-semibold'>Hosted By {listing.user.name}</div>
                <Avatar src={listing.user.image as string} />
            </div>
            <div className='flex flex-row gap-2 text-sm text-neutral-500'>
                <div>{guestCount} guests</div>
                <div>{listing.roomCount} rooms</div>
                <div>{bathroomCount} bathrooms</div>
            </div>
        </div>
        <hr />
        <ListingCategory
        label={category?.label as string}
        icon={category?.icon as IconType}
        description={category?.description as string}
        />
        <hr />
        <div className='text-neutral-500 font-semibold' >{listing.description}</div>
        <hr />
        <Map center={location?.latlng} />
    </div>
  )
}

export default ListingInfo