import React from 'react'
import { LoginForm } from '../_components/loginform'

const login = () => {
  return (
    <div className='flex justify-center'>
      <div className="flex flex-col bg-white items-center justify-center border-2 border-borderColor rounded-2xl w-1/3 m-7 p-9 h-4/5">
        <h3 className="text-2xl mb-4 font-semibold">Login</h3>
        <h4 className='text-center text-2xl font-medium'>Welcome back to ECOMMERCE</h4>
        <p className='text-center font-normal text-xs'>The next gen business marketplace</p>
        <LoginForm />
      </div>
    </div>
  )
}

export default login
