"use client"
import { useRouter,useSearchParams } from 'next/navigation' 
import { useState } from 'react';
import { api } from '~/trpc/react';


export const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const verifyOtp = api.auth.verifyOtp.useMutation();
  const router = useRouter();
  const searchParams = useSearchParams()
 
  const email = searchParams.get('email')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      if (typeof email === 'string') {
      const res = await verifyOtp.mutateAsync({ email, otp });
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      if(res.message){
        router.push("/products")
      }
      setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      let errorMessage = "Failed to verify email";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessage(errorMessage)
      setIsLoading(false)
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={(e) => handleSubmit(e)} className="flex w-full max-w-full flex-col space-y-7 mt-5">
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit"className="bg-navbarItemColor p-2 text-white">
       {isLoading ? "Verifying" : "VERIFY" }
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};
