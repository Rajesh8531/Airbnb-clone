import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
interface CounterProps {
    value : number,
    onChange : (value:number)=>void,
    title : string,
    secondaryTitle : string
}

const Counter:React.FC<CounterProps> = ({
    value,
    onChange,
    title,
    secondaryTitle
}) => {

    const onAdd = useCallback(()=>{
        onChange(value+1)
    },[value,onChange])

    const onMinus = useCallback(()=>{
        if(value == 1){
            return value
        }
        onChange(value-1)
    },[value,onChange])

  return (
    <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
            <div className='font-semibold text-lg'>{title}</div>
            <div className='text-neutral-500 text-sm'>{secondaryTitle}</div>
        </div>
        <div className='flex flex-row gap-4 items-center'>
            <div onClick={onAdd} className='w-10 h-10 border-[1px] 
            rounded-full
            cursor-pointer
            hover:shadow-md
            flex
            justify-center
            items-center
            text-neutral-700
            '>
                <AiOutlinePlus size={20} />
            </div>
            <div className='font-light'>
                {value}
            </div>
            <div onClick={onMinus}  className='w-10 h-10 border-[1px] 
            rounded-full
            cursor-pointer
            hover:shadow-md
            flex
            justify-center
            items-center
            text-neutral-700
            '>
                <AiOutlineMinus size={20} />
            </div>
        </div>
    </div>
  )
}

export default Counter