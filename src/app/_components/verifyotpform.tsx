"use client"

import { useState } from 'react';

export const OtpForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
    } catch (error) {
      setMessage('Error verifying OTP');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-full flex-col space-y-7 mt-5">
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit"className="bg-navbarItemColor p-2 text-white">
        VERIFY
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};
