
import useFavorite from '@/app/hooks/useFavorite'
import { Listing, User } from '@prisma/client'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
    currentUser? :  User,
    listingId : string
}

const HeartButton:React.FC<HeartButtonProps> = ({
    currentUser,
    listingId
}) => {
    const {hasFavorited,toggleFavorite} = useFavorite({currentUser,listingId})
    
  return (
    <div 
    onClick={toggleFavorite}
    className='relative z-10 hover:opaicty-80 transition cursor-pointer'>
        <AiOutlineHeart size={28} className='absolute text-white -right-[2px] -top-[2px]' />
        <AiFillHeart size={24} className={`${hasFavorited ? 'text-rose-500' : 'text-neutral-500'} opacity-80  absolute right-0`} />
    </div>
  )
}

export default HeartButton