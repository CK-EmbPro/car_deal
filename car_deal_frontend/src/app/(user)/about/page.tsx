import React from 'react'
import AboutSvg from "../../../../public/about-us/our_story.svg"
import SallersActive from "../../../../public/about-us/sellers_active.svg"
import MonthlyProductSale from "../../../../public/about-us/monthly_product_sale.svg"
import CustomerActive from "../../../../public/about-us/customer_active.svg"
import AnnualGrossSale from "../../../../public/about-us/annual_gross_sale.svg"
import FounderChairman from "../../../../public/about-us/founder_chairman2.svg"
import ManagingDirector from "../../../../public/about-us/managing_director2.svg"
import ProductDesigner from "../../../../public/about-us/product_designer2.svg"
import LinkedIn from "../../../../public/about-us/linkedIn.svg"
import Twitter from "../../../../public/about-us/twitter.svg"
import Instagram from "../../../../public/about-us/instagram.svg"
import WhyChooseUs from '@/components/WhyChooseUs'


const About = () => {
    return (
        <div className='w-[80%] mx-auto text-[1.1em] mb-[10em] flex flex-col gap-[40px]'>
            <div className='flex justify-between mt-[4em] text-[1.2em]'>
                <p><span className='text-black/60'>Home</span> / About</p>
                <p>Welcome! <span className='text-red-500'>Md Rime!</span></p>
            </div>

            <div className='flex flex-col gap-[90px]'>
                <div className='flex'>
                    <div className='w-[45%] flex flex-col justify-center gap-[40px] text-[1.2em]'>
                        <p className='font-bold text-[1.5em]'>Our Story</p>
                        <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                        <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                    </div>

                    <AboutSvg className=" w-[50%]" />
                </div>

                <div className='flex justify-evenly '>
                    <div className='border-2 border-slate-300 rounded-[5px]  w-[21%] flex flex-col items-center gap-2 py-5 '>
                        <SallersActive className="" />
                        <p>10.5K</p>
                        <p>Sallers active our site</p>
                    </div>

                    <div className='border-2 border-slate-300 bg-redColor text-white rounded-[5px]  w-[21%] flex flex-col items-center gap-2 py-5 '>
                        <MonthlyProductSale className="" />
                        <p>33K</p>
                        <p>Sallers active our site</p>
                    </div>

                    <div className='border-2 border-slate-300 rounded-[5px]  w-[21%] flex flex-col items-center gap-2  py-5 '>
                        <CustomerActive className="" />
                        <p>45.5K</p>
                        <p>Sallers active our site</p>
                    </div>

                    <div className='border-2 border-slate-300 rounded-[5px]  w-[21%] flex flex-col items-center gap-2  py-5 '>
                        <AnnualGrossSale className="" />
                        <p>25K</p>
                        <p>Sallers active our site</p>
                    </div>
                </div>

                <div className='flex gap-10 '>
                    <div className=' rounded-[5px] p-2 w-[40%] flex flex-col gap-2 shadow-[0px_1px_4px_rgba(21,36,64,0.5)] '>
                        <div className='text-[1.1em] pt-2 px-2 mb-3 '>

                            <FounderChairman className='mx-auto' />
                        </div>
                        <p className='text-[1.3em] leading-[16px] font-bold '>Tom Cruise</p>
                        <p>Founder & Chairman</p>
                        <div className='flex  gap-[15px]'>
                            <Twitter />
                            <Instagram />
                            <LinkedIn />
                        </div>
                    </div>

                    <div className=' rounded-[5px] p-2 w-[40%] flex flex-col gap-2 shadow-[0px_1px_4px_rgba(21,36,64,0.5)] '>
                        <div className='text-[1.1em]  pt-2 px-2 mb-3 '>

                            <ManagingDirector className=' mx-auto' />
                        </div>
                        <p className='text-[1.3em] leading-[16px] font-bold '>Emma Watson</p>
                        <p>Managing Director</p>
                        <div className='flex  gap-[15px]'>
                            <Twitter />
                            <Instagram />
                            <LinkedIn />
                        </div>
                    </div>

                    <div className=' rounded-[5px] p-2 w-[40%] flex flex-col gap-2 shadow-[0px_1px_4px_rgba(21,36,64,0.5)] '>
                        <div className='text-[1.1em] pt-2 px-2 mb-3 '>

                            <ProductDesigner className=' mx-auto' />
                        </div>
                        <p className='text-[1.3em] leading-[16px] font-bold '>Will Smith</p>
                        <p>Product Designer</p>
                        <div className='flex gap-[15px]'>
                            <Twitter />
                            <Instagram />
                            <LinkedIn />
                        </div>
                    </div>
                </div>

                <WhyChooseUs/>
            </div>
        </div>
    )
}

export default About