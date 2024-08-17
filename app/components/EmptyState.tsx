'use client'
import React from 'react'
import Header from './Header'
import Button from './Button'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
    label? : string,
    secondaryLabel? : string,
    addBtn? : boolean
}

const EmptyState:React.FC<EmptyStateProps> = (
    {
        label = 'No listings Found!',
        secondaryLabel = 'Try removing some of your filters',
        addBtn
    }
) => {
    const router = useRouter()
  return (
    <div 
    className='
    h-[60vh]
    flex
    flex-col
    gap-2
    jusitfy-center
    items-center
    '
    >
        <Header
        label={label}
        secondarylabel={secondaryLabel}
        />
        {addBtn && (
            <div>
                <Button onClick={()=>router.push('/')} label='Remove all filters'  small outline />
            </div>
        )}
    </div>
  )
}

export default EmptyState