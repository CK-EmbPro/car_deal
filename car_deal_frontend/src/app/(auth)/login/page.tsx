"use client"
import React, { ChangeEvent, SetStateAction, useState } from 'react'
import SignUpBanner from "../../../../public/signup/signup_login_banner.svg"
import Google from "../../../public/signup/Icon-Google.svg"
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
            <div className='w-[25%] flex flex-col  pt-[90px] gap-4'>
                <p className='text-[1.4em] font-semibold'>Log in to <span className='text-red-500 text-[1.2em]'>Car_Deal</span></p>
                <p>Enter your details below</p>
                <form className='flex flex-col gap-4'>
                    <input className='mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300' type="text" placeholder='Name' required />

                    <input className='mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300' type='password' placeholder='Password' required />
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

export default SignUp