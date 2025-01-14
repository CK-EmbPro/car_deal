"use client"
import React, { ChangeEvent, FormEvent, SetStateAction, useState } from 'react'
import SignUpBanner from "../../../../public/signup/signup_login_banner.svg"
import Google from "../../../public/signup/Icon-Google.svg"
import Link from 'next/link'
import PhoneInput, { CountryData } from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useMutation, useQuery } from '@tanstack/react-query'
import { loginApi } from '@/api/auth/authApi'
import { LoginData } from '@/types/user'


const Login = () => {

    const [loginData, setloginData] = useState<LoginData>({
        email: "",
        password: ""
    })

    const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
        mutationFn: async () => await loginApi(loginData), // Define your API call here
        onSuccess: (data)=>{
            alert(`${data.message}`)
            setloginData({
                email: "",
                password: ""
            })
        },

        onError: (error)=>{
            alert(`${error.message}`)
        }
    });

    const handleLoginDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setloginData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault()
        
        mutate()

        
    }



    return (
        <div className='flex py-[70px] pb-[90px] gap-[100px]'>
            <div>
                <SignUpBanner />
            </div>
            <div className='w-[25%] flex flex-col  pt-[90px] gap-4'>
                <p className='text-[1.4em] font-semibold'>Log in to <span className='text-red-500 text-[1.2em]'>Car_Deal</span></p>
                <p>Enter your details below</p>
                <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
                    <input
                        className='mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300'
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={loginData.email}
                        onChange={handleLoginDataChange}
                        required
                    />

                    <input
                        className='mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={loginData.password}
                        onChange={handleLoginDataChange}
                        required
                    />


                    <div className='w-[79%] flex justify-between items-center'>
                        <button className='bg-red-500 text-white py-2 w-[40%] rounded-[5px]'>Log In</button>
                        <button className=' text-red-500 w-[40%] flex justify-center items-center py-2 gap-3'>
                            Forget Password?
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login