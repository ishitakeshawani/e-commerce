"use client";
import Link from "next/link";
import { useState } from "react";
import { api } from '~/trpc/react';
import React from "react";
import { useRouter } from 'next/navigation'; 

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const login = api.auth.login.useMutation();
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const res = await login.mutateAsync({ email, password });
      console.log(res.message);
      localStorage.setItem('token', res.token);
      router.push("/products"); 
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs underline"
          >
            {showPassword ? (
              <span role="img" aria-label="Hide password">Hide</span>
            ) : (
              <span role="img" aria-label="Show password">Show</span>
            )}
          </button>
        </div>
      </div>
      <button type="submit" className="bg-navbarItemColor p-2 text-white">
      {isLoading ? "Logging" : "LOGIN"}
      </button>
      {message && <p>{message}</p>}
      <p className="text-center">
        Dont have an Account?{" "}
        <Link href="/" className="">
          SIGN UP
        </Link>
      </p>
    </form>
  );
};
