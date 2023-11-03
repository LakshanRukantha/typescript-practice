"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  AiOutlineGoogle,
  AiFillGithub,
  AiOutlineWarning,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signInValidationSchema from "@/schemas/SignInValidation";
import LoadingScreen from "@/components/LoadingScreen";

// Types for SignInInputs
type SignInInputs = {
  email: string;
  password: string;
};

const nextPublicUrl = process.env.NEXT_PUBLIC_URL as string;

const SignIn = () => {
  // React Hook Form
  const form = useForm<SignInInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(signInValidationSchema),
  });
  const { register, handleSubmit, reset, formState } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // Reset Form
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const session = useSession();

  // If session is loading, show loading screen and if session is authenticated, redirect to profile page
  if (session.status === "loading") {
    return <LoadingScreen />;
  } else if (session.status === "authenticated") {
    redirect("/profile");
  }

  const handleAuthGoogle = () => {
    signIn("google", {
      callbackUrl: nextPublicUrl,
    });
  };

  const handleAuthGithub = () => {
    signIn("github", {
      callbackUrl: nextPublicUrl,
    });
  };

  // Sign in with credentials handler
  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: nextPublicUrl,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid Credentials", {
          position: toast.POSITION.TOP_CENTER,
          draggable: false,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full my-auto">
      <div className="my-4 dark:bg-zinc-800 bg-violet-100 max-w-lg w-full border-2 dark:border-zinc-600 border-violet-200 shadow-md p-3 rounded-md mx-auto">
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
          noValidate
        >
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email..."
              className={`border-2 outline-none px-2 py-1 rounded text-zinc-800 ${
                errors.email
                  ? "border-red-500"
                  : "dark:border-zinc-600 border-violet-200 focus:border-violet-500"
              }`}
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AiOutlineWarning />
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex mb-4 flex-col">
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={`border-2 outline-none px-2 py-1 rounded text-zinc-800 ${
                errors.password
                  ? "border-red-500"
                  : "dark:border-zinc-600 border-violet-200 focus:border-violet-500"
              }`}
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AiOutlineWarning />
                {errors.password?.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            title={isSubmitting ? "Signing In..." : "Sign In"}
            priority="primary"
            isLoading={isSubmitting}
            spinner={true}
          />
          <span className="text-right text-sm mt-1">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-500" href={"/signup"}>
              Sign Up
            </Link>
          </span>
        </form>
        <div className="flex max-w-sm mx-auto flex-row items-center justify-center">
          <hr className="h-[2px] bg-zinc-300 flex-1" />
          <span className="px-2 text-lg aspect-square">or</span>
          <hr className="flex-1 bg-zinc-300 h-[2px]" />
        </div>
        <div className="flex flex-col max-w-sm mx-auto gap-4 my-4">
          <Button
            hasAction={true}
            taskFunc={handleAuthGoogle}
            title="Continue with Google"
            icon={<AiOutlineGoogle className="text-xl" />}
            priority="secondary"
            isLoading={isSubmitting}
          />
          <Button
            hasAction={true}
            taskFunc={handleAuthGithub}
            title="Continue with Github"
            icon={<AiFillGithub className="text-xl" />}
            priority="secondary"
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
