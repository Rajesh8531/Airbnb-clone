'use client'
import React from 'react'
import Container from './Container'
import CategoryBox from './CategoryBox'
import { AiFillAppstore } from 'react-icons/ai'
import { usePathname, useSearchParams } from 'next/navigation'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'

export const categories = [
    {
        label : 'Beach',
        icon : TbBeach,
        description : 'This property is close to the beach!'
    },
    {
        label : 'Windmills',
        icon : GiWindmill,
        description : 'This property has windmils!'
    },
    {
        label : 'Modern',
        icon : MdOutlineVilla,
        description : 'This property is modern!'
    },
    {
        label : 'Countryside',
        icon : TbMountain,
        description : 'This property is in the countryside!'
    },
    {
        label : 'Pools',
        icon : TbPool,
        description : 'This property has a pool!'
    },
    {
        label : 'Islands',
        icon : GiIsland,
        description : 'This property is close to a lake!'
    },
    {
        label : 'Lake',
        icon : GiBoatFishing,
        description : 'This property is close to a lake!'
    },
    {
        label : 'Skiing',
        icon : FaSkiing,
        description : 'This property has skiing activities!'
    },
    {
        label : 'Castle',
        icon : GiCastle,
        description : 'This property is in a castle!'
    },
    {
        label : 'Camping',
        icon : GiForestCamp,
        description : 'This property has camping activities!'
    },
    {
        label : 'Arctic',
        icon : BsSnow,
        description : 'This property has camping activities!'
    },
    {
        label : 'Cave',
        icon : GiCaveEntrance,
        description : 'This property is in a cave!'
    },
    {
        label : 'Desert',
        icon : GiCactus,
        description : 'This property is in the desert!'
    },
    {
        label : 'Barns',
        icon : GiBarn,
        description : 'This property is in the barn!'
    },
    {
        label : 'Lux',
        icon : IoDiamond,
        description : 'This property is Luxurious!'
    }

]

const Categories = () => {


    const pathname = usePathname()
    const params = useSearchParams()

    const mainPage = pathname == '/'
    if(!mainPage){
        return null
    }

  return (
    <Container>
        <div className='flex
        pt-4
        flex-row
        gap-2
        items-center
        justify-between
        overflow-x-auto
        '>
            {
                categories.map((category)=><CategoryBox
                key={category.label}
                label={category.label}
                icon = {category.icon}
                selected={params?.get('category') == category.label}
                />)
            }
        </div>
    </Container>
  )
}

export default Categories