"use client"
import { verifyCodeApi } from '@/api/auth/authApi'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const VerifyCode = () => {
  const [verificatinCode, setVerificatinCode] = useState<string>("")

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setVerificatinCode(e.target.value)
  }

  const handleOnSubmit = (e:FormEvent)=>{
    e.preventDefault()
    
    const {data, isLoading, isError} = useQuery({
      queryKey: ['verificationCode'],
      queryFn: async() => await verifyCodeApi("", verificatinCode)
    })

  }

  return (
    <form onSubmit={handleOnSubmit} className='h-[70vh] border border-black flex flex-col items-center justify-center gap-4 '>
      <p className='font-bold text-[1.3em]'>Check your inbox</p>
      <p className='text-black opacity-[.7]'>Enter the verification code we just sent to kennydebrice2@gmail.com </p>
      <input
        type='number'
        placeholder='Code'
        name='verificationCode'
        value={verificatinCode}
        onChange={handleVerificationCodeChange}
        className='border-[1.5px] rounded-[5px] outline-none border-slate-500 p-1 w-[250px]'
      />
      <button className='bg-black text-white  w-[250px] py-1 rounded-[5px]'>Continue</button>
      <Link href={""}>Resend email</Link>
    </form>
  )
}

export default VerifyCode