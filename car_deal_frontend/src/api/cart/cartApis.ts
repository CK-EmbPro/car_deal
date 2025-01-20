
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
export const listCartItemsApi = async(authHeader: Record<string, string>)=>{
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