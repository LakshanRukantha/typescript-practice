"use client";

import Image from "next/image";
import Button from "../components/Button";

const SignIn = () => {
  return (
    <div className="max-w-xl w-full border shadow p-3 rounded-md mx-auto">
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
            className="border-2 px-1 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
          />
        </div>
        <div className="flex mb-2 flex-col">
          <label className="text-lg" htmlFor="username">
            Password
          </label>
          <input
            className="border-2 px-1 py-1 rounded text-slate-800 focus:border-violet-500 outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
        <Button title="Sign In" />
      </form>
    </div>
  );
};

export default SignIn;
