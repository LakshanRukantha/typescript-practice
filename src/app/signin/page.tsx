"use client";

import Image from "next/image";
import Button from "../components/Button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle, AiFillGithub } from "react-icons/ai";

const isDevelopment = process.env.NODE_ENV === "development";

const SignIn = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <div>Loading...</div>;
  } else if (session.status === "authenticated") {
    router.push("/profile");
  }

  const handleAuth = () => {
    signIn("google", {
      callbackUrl: `${
        isDevelopment ? "http://localhost:3000" : process.env.NEXT_PUBLIC_URL
      }`,
    });
  };

  return (
    <div className="my-5 md:my-auto bg-gradient-to-tr from-violet-100 h-full max-w-lg w-full border-2 border-violet-200 shadow-md p-3 rounded-md mx-auto">
      <h2 className="text-2xl text-center font-semibold">Sign In</h2>
      <Image
        className="mx-auto w-14 h-14 mt-4"
        src={"/logo.png"}
        width={80}
        height={80}
        alt="LR Blog"
      />
      <form className="flex flex-col gap-3 max-w-sm mx-auto my-4">
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="border-2 px-2 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
          />
        </div>
        <div className="flex mb-4 flex-col">
          <label className="text-lg" htmlFor="username">
            Password
          </label>
          <input
            className="border-2 px-2 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
        <Button title="Sign In" priority="primary" />
        <span className="text-right text-sm mt-1">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500" href={"/signup"}>
            Sign Up
          </Link>
        </span>
      </form>
      <div className="flex max-w-sm mx-auto flex-row items-center justify-center">
        <hr className="h-[2px] bg-slate-300 flex-1" />
        <span className="px-2 text-lg aspect-square">or</span>
        <hr className="flex-1 bg-slate-300 h-[2px]" />
      </div>
      <div className="flex flex-col max-w-sm mx-auto gap-4 my-4">
        <Button
          hasAction={true}
          taskFunc={handleAuth}
          title="Continue with Google"
          icon={<AiOutlineGoogle className="text-xl" />}
          priority="secondary"
        />
        <Button
          title="Continue with Github"
          icon={<AiFillGithub className="text-xl" />}
          priority="secondary"
        />
      </div>
    </div>
  );
};

export default SignIn;
