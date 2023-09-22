"use client";
import Link from "next/link";
import Button from "./Button";
import { signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  const handleAuth = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/new" });
  };

  return (
    <nav className="bg-violet-100 shadow-md py-3 px-3 mb-5 fixed w-full z-10">
      <div className="max-w-5xl m-auto flex justify-between items-center">
        <Link href={"/"} className="font-bold text-3xl text-violet-800">
          <span className="bg-violet-500 rounded px-2 text-white">LR</span> Blog
        </Link>
        <div>
          {session.status === "authenticated" ? (
            <>
              <Link
                className="text-violet-800 hover:text-violet-500"
                href={"/new"}
              >
                <Button hasAction={false} title={"New Post"} />
              </Link>
            </>
          ) : (
            // <Button hasAction={true} handleAuth={handleAuth} title={"Sign In"} />
            <Link
              className="text-violet-800 hover:text-violet-500"
              href={"/signin"}
            >
              <Button title={"Sign In"} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
