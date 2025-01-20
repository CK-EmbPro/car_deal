import { BACKEND_URL } from "@/constants/variables"
import { ISavedCar } from "@/types/car"
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

export const updateCarIsLikedApi = async(carId: string, isLiked: boolean)=>{
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


export const getCarsApi = async():Promise<ISavedCar[]>=>{
    try {
        const response = await apiClient.get('/car')
        console.log('response ', response);
        return response.data.entity
    } catch (error) {
        console.log('error ', error);
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }  
        throw error      
    }
}

export const getSingleCarApi = async(id: string)=>{
    try {
        const response = await apiClient.get(`/car/${id}`)
        return response.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }  
        throw error      
    }
}