'use client'
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Header from '../Header'
import { categories } from '../Categories'
import CategoryInput from '../inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const RentModal = () => {

    const rentModal = useRentModal()
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    enum STEPS {
        CATEGORY = 0,
        LOCATION = 1,
        INFO = 2,
        IMAGES = 3,
        DESCRIPTION = 4,
        PRICE = 5
    }

    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState : {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues : {
            category : '',
            location : null,
            guestCount : 1,
            roomCount : 1,
            bathroomCount : 1,
            imageSrc : '',
            price : 1,
            title : '',
            description : ''
        }
    })

    const setCustomValue = (id:string,value:any)=>{
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true
        })
    }

    const [step,setStep] = useState(STEPS.CATEGORY)

    const onNext = ()=>{
        setStep(value => value+1)
    }

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        if(step !== STEPS.PRICE){
            return onNext()
        }
        setIsLoading(true)

        axios.post('/api/listings',data)
        .then(()=>{
            toast.success("Listing Created")
            router.refresh()
            rentModal.onClose()
            reset()
        })
        .catch((error)=>{
            toast.error('Something went wrong')
            console.log(error)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const onBack = ()=>{
        setStep(value=>value-1)
    }

    const actionLabel = useMemo(()=>{
        if(step === STEPS.PRICE){
            return 'Create'
        }
        return 'Next'
    },[step])

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')


    const Map = useMemo(()=>dynamic(()=>import('../inputs/Map'),{ssr:false}),[location])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return ''
        }
        return 'Back'
    },[step])

    let body = (
    <>
        <div className='flex flex-col gap-8'>
            <Header label='Which of these best describes your place?'
            secondarylabel='Pick a category'
            />
            <div className='grid
            grid-cols-1 
            md:grid-cols-2
            max-h-[30vw]
            overflow-y-auto
            gap-3
            '>
                {categories.map(cat=>
                <CategoryInput
                key={cat.label}
                onClick={(value)=>setCustomValue('category',value)}
                label={cat.label}
                icon={cat.icon}
                selected={category == cat.label}
                />)}
            </div>
        </div>
    </>
    )

    if (step == STEPS.LOCATION){
        body = (
            <div className='flex flex-col gap-8'>
                <Header label='Where is your place located?'
                secondarylabel='Help guests find you!'
                />
                <CountrySelect
                value={location}
                onChange={(value)=>setCustomValue('location',value)}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if(step == STEPS.INFO){
        body = (
            <div className='flex flex-col gap-8'>
                <Header
                label='Share some basics about your place'
                secondarylabel='What amenities do you have?'
                />
                <Counter 
                value={guestCount} 
                onChange={(value)=>setCustomValue('guestCount',value)} 
                title='Guests'
                secondaryTitle='How many guests do you allow?'
                />
                <hr />
                <Counter 
                value={roomCount} 
                onChange={(value)=>setCustomValue('roomCount',value)}
                title='Rooms'
                secondaryTitle='How many rooms do you have?'
                />
                <hr />
                <Counter 
                value={bathroomCount} 
                onChange={(value)=>setCustomValue('bathroomCount',value)}
                title='BathRooms'
                secondaryTitle='How many bathrooms do you have?'
                />
                <hr />
            </div>
        )
    }

    if(step == STEPS.IMAGES){
        body = (
            <div className='flex flex-col gap-8'>
                <Header
                label='Add a photo of your place'
                secondarylabel='Show guests what your place looks like'
                />
                <ImageUpload 
                value={imageSrc}
                onChange={(value)=>setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }

    if(step == STEPS.DESCRIPTION){
        body = (
            <div className='flex flex-col gap-8'>
                <Header
                    label='How would you describe your place?'
                    secondarylabel='Short and sweet works best!'
                />
                <Input
                id='title'
                errors={errors}
                label='Title'
                disabled={isLoading}
                required
                register={register}
                />
                <hr />
                <Input
                id='description'
                errors={errors}
                label='Description'
                register={register}
                disabled={isLoading}
                required
                />
            </div>
        )
    }

    if(step == STEPS.PRICE){
        body = (
            <div className='flex flex-col gap-8'>
                <Header
                label='Now, set your price'
                secondarylabel='How much do you charge per night?'
                 />
                 <Input
                 id='price'
                 errors={errors}
                 label='Price'
                 required
                 register={register}
                 formatPrice
                 type='number'
                 disabled={isLoading}
                 />
            </div>
        )
    }

  return (
    <Modal
    title='Airbnb your Home' 
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    body={body}
    secondarActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    disabled={isLoading}
    />
  )
}

export default RentModal