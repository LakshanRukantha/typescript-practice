"use client";
import Link from "next/link";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { HiOutlineLogout } from "react-icons/hi";

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
            <div className="flex gap-3 items-center">
              <Button
                title="Sign Out"
                priority="secondary"
                hasAction={true}
                icon={<HiOutlineLogout className="text-xl" />}
                taskFunc={handleSignOut}
              />
              <Link href={"/profile"}>
                <Image
                  src={session.data?.user?.image as string}
                  className="hover:shadow-md lg:hover:animate-pulse ring-2 transition-all hover:ring-[2.5px] ring-violet-500 rounded-full"
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
              <Button title={"Sign Up"} priority="primary" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
