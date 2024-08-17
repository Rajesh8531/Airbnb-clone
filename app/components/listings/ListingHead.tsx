import { Listing, User } from '@prisma/client'
import React from 'react'
import { IconType } from 'react-icons'
import Header from '../Header'
import useCountries from '@/app/hooks/useCountries'
import Image from 'next/image'
import HeartButton from '../inputs/HeartButton'
import getListingById from '@/app/actions/getListingById'

interface ListingHeadProps {
    title : string,
    currentUser : User | any,
    locationValue : string,
    imageSrc : string,
    id : string
}

const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    currentUser,
    locationValue,
    imageSrc,
    id
}) => {
  const {getByValue} = useCountries()
  const location = getByValue(locationValue)
  
  return (
    <>
      <Header
      label={title}
      secondarylabel={`${location?.region}, ${location?.label} `}
      />
      <div
      className='w-full
      h-[60vh]
      overflow-hidden
      relative
      rounded-xl
      '
      >
        <Image 
        src={imageSrc}
        fill
        alt='Listing'
        className='object-fit w-full
        '
        />
        <div className='absolute right-3 top-3'>
            <HeartButton
            currentUser={currentUser}
            listingId={id}
            />
        </div>
      </div>
    </>
  )
}

export default ListingHead