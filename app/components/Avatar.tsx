import Image from 'next/image'
import React from 'react'
interface AvatarProps {
  src? : string
}

const Avatar:React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <Image src={src ? src : '/images/placeholder.png'} className='rounded-full' width={30} height={30} alt='Avatar' />
  )
}

export default Avatar