

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import Usermenu from './Usermenu'
import { User } from '@prisma/client'
import { SafeUser } from '@/app/types'
import Categories from '../Categories'

interface NavBarProps {
  currentUser? : User | any
}

const Navbar:React.FC<NavBarProps> = ({
  currentUser
}) => {

  return (
    <div className='w-full bg-white fixed z-50 shadow-sm '>
        <div className='
        py-4
        border-b-[1px]
        '>
            <Container>
                <div 
                className='
                w-full
                flex
                flex-row 
                gap-3
                md:gap-0
                items-center
                justify-between
                '>
                   <Logo /> 
                    <Search />
                    <Usermenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar