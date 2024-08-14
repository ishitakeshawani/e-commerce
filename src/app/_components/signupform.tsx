"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';  
import { api } from '~/trpc/react';

export const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const signup = api.auth.signup.useMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const res = await signup.mutateAsync({ name, email, password });
      const url = `/verifyotp?email=${encodeURIComponent(email)}`;
      router.push(url); 
      setIsLoading(false)
    } catch (error) {
      let errorMessage = "Failed to do create user";
      if (error instanceof Error) {
        errorMessage = error.message
      }
      setMessage(errorMessage)
      setIsLoading(false)
    }
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-full max-w-full flex-col space-y-7"
    >
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
        />
      </div>
      <button type="submit" className="bg-navbarItemColor p-2 text-white" disabled={isLoading}>
      {isLoading ? "Loading" : "CREATE ACCOUNT"}
      </button>
      {message && <p>{message}</p>}
      <p className="text-center">Have an Account? <Link href="/login" className="">LOGIN</Link></p>
    </form>
  );
};
