import { User } from "@prisma/client";
import { useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IUseFavorite {
    listingId : string,
    currentUser:User | any
}

const useFavorite = ({currentUser,listingId}:IUseFavorite)=>{

    const loginModal = useLoginModal()
    const router = useRouter()

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    },[currentUser?.id,listingId])

    const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLElement>)=>{
        e.stopPropagation()
        if(!currentUser){
            return loginModal.onOpen()
        }
        try {
            
        let request;
        if(hasFavorited){
            request = ()=>axios.delete(`/api/favorites/${listingId}`)
        } else {
            request = ()=>axios.post(`/api/favorites/${listingId}`)
        }

        await request()
        router.refresh()
        toast.success('Success')
        } catch (error) {
            toast.error("Something went wrong")    
        }

    },[
        currentUser,
        loginModal,
        hasFavorited,
        listingId,
        router
    ]
)


    return {
        hasFavorited,
        toggleFavorite
    }

}

export default useFavorite