import { BACKEND_URL } from "@/constants/variables"
import axios, { Axios, AxiosError } from "axios"

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const addCarApi = async()=>{
    try {
        
    } catch (error) {
        
    }
}

export const updateCarIsLikedApi = async(isLiked: boolean, carId: string)=>{
    try {
        const response = await apiClient.put(`/car/${carId}/like`,{isLiked})
        return response.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message || "An error occured")
        }

        throw error
    }
}


export const getCarsApi = async()=>{
    try {
        
    } catch (error) {
        
    }
}

export const getSingleCarApi = async()=>{
    try {
        
    } catch (error) {
        
    }
}