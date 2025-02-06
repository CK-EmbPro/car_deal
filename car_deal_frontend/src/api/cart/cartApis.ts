
import { BACKEND_URL } from "@/constants/variables"
import { ICartItem } from "@/types/cart"
import axios, { AxiosError } from "axios"


const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const addCartItemApi = async(cartItem: ICartItem, authHeader:Record<string, string>)=>{
    try {
        const response = await apiClient.post('/cart', cartItem, {
            headers: {
                ...authHeader
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message
        );
        throw error
    }
}

export const getCartItemsApi = async(authHeader: Record<string, string>)=>{
    try {

        const response = await apiClient.get('/cart', {
            headers: {
                ...authHeader
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message);
        throw error;
    }
}

export const updateWholeCartApi = async(authHeader: Record<string, string>, updatedCart: ICartItem[])=>{
    try {

        const response = await apiClient.put('/cart',updatedCart, {
            headers: {
                ...authHeader
            },
            
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message);
        throw error;
    }
}


export const deleteCartItemApi = async(id:string,authHeader: Record<string, string>)=>{
    try {

        const response = await apiClient.delete(`/cart/${id}`, {
            headers: {
                ...authHeader
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message);
        throw error;
    }
}

export const deleteAllCartItemsApi = async(authHeader: Record<string, string>)=>{
    try {

        const response = await apiClient.delete(`/cart`, {
            headers: {
                ...authHeader
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) throw new Error(error.response?.data.message);
        throw error;
    }
}