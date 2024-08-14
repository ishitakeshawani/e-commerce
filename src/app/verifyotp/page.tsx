import React from "react";
import { OtpForm } from "../_components/verifyotpform";
import { useRouter,useSearchParams } from 'next/navigation'

const VerifyOTP = () => {

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-borderColor m-7 flex h-4/5 w-1/3 flex-col items-center justify-center rounded-2xl border-2 bg-white p-9">
        <h3 className="mb-4 text-2xl font-semibold">Verify your email</h3>
        <p className="text-center">Enter the 6 digit code you have received on swa***@gmail.com</p>
        <OtpForm/>
      </div>
    </div>
  );
};

export default VerifyOTP