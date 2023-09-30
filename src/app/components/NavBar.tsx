"use client";
import Link from "next/link";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const session = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-violet-100 shadow-md py-3 px-3 mb-5 fixed w-full z-10">
      <div className="max-w-5xl m-auto flex justify-between items-center">
        <Link href={"/"} className="font-bold text-3xl text-violet-800">
          <span className="bg-violet-500 rounded px-2 text-white">LR</span> Blog
        </Link>
        <div>
          {session.status === "authenticated" ? (
            <div className="flex gap-2 lg:gap-4">
              <Button
                title="Sign Out"
                hasAction={true}
                taskFunc={handleSignOut}
              />
              <Link href={"/profile"}>
                <Image
                  src={session.data?.user?.image as string}
                  className="border-2 border-violet-500 rounded-full hover:shadow"
                  width={40}
                  height={40}
                  alt={`profile ${session.data?.user?.name}`}
                />
              </Link>
            </div>
          ) : (
            <Link
              className="text-violet-800 hover:text-violet-500"
              href={"/signup"}
            >
              <Button title={"Sign Up"} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
