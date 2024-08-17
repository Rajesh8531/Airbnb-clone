import React from 'react'
import { IconType } from 'react-icons'
interface CategoryInputProps {
    label : string,
    onClick : (value:any)=>void,
    icon : IconType,
    selected : boolean
}

const CategoryInput:React.FC<CategoryInputProps> = ({
    label,
    onClick,
    icon : Icon,
    selected
}) => {
  return (
    <div 
    className={`flex 
    flex-col 
    gap-3 
    p-4 
    col-span-1
    justify-center
    border-2
    rounded-xl
    cursor-pointer
    transition
    hover:text-black
    hover:border-black
    ${selected ? 'border-black' : 'border-neutral-200'}
    ${selected ? 'text-black' : 'text-neutral-500'}
    `}
    onClick={()=>onClick(label)}

    >
        <Icon size={26} />
        <p className='font-semibold'>{label}</p>
    </div>
  )
}

export default CategoryInput