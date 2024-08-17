'use client'
import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Header from '../Header'
import Input from '../inputs/Input'
import {FieldValues,SubmitHandler, useForm} from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Button from '../Button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {

    const [isLoading,setIsLoading] = useState(false)
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name : '',
            email : '',
            password : ''
        }
    })

    const onToggle = useCallback(()=>{
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal,registerModal])

    const onSubmit : SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)

        axios.post('/api/register',data)
        .then(()=>{
            registerModal.onClose()
            toast.success("Success")
        })
        .catch(error=>{
            console.log(error)
            toast.error("Something went wrong")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-2'>
            <Header label='Welcome to Airbnb' secondarylabel='Create Your account' />
            <Input 
                errors={errors} 
                register={register} 
                disabled={isLoading} 
                label='Name'
                id='name'
                required
                />
            <Input 
                errors={errors} 
                register={register} 
                disabled={isLoading} 
                label='Email'
                id='email'
                type='email'
                required
                />
            <Input 
                errors={errors} 
                register={register} 
                disabled={isLoading} 
                label='Password'
                id='password'
                type='password'
                required
                />
        </div>
    )

    const footer = (
        <div className='flex flex-col gap-2'>
            <Button disabled={isLoading} onClick={()=>signIn('google',{redirect : false})} label='Continue with Google' outline icon={FcGoogle} />
            <Button disabled={isLoading} onClick={()=>signIn('github',{redirect : false})} label='Continue with Github' outline icon={AiFillGithub} />
            <div className='flex flex-row gap-2 justify-center'>
                <div>Already have an account?</div>
                <div onClick={onToggle} className='text-gray-500 cursor-pointer hover:underline'> Sign in here!</div>
            </div>
        </div>
    )

  return (
    <>
     <Modal 
     onSubmit={handleSubmit(onSubmit)}
     onClose={registerModal.onClose} 
     disabled={isLoading} 
     isOpen={registerModal.isOpen}
     title='Register'
     body={bodyContent}
     actionLabel='Continue'
     footer={footer}
     />
    </>
  )
}

export default RegisterModal