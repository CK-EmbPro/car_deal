import { CartItem } from '@/types/cart'
import React from 'react'
import LcdMonitor from "../../../../public/cart/lcd_monitor.png"
import gamepad from "../../../../public/cart/gamepad.png"
import Image from 'next/image'
import { calculateItemsSubtotal } from '@/utils/calculateItemsSubTotal'
import BkKash from "../../../../public/checkout/svgs/bkash.svg"
import Visa from "../../../../public/checkout/svgs/visa.svg"
import PayPessa from "../../../../public/checkout/svgs/pay_pessa.svg"
import MasterCard from "../../../../public/checkout/svgs/mastercard.svg"

const cartItems: CartItem[] = [
    {
        image: LcdMonitor,
        cartItemName: "LCD Monitor",
        price: 650,
        itemQuantity: 2
    },
    {
        image: gamepad,
        cartItemName: "LCD Monitor",
        price: 650,
        itemQuantity: 3
    }

]
const CheckOut = () => {
    return (
        <div className='w-[70%] text-[1.1em] mx-auto mb-[10em] flex flex-col gap-[40px]'>
            <div className='flex justify-between mt-[4em] text-[1.2em]'>
                <p><span className='text-black/60'>Home</span> / Cart</p>
                <p>Welcome! <span className='text-red-500'>Md Rime!</span></p>
            </div>

            <div className=' w-[50%] mx-auto flex flex-col gap-[20px] '>
                <div className='flex flex-col gap-7'>
                    {cartItems.map(({ cartItemName, image, itemQuantity, price }, index) => (
                        <div key={index} className='flex justify-between items-center'>
                            <div className='flex items-center justify-between w-[40%]'>
                                <Image className='w-[30%] h-[70%]' src={image} alt='no_img' width={120} height={120} />
                                <p>{cartItemName}</p>
                            </div>

                            <p>${itemQuantity * price}</p>

                        </div>

                    ))}

                </div>

                <div className='flex flex-col gap-3'>
                    <p className="border-b border-slate-500 flex justify-between">Subtotal: <span>${calculateItemsSubtotal(cartItems)}</span></p>
                    <p className="border-b border-slate-500 flex justify-between">Shipping: <span>Free</span></p>
                    <p className="flex justify-between">Total: <span>${calculateItemsSubtotal(cartItems)}</span></p>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className=' flex justify-between'>
                        <label className='flex items-center gap-2 ' htmlFor="bank"><input type="radio" name='payment_options' id='bank' />Bank</label>
                        <div className=' flex justify-end'>
                            <BkKash className="w-[15%] " />
                            <Visa className="w-[15%]" />
                            <MasterCard className="w-[15%] " />
                            <PayPessa className="w-[15%]" />
                        </div>
                    </div>

                    <label className='flex items-center gap-2 ' htmlFor="bank"><input type="radio" name='payment_options' id='bank' />Cash On Delivery</label>

                </div>

                <div className=''>

                    <button className='w-[30%] p-2 rounded-[5px] bg-red-500 text-white text-[1.1em] text-center'>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default CheckOut