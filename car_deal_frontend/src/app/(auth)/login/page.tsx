"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import SignUpBanner from "../../../../public/signup/signup_login_banner.svg"
import "react-phone-input-2/lib/style.css"
import { useMutation } from '@tanstack/react-query'
import { loginApi } from '@/api/auth/authApis'
import { ILoginData } from '@/types/user'
import { useRouter, useSearchParams } from 'next/navigation'
import { CERTAIN_ERROR, FORBIDDEN, JWT_EXPIRED, NOT_LOGGED_IN } from '@/constants/common'
import { NOTIMP, NOTINITIALIZED } from 'dns/promises'


const Login = () => {

    const [loginData, setloginData] = useState<ILoginData>({
        email: "",
        password: ""
    })
    const router = useRouter()
    const searchParams = useSearchParams()

    const { mutate } = useMutation({
        mutationFn: async () => await loginApi(loginData), // Define your API call here
        onSuccess: (data)=>{
            alert(`${data.message}`)

            console.log('login data ', data);
            // Redirect to codeVerificaiton after successfull login
            router.replace(`/verify_code?email=${encodeURIComponent(loginData.email)}`)

            setloginData({
                email: "",
                password: ""
            })


        },

        onError: (error)=>{
            console.log('error ', error);
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


    useEffect(() => {
        const forbidden = searchParams.get(FORBIDDEN)
        const notLoggedIn = searchParams.get(NOT_LOGGED_IN)
        const jwtExpired = searchParams.get(JWT_EXPIRED)
        const certainError = searchParams.get(CERTAIN_ERROR)
        let redirectTimeout: NodeJS.Timeout

      
            if (forbidden || notLoggedIn || jwtExpired || certainError) {
                const message = forbidden || jwtExpired || certainError || notLoggedIn
                alert(message)
                redirectTimeout = setTimeout(() => {
                    router.replace("/login")
                }, 3000);
            }
       
        return () => {
            if (redirectTimeout) clearTimeout(redirectTimeout);
        }
    }, [searchParams, router])




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