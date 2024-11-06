import React from 'react'
import FastDeliveryIcon from "../../public/home_page/icon-delivery.svg"
import CustomerService from "../../public/home_page/Icon-Customer service.svg"
import MoneyBackGuarantee from "../../public/home_page/Icon-secure.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const WhyChooseUs = () => {
    return (
        <div className='flex justify-evenly my-[70px] '>
            <div className='flex items-center flex-col gap-[10px]'>
                <div className='bg-[rgba(0,0,0,.3)] w-[70px] h-[70px] flex items-center justify-center rounded-[100%] mb-5'>
                    <div className='bg-black w-[75%] h-[75%] rounded-[100%] flex items-center justify-center'>
                        <FastDeliveryIcon />
                    </div>
                </div>

                <p className="font-bold text-[1.2em]">FREE AND FAST DELIVERY</p>
                <p className='text-[1.09em]'>Free delivery fall for all orders over $140</p>
            </div>


            <div className=' flex items-center flex-col gap-[10px]'>
                <div className='bg-[rgba(0,0,0,.3)] w-[70px] h-[70px] flex items-center justify-center rounded-[100%] mb-5'>
                    <div className='bg-black w-[75%] h-[75%] rounded-[100%] flex items-center justify-center'>
                        <CustomerService />
                    </div>
                </div>

                <p className="font-bold text-[1.2em]">24/6 CUSTOMER SERVICE</p>
                <p className='text-[1.09em]'>Friendly 24/7 customer support</p>
            </div>

            <div className='flex items-center flex-col gap-[10px]'>
                <div className='bg-[rgba(0,0,0,.3)] w-[70px] h-[70px] flex items-center justify-center rounded-[100%] mb-5'>
                    <div className='bg-black w-[75%] h-[75%] rounded-[100%] flex items-center justify-center'>
                        <MoneyBackGuarantee />
                    </div>
                </div>

                <p className="font-bold text-[1.2em]">MONEY BACK GUARANTEE</p>
                <p className='text-[1.09em]'>We return money within 30 days</p>
            </div>

            <button className='w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-searchFormBg mt-[230px]'>
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </div>
    )
}

export default WhyChooseUs