import { BACKEND_URL } from "@/constants/variables";
import { ILoginData } from "@/types/user";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = async (loginData: ILoginData) => {
  try {
    const response = await apiClient.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
        console.log('hey error1');
      throw new Error(error.response?.data.message || "An error occurred");
    }
    console.log('hey error2');
    // throw error;
  }
};




export const registerUserApi = async (registerFormData: FormData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, registerFormData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("AxiosError " + error.response?.data.message || "An error occurred");
      throw new Error(error.response?.data.message);
    }

    throw error 
  }
};

export const verifyCodeApi = async (email: string, code: string) => {
  try {
    const response = await apiClient.post("/auth/verify-code", {
      email,
      code: Number(code)
    }, {
      withCredentials : true
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('error ', error);
      throw new Error(error.response?.data.message || "An error occurred");
    }

    throw error;
  }
};

export const resendVerificationCodeApi = async(email: string)=>{
  try {
    const response = await apiClient.post('/auth/resend-email', {email})
    return response.data
  } catch (error) {
    if(error  instanceof AxiosError){
      throw new Error(error.response?.data.message || "An error occurred")
    }

    throw error
  }
}


export const logoutUser = async():Promise<string> =>{
  try {
    const response = await apiClient.delete('/auth/logout',{withCredentials: true} )
    console.log('logout result res ', response);
    return response.data.message
  } catch (error) {
    if(error instanceof AxiosError){
      return "error "+error.response?.data.message
      // throw new Error(error.response?.data.message)
      
    }

    throw error;
  }
}

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/auth/me");
    console.log('My profile result  ', response);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message
      // throw new Error(error.response?.data.message || "An error occurred");
    }
    throw error;
  }
};