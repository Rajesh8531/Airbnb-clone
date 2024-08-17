'use client'
import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Header from '../Header'
import Input from '../inputs/Input'
import {FieldValues,SubmitHandler, useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
import Button from '../Button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginModal = () => {

    const [isLoading,setIsLoading] = useState(false)
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            email : '',
            password : ''
        }
    })

    const onToggle = useCallback(()=>{
        loginModal.onClose()
        registerModal.onOpen()
    },[loginModal,registerModal])

    const onSubmit : SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)

        signIn('credentials',{...data,redirect:false})
        .then((callback)=>{
            setIsLoading(false)
            if(callback?.ok){
                toast.success("Logged in")
                router.refresh()
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback?.error)
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-2'>
            <Header label='Welcome to Airbnb' secondarylabel='Login your account' />
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
     onClose={loginModal.onClose} 
     disabled={isLoading} 
     isOpen={loginModal.isOpen}
     title='Login'
     body={bodyContent}
     actionLabel='Continue'
     footer={footer}
     />
    </>
  )
}

export default LoginModal