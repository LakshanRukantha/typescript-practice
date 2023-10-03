"use client";

import Image from "next/image";
import Button from "../components/Button";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AiOutlineGoogle,
  AiFillGithub,
  AiOutlineWarning,
} from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import userSigninSchema from "../validations/schemas/UserSigninSchema";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SignInInputs = {
  email: string;
  password: string;
};

const isDevelopment = process.env.NODE_ENV === "development";

const SignIn = () => {
  // React Hook Form
  const form = useForm<SignInInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(userSigninSchema),
  });

  const { register, handleSubmit, reset, formState } = form;
  const { errors, isSubmitSuccessful } = formState;

  // Reset Form
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <div>Loading...</div>;
  } else if (session.status === "authenticated") {
    router.push("/profile");
  }

  // SignIn Handler
  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    toast.warn(`${JSON.stringify(data)}`, {
      position: toast.POSITION.TOP_CENTER,
      draggable: false, // Disable dragging & solve error "Unable to preventDefault inside passive event listener invocation." on mobile devices
    });
  };

  const handleAuthGoogle = () => {
    signIn("google", {
      callbackUrl: `${
        isDevelopment ? "http://localhost:3000" : process.env.NEXT_PUBLIC_URL
      }`,
    });
  };

  return (
    <div className="my-5 md:my-auto bg-gradient-to-tr from-violet-100 h-full max-w-lg w-full border-2 border-violet-200 shadow-md p-3 rounded-md mx-auto">
      <ToastContainer />
      <h2 className="text-2xl text-center font-semibold">Sign In</h2>
      <Image
        className="mx-auto w-14 h-14 mt-4"
        src={"/logo.png"}
        width={80}
        height={80}
        alt="LR Blog"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-w-sm mx-auto my-4"
        // noValidate
      >
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email..."
            className={`border-2 px-2 py-1 rounded text-slate-800 focus:${
              errors.email ? "border-red-500" : "border-violet-500"
            } outline-none ${
              errors.email ? "border-red-500" : "border-violet-200"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <AiOutlineWarning />
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="flex mb-4 flex-col">
          <label className="text-lg" htmlFor="email">
            Password
          </label>
          <input
            className={`border-2 px-2 py-1 rounded text-slate-800 focus:${
              errors.password ? "border-red-500" : "border-violet-500"
            } outline-none ${
              errors.password ? "border-red-500" : "border-violet-200"
            }`}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <AiOutlineWarning />
              {errors.password?.message}
            </p>
          )}
        </div>
        <Button title="Sign In" type="submit" priority="primary" />
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
          taskFunc={handleAuthGoogle}
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
