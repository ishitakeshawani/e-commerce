"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 

export const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    router.push('/verifyotp');

    e.preventDefault();
    try {
     
    } catch (error) {
      setMessage("Error signing up");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
      <button type="submit" className="bg-navbarItemColor p-2 text-white">
      CREATE ACCOUNT
      </button>
      {message && <p>{message}</p>}
      <p className="text-center">Have an Account? <Link href="/login" className="">Login</Link></p>
    </form>
  );
};
