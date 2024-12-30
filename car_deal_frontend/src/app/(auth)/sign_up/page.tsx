"use client"
import React, { ChangeEvent, SetStateAction, useState } from 'react'
import SignUpBanner from "../../../../public/signup/signup_login_banner.svg"
import Google from "../../../../public/signup/Icon-Google.svg"
import Link from 'next/link'
import PhoneInput, { CountryData } from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"


const SignUp = () => {
    const [phoneNumber, setphoneNumber] = useState<string>("")
    const [isPhoneNumberValid, setisPhoneNumberValid] = useState<boolean>(false)
    const handlePhoneNumChange = (value: string) => {
        setphoneNumber(value)
    }

    // const handleIsPhoneValid = (
    //     value: string,
    //     country: CountryCode, // Change type to object
    //     countries: object[] ,
    //     hiddenAreaCodes: object[]
    // ): boolean => {
    //     // const countryCode = (country as CountryData).countryCode; // Assert country type for safe access
    //     return checkValidPhoneNumber(value, country as CountryCode, setisPhoneNumberValid);
    // };
    return (
        <div className='flex py-[70px] pb-[90px] gap-[100px]'>
            <div>
                <SignUpBanner />
            </div>
            <div className=' w-[25%] flex flex-col  pt-[70px] gap-4'>
                <p className='text-[1.4em] font-semibold'>Create an account</p>
                <p>Enter your details below</p>
                <form className='flex flex-col gap-4'>
                    <input className='mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300' type="text" placeholder='Name' required />
                    <input className='mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300' type="email" placeholder='Email' required />
                    <div className='w-full '>
                        <PhoneInput
                            country={'us'}
                            value={phoneNumber}
                            onChange={handlePhoneNumChange}
                            
                        />
                    </div>
                    <input className='my-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300' type='password' placeholder='Password' required />
                    <button className='bg-red-500 text-white py-2 w-[79%] rounded-[5px]'>Create Account</button>
                    <button className='border-2 border-[searchFormBg] w-[79%] rounded-[5px] flex justify-center items-center py-2 gap-3'>
                        <Google />
                        Sign up with Google
                    </button>
                </form>

                <p>Already have account? <Link href={"login"} className='underline-offset-[6px]   underline'>Log in</Link> </p>
            </div>
        </div>
    )
}

export default SignUp