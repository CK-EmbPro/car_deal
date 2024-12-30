"use client"
import React, { useState } from 'react'

const Account = () => {
    const [showProfileForm, setshowProfileForm] = useState<boolean>(true)
    const [showPaymentOptions, setshowPaymentOptions] = useState<boolean>(false)

    const handleShowProfileForm =()=>{
        setshowPaymentOptions(false)
        setshowProfileForm(true)
    }
    const handleShowPaymentOptions =()=>{
        setshowProfileForm(false)
        setshowPaymentOptions(true)
    }
    return (
        <div className='flex flex-col w-[80%] mx-auto gap-[4em] mb-[10em]'>
            <div className='flex justify-between mt-[4em] text-[1.2em]'>
                <p><span className='text-black/60'>Home</span> / My account</p>
                <p>Welcome! <span className='text-red-500'>Md Rime!</span></p>
            </div>

            <div className='flex justify-between  '>
                <div className='flex flex-col gap-1 w-[20%] text-[1.1em]'>
                    <p className='mb-1 font-semibold text-[1.1em]'>Manage your account</p>
                    <button onClick={handleShowProfileForm} className={`text-start ms-10 ${showProfileForm ? "text-red-500" : "text-black/60"} `}>My Profile</button>
                    <button onClick={handleShowPaymentOptions} className={`text-start ms-10 ${showPaymentOptions ? "text-red-500": "text-black/60"} `}>My payment options</button>
                </div>

                <div className=' w-[70%]  shadow-[0px_1px_6px_rgba(21,36,64,0.5)] rounded-[10px] py-[30px]'>

                    {showProfileForm &&
                        (
                            <form className='w-[85%] flex flex-col gap-[20px] m-auto '>
                                <p className='text-red-500 font-semibold text-[1.2em]'>Edit Your Profile</p>
                                <div className='flex  justify-between mb-2'>
                                    <div className='flex flex-col w-[47%] gap-2'>
                                        <label className='text-[1.1em]' htmlFor="firstname">First Name</label>
                                        <input className='bg-searchFormBg rounded-[5px] p-2 text-[1.1em] text-black/60 outline-none border-none ' type="text" name="first_name" id='firstname' value={"Md"} required />
                                    </div>
                                    <div className='flex flex-col w-[47%] gap-2'>
                                        <label className='text-[1.1em]' htmlFor="lastname">Last Name</label>
                                        <input className='bg-searchFormBg rounded-[5px] p-2 text-[1.1em] text-black/60 outline-none border-none ' type="text" name='last_name' id='lastname' value={"Rimel"} required />
                                    </div>
                                </div>

                                <div className='flex  justify-between mb-2'>
                                    <div className='flex flex-col w-[47%] gap-2'>
                                        <label className='text-[1.1em]' htmlFor="email">Email</label>
                                        <input className='bg-searchFormBg rounded-[5px] p-2 text-[1.1em] text-black/60 outline-none border-none ' type="email" id='email' name='email' value={"Md"} required />
                                    </div>
                                    <div className='flex flex-col w-[47%] gap-2'>
                                        <label className='text-[1.1em]' htmlFor="address">Last Name</label>
                                        <input className='bg-searchFormBg rounded-[5px] p-2 text-[1.1em] text-black/60 outline-none border-none ' type="text" name="address" id='address' value={"Kingston, 5236, United State"} required />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-[1.1em]'>Password Changes</label>

                                    <input placeholder='Current Password' className='bg-searchFormBg rounded-[5px] p-2 text-[1.1em] mb-2 text-black/60 outline-none border-none' type="password" name='current_password' required />
                                    <input placeholder='New Password' className='bg-searchFormBg rounded-[5px] p-2 text-[1.1em] mb-2 text-black/60 outline-none border-none' type="password" name='new_password' required />
                                    <input placeholder='Confirm New Password' className='bg-searchFormBg rounded-[5px] p-2 text-[1.1em] text-black/60 outline-none border-none' type="password" name="confirm_new_password" required />

                                </div>

                                <div className='flex justify-end gap-3 mt-1'>
                                    <button className='shadow-[0px_1px_2px_rgba(21,36,64,0.5)] w-[20%] p-1 rounded-[8px] text-[1.2em]'>Cancel</button>
                                    <button className='bg-red-500 text-white w-[20%] p-1 rounded-[8px] text-[1.2em]'>Save Changes</button>
                                </div>
                            </form>
                        )
                    }

                    {showPaymentOptions &&
                        (
                            <div>
                                <p>Payment options</p>
                                <div>
                                    <p>Visa CARD</p>
                                    <p>Momopay</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Account