"use client";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  }

  return (
    <nav className="bg-violet-100 shadow-md py-3 px-3 mb-5 fixed w-full z-10">
      <div className="max-w-5xl m-auto flex justify-between items-center">
        <Link href={"/"} className="font-bold text-3xl text-violet-800">
          <span className="bg-violet-500 rounded px-2 text-white">LR</span> Blog
        </Link>
        <div>
          {isAuthenticated ? (
            <Link href={"/new"}>
              <Button title={"New Post"} />
            </Link>
          ) : (
            <Link href={"/signin"}>
              <Button hasAction={true} handleAuth={handleAuth} title={"SignIn"} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
