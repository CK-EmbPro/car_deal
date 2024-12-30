import Image from 'next/image'
import React from 'react'


const ProductDetails = () => {
    return (
        <div className='text-[1.1em]'>
            <div className='flex justify-between mt-[4em] w-[80%] mx-auto text-[1.2em]'>
                <p><span className='text-black/60'>Account / Range Rover</span> / Range Rover Defender vx</p>
            </div>

            <div className='my-[4em] h-[300px] w-[90vw] mx-auto flex gap-4'>
                <div className='relative h-full w-[48%] bg-slate-100'>
                    <Image className='w-full h-full object-contain' src={'/lamborghini_transparent.png'} alt='no_img' fill />
                </div>

                <div className='flex flex-col justify-center items-start gap-4 w-[48%]'>
                    <p className='font-semibold'> Range Rover Defender vx</p>
                    <p className='text-red-500 font-semibold'>$1230</p>
                    <p>PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.</p>

                    <button className='bg-textColor text-white w-[100px] p-2 rounded-[15px]'>Add to cart</button>
                </div>


            </div>

        </div>
    )
}

export default ProductDetails