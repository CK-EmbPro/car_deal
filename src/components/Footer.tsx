import React from 'react'
import Subscribe from "../../public/footer/subscribe.svg"
import PlayStore from "../../public/footer/play_store.svg"
import AppStore from "../../public/footer/app_store.svg"
import Copyright from "../../public/footer/Group.svg"
import Facebook from "../../public/footer/facebook.svg"
import Instagram from "../../public/footer/instagram.svg"
import LinkedIn from "../../public/footer/linkedIn.svg"
import Twitter from "../../public/footer/twitter.svg"
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='bg-black text-white  text-[1.1em] '>
            <div className=' flex justify-evenly py-[40px] pt-[80px] px-[30px]  '>

                <div className='flex flex-col gap-4  w-[17%]'>
                    <p className='font-semibold text-[1.4em] mb-3'>Exclusive</p>
                    <p className='font-semibold text-[1.2em]'>Subscribe</p>
                    <p>Get 10% off your first order</p>
                    <form className='border-2 rounded-md border-[rgba(255,255,255,.5)] flex items-center justify-between p-2'>
                        <input className='outline-none bg-transparent w-[85%] ' type="text" placeholder='Enter your email' />
                        <button className='w-[10%]'>
                            <Subscribe />
                        </button>
                    </form>
                </div>

                <div className='flex flex-col gap-4 w-[17%]'>
                    <p className='font-semibold text-[1.2em] mb-3'>Support</p>
                    <p className=''>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
                    <p>ckdebrice2@gmail.com</p>
                    <p>+250798594425</p>
                </div>

                <div className='flex flex-col gap-4 w-[17%]'>
                    <p className='font-semibold text-[1.2em] mb-3'>Account</p>
                    <p>My Account</p>
                    <p>Login/Register</p>
                    <p>Cart</p>
                    <p>Shop</p>
                </div>

                <div className='flex flex-col gap-4 w-[17%]'>
                    <p className='font-semibold text-[1.2em] mb-3'>Quick Link</p>
                    <p>Privacy Policy</p>
                    <p>Terms of use</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                </div>

                <div className='flex flex-col gap-4 w-[17%] '>
                    <p className='font-semibold text-[1.2em] mb-3'>Download App</p>
                    <div className='flex flex-col gap-4'>
                        <p>Save $3 with App New User Only</p>
                        <div className='flex gap-2'>
                            <Image src={'/footer/Qr_Code.png'} alt='qrcode' width={100} height={100} />
                            <div className='flex flex-col justify-evenly'>
                                <PlayStore />
                                <AppStore />
                            </div>


                        </div>
                        <div className='flex gap-7 '>
                            <Link href={""}>
                                <Facebook />
                            </Link>

                            <Link href={""}>
                                <Twitter />
                            </Link>

                            <Link href={""}>
                                <Instagram />
                            </Link>

                            <Link href={""}>
                                <LinkedIn />
                            </Link>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='border-t-[1px] border-[rgba(255,255,255,.2)] flex justify-center items-center gap-1 p-4'>
                <Copyright />
                <p className='text-white opacity-[.8]'>
                    Copyright Rimel 2022. All rights reserved
                </p>
            </div>
        </div>
    )
}

export default Footer