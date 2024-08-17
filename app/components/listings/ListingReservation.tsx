'use client'
import React from 'react'
import { Range } from 'react-date-range'
import Calendar from '../inputs/Calendar'
import Button from '../Button'

interface ListingReservationProps {
    totalPrice : number ,
    price : number,
    onChangeDate : (value:Range)=>void,
    dateRange : Range 
    onSubmit : ()=>void,
    disabled? : boolean,
    disabledDates : Date[]
}

const ListingReservation:React.FC<ListingReservationProps> = ({
    totalPrice,
    price,
    onChangeDate,
    dateRange,
    onSubmit,
    disabledDates,
    disabled
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
        <div className='flex flex-row items-center gap-1 p-4'>
            <div className='text-2xl font-semibold'>
                $ {price}
            </div>
            <div className='font-light text-neutral-600'>night</div>
        </div>
        <hr />
        <Calendar
        value = {dateRange}
        disabledDates={disabledDates}
        onChange={(value)=>onChangeDate(value.selection)}
        />
        <hr />
        <div className='p-4'>
            <Button
            label='Create Reservation'
            onClick={onSubmit}
            disabled={disabled}
            />
        </div>
        <div className='justify-between text-lg font-semibold flex flex-row items-center p-4'>
            <div>Total</div>
            <div>
                $ {totalPrice}
           </div>
        </div>
    </div>
  )
}

export default ListingReservation