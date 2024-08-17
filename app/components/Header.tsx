import React from 'react'
interface HeaderProps {
    label : string,
    secondarylabel?: string,
    center? : boolean
}

const Header:React.FC<HeaderProps> = ({
    label,
    secondarylabel,
    center
}) => {

  return (
    <div className={`${center ? 'text-center' : 'text-start'}`}>
        <div className='text-2xl font-semibold'>{label}</div>
        <div className='text-md text-gray-400 mt-2'>{secondarylabel}</div>
    </div>
  )
}

export default Header