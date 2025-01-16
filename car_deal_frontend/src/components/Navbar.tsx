import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
const Navbar = () => {
    return (
        <div className=' flex justify-evenly items-center py-4 text-[1.2em]'>
            <Link href={"/"} className='text-[2em] font-bold text-red-500'>Car_Deal</Link>
            <div className='flex gap-12 '>
                <Link href={"/"} className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}>Home</Link>
                <Link href={"/contact"} className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}>Contact</Link>
                <Link href={"/about"} className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}>About</Link>
                <Link href={"/sign_up"} className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}>Sign Up</Link>
            </div>
            <div className='flex gap-12 items-center'>
                <form className=' relative rounded-md w-[280px] h-[40px] flex bg-searchFormBg px-3'>
                    <input type="text" placeholder='What are u lookin 4r' className='w-[87%]  rounded-md outline-none  bg-searchFormBg' />
                    <FontAwesomeIcon icon={faSearch} className='absolute top-3 right-3' />
                </form>

                {/* <FontAwesomeIcon icon={faHeart} className='text-[25px]' /> */}
                <Link href={"/cart"}>
                    <FontAwesomeIcon icon={faCartShopping} className='text-[25px]' />
                </Link>
            </div>

        </div >
    )
}

export default Navbar
