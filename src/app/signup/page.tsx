"use client";

import Image from "next/image";
import Button from "../components/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const session = useSession();
  const router = useRouter();

  const handleSignUp = async () => {
    console.log("Sign Up");
  };

  if (session.status === "loading") {
    return <div>Loading...</div>;
  } else if (session.status === "authenticated") {
    router.push("/profile");
  }

  return (
    <div className="my-5 md:my-auto bg-gradient-to-tr from-violet-100 h-fit md:h-full max-w-lg w-full border-2 border-violet-200 shadow-md p-3 rounded-md mx-auto">
      <h2 className="text-2xl text-center font-semibold">Sign Up</h2>
      <Image
        className="mx-auto w-14 h-14 mt-4"
        src={"/logo.png"}
        width={80}
        height={80}
        alt="LR Blog"
      />
      <form className="flex flex-col gap-3 max-w-sm mx-auto my-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="first-name">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name..."
              className="border-2 px-2 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="last-name">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name..."
              className="border-2 px-2 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="Username..."
            className="border-2 px-2 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="username">
            Password
          </label>
          <input
            className="border-2 px-2 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
            type="password"
            placeholder="Password..."
          />
        </div>
        <div className="flex mb-4 flex-col">
          <label className="text-lg" htmlFor="username">
            Confirm Password
          </label>
          <input
            className="border-2 px-2 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
            type="password"
            placeholder="Confirm Password..."
          />
        </div>
        <Button hasAction={true} taskFunc={handleSignUp} title="Sign Up" />
        <span className="text-right text-sm mt-1">
          Already have an account?{" "}
          <Link className="text-blue-500" href={"/signin"}>
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
