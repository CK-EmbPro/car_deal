
import { BACKEND_URL } from "@/constants/variables"
import { ICartItem } from "@/types/cart"
import axios, { AxiosError } from "axios"


const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const addCartItemApi = async(cartItem: ICartItem)=>{
    try {
        const response = await apiClient.post('/cart', cartItem)
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message
        );
        throw error
    }
}

export const getCartItemsApi = async()=>{
    try {

        const response = await apiClient.get('/cart')
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message);
        throw error;
    }
}

export const updateWholeCartApi = async(updatedCart: ICartItem[])=>{
    try {

        const response = await apiClient.put('/cart',updatedCart)
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message);
        throw error;
    }
}


export const deleteCartItemApi = async(id:string)=>{
    try {

        const response = await apiClient.delete(`/cart/${id}`)
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message);
        throw error;
    }
}

export const deleteAllCartItemsApi = async()=>{
    try {

        const response = await apiClient.delete(`/cart`)
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message);
        throw error;
    }
}