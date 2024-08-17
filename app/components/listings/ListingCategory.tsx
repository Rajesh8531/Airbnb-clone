import React from 'react'
import { IconType } from 'react-icons'

interface ListingCategoryProps {
    icon : IconType,
    label : string,
    description : string
}

const ListingCategory:React.FC<ListingCategoryProps> = ({
    icon : Icon,
    label,
    description
}) => {
  return (
    <div className='flex flex-row gap-2'>
        <Icon size={40} className='text-neutral-700' />
        <div className='flex flex-col text-sm gap-1'>
            <div className='text-black'>{label}</div>
            <div className='text-neutral-500'>{description}</div>
        </div>
    </div>
  )
}

export default ListingCategory