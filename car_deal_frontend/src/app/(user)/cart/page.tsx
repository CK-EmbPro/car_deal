"use client"
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import LcdMonitor from "../../../../public/cart/lcd_monitor.png"
import gamepad from "../../../../public/cart/gamepad.png"
import { CartItem } from '@/types/cart'
import { calculateItemsSubtotal } from '@/utils/calculateItemsSubTotal'
import { loadStripe } from '@stripe/stripe-js';


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


const Cart = () => {

    const router = useRouter()
    const [cartItemsState, setcartItemsState] = useState<CartItem[]>(cartItems)


    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = parseInt(event.target.value, 10)
        const updatedItems = [...cartItems]
        updatedItems[index].itemQuantity = newQuantity

        setcartItemsState(updatedItems)

    }

    const makePayment = async () => {
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        if(publishableKey){

            const stripe = await loadStripe(publishableKey)
            
            const body = {
                products: cartItemsState
            }
            
            const headers = {
                "Content-Type": "application/json"
            }
            
            const response = await fetch("backend-url/orders/placeOrder", {
                method: "POST", 
                headers,
                body: JSON.stringify(body)
            })
            
            const session = await response.json()
            
            const result = stripe?.redirectToCheckout({
                sessionId: session.id
            })
            
            
        }
    }

    return (
        <div className='w-[80%] mx-auto flex flex-col gap-[40px] mb-[10em]'>
            <div className='flex justify-between mt-[4em] text-[1.2em]'>
                <p><span className='text-black/60'>Home</span> / Cart</p>
                <p>Welcome! <span className='text-red-500'>Md Rime!</span></p>
            </div>

            <div className=' flex flex-col gap-[50px]'>
                <div className=' flex justify-between w-full text-[1.3em] p-4 px-5 rounded-[5px] shadow-[0px_1px_10px_1px_rgba(21,36,64,0.5)]'>
                    <p className='w-[24%]'>Product</p>
                    <p className='w-[24%]'>Price</p>
                    <p className='w-[24%]'>Quantity</p>
                    <p className='w-[24%]'>Subtotal</p>
                </div>
                <div className='flex flex-col gap-[30px]'>
                    {cartItemsState.map(({ image, cartItemName, price, itemQuantity }, index) => (
                        <div key={index} className=' flex justify-between w-full h-[120px] text-[1.3em] p-4 px-5 rounded-[5px] shadow-[0px_1px_5px_rgba(21,36,64,0.5)]'>
                            <div className='flex w-[24%] justify-around items-center gap-1 '>
                                <Image src={image} alt='no_img' width={100} height={100} />
                                <p>{cartItemName}</p>
                            </div>

                            <p className='w-[24%]  flex items-center  '>${price}</p>
                            <div className='flex items-center w-[24%]'>
                                <input
                                    className=' border-2 border-slate-600 rounded-[10px] outline-none w-[70px] h-[50px] p-2'
                                    value={itemQuantity}
                                    type="number"
                                    min={1}
                                    onChange={(event) => handleQuantityChange(event, index)}
                                />
                            </div>
                            <p className=' w-[24%] flex items-center'>${itemQuantity * price}</p>
                        </div>
                    ))}

                </div>
                <div className='flex justify-between'>
                    <button className='w-[20%] border-2 border-slate-500 text-[1.1em] p-1 py-2 rounded-[5px]'>Return To Shop</button>
                    <button className='w-[20%] bg-red-500 text-white text-[1.1em] p-1 py-2 rounded-[5px]'>Update Cart</button>
                </div>
            </div>

            <div className='w-full flex justify-end'>
                <div className='w-[40%] flex flex-col gap-2 border-2 rounded-[5px] border-slate-800 text-[1.2em] p-7 py-8 className="border border-yellow-500"'>
                    <p className=" text-[1.1em] font-semibold">Cart Total</p>
                    <p className="border-b border-slate-500 flex justify-between">Subtotal: <span>${calculateItemsSubtotal(cartItems)}</span></p>
                    <p className="border-b border-slate-500 flex justify-between">Shipping: <span>Free</span></p>
                    <p className="flex justify-between">Total: <span>${calculateItemsSubtotal(cartItems)}</span></p>
                    <button onClick={makePayment} className='bg-red-500 rounded-[10px] w-[60%] p-1 py-2 text-white mx-auto '>Process to checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart