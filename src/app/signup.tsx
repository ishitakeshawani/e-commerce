import React from 'react'
import { SignupForm } from './_components/signupformt'

const SignUp = () => {
  return (
    <div className="flex flex-col bg-white items-center justify-center border-2 border-borderColor rounded-2xl w-1/3 m-7 p-5 h-4/5">
      <h3 className="text-2xl mb-4 font-semibold">Create your account</h3>
      <SignupForm />
    </div>
  )
}

export default SignUp
