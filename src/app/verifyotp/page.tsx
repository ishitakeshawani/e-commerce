"use client";
import React, { Suspense } from "react";
import { OtpForm } from "../_components/verifyotpform";
import { useSearchParams } from 'next/navigation'

const VerifyOTP = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
};

const VerifyOTPContent = () => {
  const searchParams = useSearchParams()
  function maskEmail(email:string) {
    if(email){
      const [username, domain] = email.split('@');
      
      if(username){
        if (username.length <= 3) {
          return `${username.replace(/./g, '*')}@${domain}`;
        } else {
          const visiblePart = username.slice(0, 3);
          const maskedPart = username.slice(3).replace(/./g, '*');
          return `${visiblePart}${maskedPart}@${domain}`;
        }
      }
    }
  }
 
  const email = searchParams.get('email')
  const maskedEmail = email && maskEmail(email);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-borderColor m-7 flex h-4/5 w-1/3 flex-col items-center justify-center rounded-2xl border-2 bg-white p-9">
        <h3 className="mb-4 text-2xl font-semibold">Verify your email</h3>
        <p className="text-center">Enter the 6 digit code you have received on {maskedEmail}</p>
        <OtpForm/>
      </div>
    </div>
  );
};

export default VerifyOTP