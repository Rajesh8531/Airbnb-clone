'use client'
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
import Header from '../Header'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import qs from 'query-string'
import dynamic from 'next/dynamic'
import Calendar from '../inputs/Calendar'
import { Range } from 'react-date-range'
import Counter from '../inputs/Counter'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatISO } from 'date-fns'

const SearchModal = () => {

    const searchModal = useSearchModal()
    const [isLoading,setIsLoading] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    enum STEPS {
        LOCATION = 0,
        DATE = 1,
        INFO = 2
    }

    const [value,setValue] = useState<CountrySelectValue>()
    const [roomCount,setRoomCount] = useState(1)
    const [bathroomCount,setBathroomCount] = useState(1)
    const [guestCount,setGuestCount] = useState(1)
    const [dateRange,setDateRange] = useState<Range>({
        startDate:new Date(),
        endDate:new Date(),
        key : 'selection'
    })

    const [step,setStep] = useState(STEPS.LOCATION)

    const onNext = useCallback(()=>{
        setStep(prev=>prev+1)
    },[])

    const onBack = useCallback(()=>{
        setStep(prev=>prev-1)
    },[])

    const handleSubmit = useCallback(async()=>{
        if(step !== STEPS.INFO){
            return onNext()
        }

        let currentQuery = {}
        if(searchParams){
            currentQuery = qs.parse(searchParams.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue : value?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url : '/',
            query : updatedQuery
        },{skipNull:true})
        
        setStep(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)
    },[
        step,
        onNext,
        value,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        searchModal
    ])

    const actionLabel = useMemo(()=>{
        if(step == STEPS.INFO){
            return 'Search'
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step == STEPS.LOCATION){
            return undefined
        }

        return 'Back'
    },[step])

    const Map = useMemo(()=>dynamic(()=>import('../inputs/Map'),{ssr:false}),[value])
    let body = (
        <div className='flex flex-col gap-8'>
            <Header
            label='Where do you wanna go'
            secondarylabel='FInd the perfect location?'
            />
            <CountrySelect
            onChange={(value)=>setValue(value)}
            value={value}
            />
            <Map center={value?.latlng} />
        </div>
    )

    if(step == STEPS.DATE){
        body = (
        <div className='flex flex-col gap-8'>
            <Header
            label='When do you plan to go?'
            secondarylabel='Make sure everyone is free'
            />
            <Calendar
            onChange={value=>setDateRange(value.selection)}
            value={dateRange}
            />
        </div>
        )
    }

    if(step == STEPS.INFO){
        body = (
            <div className='flex flex-col gap-8'>
                <Header label='More information'
                secondarylabel='Find your perfect place!'
                />
                    <Counter
                    onChange={(value)=>setGuestCount(value)}
                    value={guestCount}
                    title='Guests'
                    secondaryTitle='How many guests are coming?'
                    />
                    <hr />
                    <Counter 
                    onChange={(value)=>setRoomCount(value)}
                    value={roomCount}
                    title='Rooms'
                    secondaryTitle='How many rooms do you need?'
                    />
                    <hr />
                    <Counter
                    onChange={(value)=>setBathroomCount(value)}
                    value={bathroomCount}
                    title='Bathrooms'
                    secondaryTitle='How many bathrooms do you need?'
                    />
            </div>
        )
    }
    

  return (
    <Modal 
        isOpen={searchModal.isOpen}
        title='Filters'
        disabled={isLoading}
        actionLabel={actionLabel}
        secondarActionLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
        onSubmit={handleSubmit}
        body={body}
        onClose={searchModal.onClose}
    />
  )
}

export default SearchModal