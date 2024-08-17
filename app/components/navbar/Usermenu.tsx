'use client'

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
    currentUser? : User | null
  }

const Usermenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const router = useRouter()

    const [isOpen,setIsOpen] = useState(false)

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()

    const onToggle = useCallback(()=>{
        setIsOpen(prev=>!prev)
    },[])

    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }

        rentModal.onOpen()
    },[loginModal,rentModal,registerModal])

  return (
    <div className='relative'>
    <div className='flex
    flex-row
    gap-3
    items-center
    rounded-full
    px-2
    cursor-pointer
    '>
        <div 
        onClick={onRent}
        className='
        hidden
        md:block
        cursor-pointer
        hover:bg-neutral-100
        text-sm
        font-semibold
        py-3
        px-4
        rounded-full
        
        transition
        '>
            Airbnb your home
        </div>
        <div
        onClick={onToggle}
        className='flex
        relative
        flex-row
        items-center
        p-4
        md:px-2
        md:py-1
        rounded-full
        border-[1px]
        border-neutral-200
        gap-3
        hover:shadow-md
        transition
        '>
            <AiOutlineMenu size={18} />
            <div className='hidden md:block'>
                <Avatar src={currentUser?.image as string} />
            </div>
        </div>
        {
                isOpen && (
                    <div className='absolute
                    w-[40vw]
                    md:w-3/4
                    top-12
                    right-0
                    overflow-hidden
                    shadow-md
                    rounded-xl
                    text-sm
                    bg-white
                    '>
                        <div className='flex flex-col cursor-pointer'>
                            {currentUser ? 
                            (<>
                                <MenuItem onClick={()=>router.push('/trips')} label='My trips' />
                                <MenuItem onClick={()=>router.push('/favorites')} label='My favorites' />
                                <MenuItem onClick={()=>router.push('/reservations')} label='My reservations' />
                                <MenuItem onClick={()=>router.push('/properties')} label='My properties' />
                                <MenuItem onClick={onRent} label='Airbnb my home' />
                                <hr />
                                <MenuItem onClick={()=>signOut()} label='Log out' />
                            </>
                        ) :(<>
                                <MenuItem onClick={registerModal.onOpen} label='Signup' />
                                <MenuItem onClick={loginModal.onOpen} label='Login' />
                            </>)}
                        </div>
                    </div>
                )
            }
    </div>
    </div>
  )
}

export default Usermenu