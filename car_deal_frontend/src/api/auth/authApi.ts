import { BACKEND_URL } from "@/constants/variables";
import { LoginData } from "@/types/user";
import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = async (loginData: LoginData) => {
  try {
    const response = await apiClient.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
        console.log('hey error1');
      throw new Error(error.response?.data.message);
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
      console.log("AxiosError " + error.response?.data.message);
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
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
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
      throw new Error(error.response?.data.message)
    }

    throw error
  }
}