"use client";
import Link from "next/link";
import {
  MagnifyingGlassIcon as SearchIcon,
  ShoppingCartIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getUser, logoutUser } from "../utills";

interface User {
  name: string;
  email: string;
}

export const Navbar = () => {
  const [username, setUsername] = useState<string>("User");

  useEffect(() => {
    const user = getUser();
    if (user) {
      try {
        const parsedUserData = JSON.parse(user) as User;
        setUsername(parsedUserData.name || "User");
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/signup";
  };

  return (
    <nav className="w-full bg-white">
      <div className="right-0 top-0 mr-4 mt-4 w-full px-4">
        <div className="flex items-end justify-end space-x-5">
          <Link href="/">
            <span className="text-xs font-normal text-customGray">Help</span>
          </Link>
          <Link href="/">
            <span className="text-xs font-normal text-customGray">
              Orders & Returns
            </span>
          </Link>
          <Link href="/">
            <span className="text-xs font-normal text-customGray">
              Hi, {username}
            </span>
          </Link>
        </div>

        <div className="mt-2 flex w-full flex-wrap items-center justify-between px-10">
          <Link href="/" className="text-headingColor text-3xl font-bold">
            ECOMMERCE
          </Link>
          <div className="text-navbarItemColor flex items-center space-x-20 text-base font-semibold">
            <span>Categories</span>
            <span>Sale</span>
            <span>Clearance</span>
            <span>New stock</span>
            <span>Trending</span>
          </div>
          <div className="flex space-x-4">
            <span>
              <SearchIcon className="h-6 w-6 text-customGray" />
            </span>
            <span>
              <ShoppingCartIcon className="h-6 w-6 text-customGray" />
            </span>
            <button onClick={handleLogout} aria-label="Logout">
              <UserCircleIcon className="h-6 w-6 text-customGray" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
