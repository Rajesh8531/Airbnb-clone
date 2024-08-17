'use client'
import React from 'react'
import { FieldValues, UseFormRegister,FieldErrors } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface InputProps {
  id : string,
  label : string,
  type? : string,
  register : UseFormRegister<FieldValues>,
  errors : FieldErrors,
  formatPrice? : boolean,
  disabled? : boolean,
  required? : boolean
}

const Input:React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  register,
  errors,
  formatPrice,
  disabled,
  required
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar size={24} className='absolute left-2 top-5 text-neutral-700' />
      )}
      <input 
      id={id}
      disabled={disabled}
      {...register(id,{required})}
      className={`
      peer
      p-4
      pt-6
      border-2
      outline-none
      focus:outline-none
      w-full
      rounded-md
      font-light
      transition
      disabled:opacity-70
      disabled:cursor-not-allowed
      ${formatPrice ? 'pl-9' : 'pl-4'}
      ${errors[id] ? 'border-rose-500' : 'border-neutral-500'}
      ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
      `}
      placeholder=' '
      type={type} />
      <label
      className={`font-semibold
      absolute
      ${ formatPrice ? 'left-9' : 'left-4'}
      ${ errors[id] ? 'text-rose-500' : 'text-black'}
      origin-[0]
      top-5
      -translate-y-3
      scale-75
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      duration-150
      transition
      transform
      text-md
      z-10
      `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input