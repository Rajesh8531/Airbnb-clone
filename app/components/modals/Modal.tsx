'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../Header'
import { IoClose } from 'react-icons/io5'
import Button from '../Button'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
    isOpen : boolean,
    body? : React.ReactElement,
    footer? : React.ReactElement,
    onSubmit : ()=>void,
    onClose : ()=>void,
    actionLabel : string,
    secondarActionLabel? : string,
    secondaryAction? : ()=>void ,
    title : string,
    disabled : boolean
}

const Modal:React.FC<ModalProps> = ({
    isOpen,
    body,
    footer,
    onClose,
    onSubmit,
    actionLabel,
    secondarActionLabel,
    secondaryAction,
    title,
    disabled
}) => {

    const [showModal,setShowModal] = useState(isOpen)

    useEffect(()=>{
        setShowModal(isOpen)
    },[isOpen])

    const handleClose = useCallback(()=>{
        if(disabled){
            return
        }

        setShowModal(false)
        setTimeout(()=>{
            onClose()
        },150)
    },[onClose,disabled])

    const handleAction = useCallback(()=>{
        if(disabled){
            return null
        }

        onSubmit()
    },[onSubmit])

    const handleSecondaryAction = useCallback(()=>{
        if(disabled || !secondaryAction){
            return null
        }

        secondaryAction()
    },[secondaryAction,disabled])

    if(!isOpen){
        return null
    }


  return (
    <div className='fixed z-50
    flex 
    items-center
    justify-center
    overflow-x-hidden
    overflow-y-auto
    inset-0
    bg-neutral-800/70
    '>
        <div className='
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        h-full
        md:h-auto
        lg:h-auto
        outline-none
        focus:outline-none
        '>
            <div className={`
                flex 
                flex-col
                h-full
                 bg-white 
                 rounded-md
                 translate
                 duration-300
                 ${showModal ? 'opacity-100' : 'opacity-0'}
                 ${showModal ? 'translate-y-0' : 'translate-y-full'}
                 `}>
                {/* {CONTENT} */}
                {/* TITLE */}
                <div className='p-6 flex border-b-[1px] rounded-t-md relative items-center justify-center'>
                    <div onClick={handleClose} className='absolute left-3 cursor-pointer'>
                        <IoMdClose size={24} />
                    </div>
                    <div className='text-xl font-semibold'>
                            {title}
                    </div>
                </div>
                {/* BODY */}
                <div className='p-6'>
                    {body}
                </div>

                {/* FOOTER */}
                <div className='flex flex-col gap-4 p-6'>
                    <div className='flex flex-row gap-2 '>
                        { secondaryAction && (<Button label={secondarActionLabel as string} disabled={disabled} onClick={handleSecondaryAction} outline />)}
                        <Button disabled={disabled}  onClick={handleAction} label={actionLabel} />
                    </div>
                    {footer}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal