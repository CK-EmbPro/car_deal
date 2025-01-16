import { BACKEND_URL } from '@/constants/variables'
import { IContact } from '@/types/contact'
import axios, { Axios, AxiosError } from 'axios'

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const addContactApi = async(contactData: IContact)=>{
    try {
        const response = await apiClient.post('/contact', contactData)
        return response.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }

        throw error
        
    }
}

export const getContactsApi = async()=>{
    try {
        const response = await apiClient.get('/contact')
        return response.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }
        throw error
        
    }
}


export const deleteSingleContactApi = async(id: string)=>{
    try {
        const response = await apiClient.delete(`/contact/${id}`)
        return response.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }
        throw error
    }
}

export const deleteContactsApi = async()=>{
    try {
        const response = await apiClient.delete('/contact')
        return response.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data.message)
        }
        throw error
    }
}