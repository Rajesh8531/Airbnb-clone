'use client'

import useCountries from '@/app/hooks/useCountries'
import React from 'react'
import Select from 'react-select'

export type CountrySelectValue = {
  flag : string,
  value : string,
  latlng : number[],
  region : string,
  label : string
}

interface CountrySelectProps {
  value? : CountrySelectValue,
  onChange : (value:CountrySelectValue)=>void
}

const CountrySelect:React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const {getAll} = useCountries()
  return (
    <div>
      <Select
      value={value}
      onChange={(value)=>onChange(value as CountrySelectValue)}
      placeholder='Anywhere'
      isClearable
      options={getAll()}
      formatOptionLabel={(option:CountrySelectValue)=>(
        <div className='flex flex-row z-50 gap-3 items-center cursor-pointer'>
          <div >{option.flag}</div>
          <div >{option.label},
            <span className='text-neutral-500'> {option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control : ()=>'p-3 border-2 rounded-lg',
        input : ()=>'text-lg',
        option : ()=>'text-lg'
      }}

      theme={(theme)=>({
        ...theme,
        borderRadius : 6,
        colors : {
          ...theme.colors,
          primary : 'black',
          primary25 : '#ffe4e6'
        }
      })}
      />
    </div>
  )
}

export default CountrySelect     