import React from 'react'
import PhoneSvg from "../../../../public/contact/icons-phone.svg"

const Contact = () => {
    return (
        <div className='w-[80%] mb-[10em] mx-auto'>
            <div className='flex justify-between mt-[4em] text-[1.2em]'>
                <p><span className='text-black/60'>Home</span> / About</p>
            </div>

            <div className='flex justify-between'>
                {/* first part */}
                <div className='shadow-[0px_1px_4px_rgba(21,36,64,0.5)] w-[30%] text-[1.1em] px-7 rounded-[6px]'>
                    <div className='p-[20px] border-b-2 flex flex-col gap-2 '>
                        <div className='flex items-center mb-2  gap-[20px]'>
                            <PhoneSvg />
                            <p>Call To Us</p>
                        </div>

                        <p>We are available 24/7, days a week.</p>
                        <p>Phone: +880611112222</p>
                    </div>
                    <div className='p-[20px] flex flex-col gap-2 '>
                        <div className='flex items-center mb-2 gap-[20px]'>
                            <PhoneSvg />
                            <p>Call To Us</p>
                        </div>

                        <p>Fill out form and we will contact you within 24 hours</p>
                        <p>Emails: customer@exclusive.com</p>
                        <p>Emails: support@exclusive.com</p>

                    </div>
                </div>

                {/* second part */}
                <div className='shadow-[0px_1px_4px_rgba(21,36,64,0.5)] w-[68%] text-[1.1em] rounded-[5px]'>

                <form className='flex flex-col w-[96%] h-full mx-auto justify-evenly '>
                    <div className='flex justify-between'>
                        <input className='bg-searchFormBg p-2 rounded-[5px] outline-none' type="text" placeholder="Your Name" name='name' />
                        <input className='bg-searchFormBg p-2 rounded-[5px] outline-none' type="email" placeholder="Your Email" name='email' />
                        <input className='bg-searchFormBg p-2 rounded-[5px] outline-none' type="number" placeholder="Your Phone" name='phone' />
                    </div>

                    <textarea className=' p-2 resize-none outline-none border-none rounded-[5px] bg-searchFormBg h-[50%] ' name="message" id="message" placeholder='Your Message'>
                    </textarea>

                    <div className='flex justify-end'>
                        <button className='bg-redColor text-white w-[20%] p-2 rounded-[5px]'>Send Message</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Contact