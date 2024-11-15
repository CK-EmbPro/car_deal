"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const not_found = () => {
    const router = useRouter()
    return (
        <div className='w-[80%] mb-[10em] mx-auto flex flex-col gap-[40px]'>
            <div className='flex justify-between mt-[4em] text-[1.2em]'>
                <p><span className='text-black/60'>Home</span> / 404 Error</p>
            </div>

            <div className='flex flex-col items-center gap-7'>
                <p className='text-[6vw]'>404 Not Found</p>
                <p className='text-[1.4vw]'>Your visited page not found. You may go home page.</p>

                <button className='text-[1.3vw]  bg-redColor p-2 px-5 rounded-[5px] text-white' onClick={()=> router.back()}>Back to homepage</button>
            </div>
        </div>
    )
}

export default not_found