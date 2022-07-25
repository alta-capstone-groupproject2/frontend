import React from 'react'
import { useParams } from 'react-router-dom'
import logoSrc from '../assets/images/logo.webp'
import { BsCheck2Circle } from 'react-icons/bs'

function Verification() {
    const params = useParams()
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='w-[40%] flex flex-col gap-4 '>
            <div className=' pb-5 border-b-[0.1rem] border-gray-200 flex items-end justify-between'>
                <div>
                    <img src={logoSrc} alt="" className='h-10' />
                    <p className='text-gray-300'>Welcome Aboard</p>
                </div>
                <div className='font-thin'> Account Verification</div>  
            </div>  
            <p className='text-9xl pl-6 font-bolder text-green-600 self-center'>
                <BsCheck2Circle />
            </p>  
            <p className='font-bold text-xl self-center'>   
                Verification Success
              </p>
            <div>       
                <p>
                    Hi {params.id} !
                </p>
                <p className='break-words indent-3'>
                    You Have Successfully created a lamiapp account, now you can use lamiapp feature after login in here  
                </p>
            </div>
            <button className='bg-red-600 text-white rounded py-1 px-3 mt-5 self-center'>Login</button>
            <div className='mt-5 pt-5 border-t-[0.1rem] border-gray-200 flex justify-end'>
                <h1 className='font-thin text-base sm:text-md hover:text-slate-600'>&copy; LAMI APP</h1>
            </div>
            
        </div>
    </div>
  )
}

export default Verification