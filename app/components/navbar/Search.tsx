'use client'
import useCountries from '@/app/hooks/useCountries'
import useSearchModal from '@/app/hooks/useSearchModal'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {

    const searchModal = useSearchModal()
    const params = useSearchParams()
    const {getByValue} = useCountries()

    const locationValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')
    
    const locationLabel = useMemo(()=>{
        if(locationValue){
            return getByValue(locationValue as string)?.label
        }
        return 'AnyWhere'
    },[locationValue,getByValue])

    const durationLabel = useMemo(()=>{
        if(startDate && endDate){
            const start = new Date(startDate as string)
            const end = new Date(endDate as string)
            let diff = differenceInDays(end,start)

            if(diff == 0){
                diff=1
            }
            return `${diff} Days`
        }

        return 'Any Week'
    },[startDate,endDate])

    const guestLabel = useMemo(()=>{
        if(guestCount){
            return `${guestCount} Guests`
        }
        return 'Add Guests'
    },[guestCount])
  return (
    <div 
    onClick={searchModal.onOpen}
    className='
    py-2
    rounded-full
    cursor-pointer
    shadow-sm
    transition
    md:shadow-md
    md:w-auto
    w-full
    '>
        <div className='flex
        flex-row
        items-center
        justify-between
        '>
            <div className='
            px-6
            font-semibold
            text-sm
            '>
                {locationLabel}
            </div>
            <div className='
            hidden
            md:block
            font-semibold
            text-sm
            flex-1
            border-x-[1px]
            px-6'>
                {durationLabel}
            </div>
            <div className='
            pl-6
            pr-2
            flex
            flex-row
            items-center
            gap-3
            text-sm
            font-semibold
            text-gray-600
            '>
                <div className='hidden md:block'>{guestLabel}</div>
                 <div className='p-2 rounded-full bg-rose-500 text-white'>
                    <BiSearch size={18} />
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Search