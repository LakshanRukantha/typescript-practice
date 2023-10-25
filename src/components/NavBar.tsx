"use client";
import Link from "next/link";
import Button from "./Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ImSpinner8 } from "react-icons/im";

const NavBar = () => {
  const session = useSession();

  return (
    <nav className="flex items-center bg-violet-100 shadow-md py-2 px-3 mb-5 fixed min-h-[60px] min-w-[350px] w-full z-10">
      <div className="max-w-5xl w-full m-auto flex justify-between items-center">
        <Link href={"/"} className="font-bold text-3xl text-violet-500">
          <span className="bg-violet-500 rounded px-2 text-white">LR</span> Blog
        </Link>
        <div>
          {session.status === "loading" ? (
            <ImSpinner8 className="animate-spin text-violet-500 h-11 w-11" />
          ) : session.status === "authenticated" ? (
            <div className="flex gap-3 items-center">
              <Link href={"/profile"}>
                <div className="relative flex items-center justify-center rounded-full">
                  <Image
                    src={session.data?.user?.image as string}
                    className="inline-flex h-11 w-11 border-2 border-violet-500 transition-all rounded-full"
                    width={40}
                    height={40}
                    alt={`profile ${session.data?.user?.name}`}
                  />
                  <span className="absolute animate-spin duration-1000 h-11 w-11 rounded-full mx-auto border-2 border-transparent hover:border-x-white"></span>
                </div>
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

export default NavBar;
