"use client";
import Link from "next/link";
import { useState } from "react";
import React from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = () => {
    
    try {
     
    } catch (error) {
      setMessage("Error signing up");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
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
        LOGIN
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
