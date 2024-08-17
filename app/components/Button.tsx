import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
    label : string,
    disabled? : boolean,
    onClick : (e:React.MouseEvent<HTMLButtonElement>)=>void,
    outline? : boolean,
    small? : boolean,
    icon? : IconType
}

const Button:React.FC<ButtonProps> = ({
    label,
    disabled,
    onClick,
    outline,
    small,
    icon : Icon
}) => {
  return (
    <button
    disabled={disabled} 
    onClick={onClick}
    className={`
    relative
    cursor-pointer
    transition
    disabled:cursor-not-allowed
    disabled:opacity-70
    border-2
    rounded-md
    text-center
    hover:opacity-80
    w-full
    ${outline ? 'bg-white' : 'bg-rose-500'}
    ${outline ? 'border-black' : 'border-rose-500'}
    ${outline ? 'text-black' : 'text-white'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'px-3' : 'px-5'}
    ${small ? 'font-light' : 'font-semibold'}
    ${small ? 'text-sm' : 'text-lg'}
    `}>
        {label}
        {Icon && (<Icon className='
        absolute left-3 top-3
        ' size={24} />)}
    </button>
  )
}

export default Button