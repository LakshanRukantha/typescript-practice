"use client";

import Image from "next/image";
import Button from "../components/Button";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineWarning } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  // React Hook Form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Session and Router
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <div>Loading...</div>;
  } else if (session.status === "authenticated") {
    router.push("/profile");
  }

  // Submit Handler
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    reset();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    const message = await res.message;

    // Notification Toast
    if (response.status === 201) {
      toast.success(`${message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(`${message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(message);
    }
  };

  return (
    <div className="my-5 md:my-auto bg-gradient-to-tr from-violet-100 h-fit md:h-full max-w-lg w-full border-2 border-violet-200 shadow-md p-3 rounded-md mx-auto">
      <ToastContainer />
      <h2 className="text-2xl text-center font-semibold">Sign Up</h2>
      <Image
        className="mx-auto w-14 h-14 mt-4"
        src={"/logo.png"}
        width={80}
        height={80}
        alt="LR Blog"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-w-md mx-auto my-4"
      >
        <div className="flex flex-col sm:flex-row w-full gap-3">
          <div className="flex flex-1 flex-col">
            <label className="text-lg" htmlFor="first-name">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name..."
              className={`border-2 px-2 py-1 rounded text-slate-800 focus:${
                errors.firstName ? "border-red-500" : "border-violet-500"
              } outline-none ${
                errors.firstName ? "border-red-500" : "border-violet-200"
              }`}
              {...register("firstName", {
                required: "First name is required.",
              })}
            />
            {errors.firstName && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AiOutlineWarning />
                {errors.firstName?.message}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <label className="text-lg" htmlFor="last-name">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name..."
              className={`border-2 px-2 py-1 rounded text-slate-800 focus:${
                errors.lastName ? "border-red-500" : "border-violet-500"
              } outline-none ${
                errors.lastName ? "border-red-500" : "border-violet-200"
              }`}
              {...register("lastName", {
                required: "Last name is required.",
              })}
            />
            {errors.lastName && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AiOutlineWarning />
                {errors.lastName?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="username">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email address..."
            className={`border-2 px-2 py-1 rounded text-slate-800 focus:${
              errors.email ? "border-red-500" : "border-violet-500"
            } outline-none ${
              errors.email ? "border-red-500" : "border-violet-200"
            }`}
            {...register("email", {
              required: "Email is required.",
            })}
          />
          {errors.email && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <AiOutlineWarning />
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="username">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password..."
            className={`border-2 px-2 py-1 rounded text-slate-800 focus:${
              errors.password ? "border-red-500" : "border-violet-500"
            } outline-none ${
              errors.password ? "border-red-500" : "border-violet-200"
            }`}
            {...register("password", {
              required: "Password is required.",
            })}
          />
          {errors.password && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <AiOutlineWarning />
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="flex mb-4 flex-col">
          <label className="text-lg" htmlFor="username">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password..."
            className={`border-2 px-2 py-1 rounded text-slate-800 focus:${
              errors.confirmPassword ? "border-red-500" : "border-violet-500"
            } outline-none ${
              errors.confirmPassword ? "border-red-500" : "border-violet-200"
            }`}
            {...register("confirmPassword", {
              required: "Confirm password is required.",
            })}
          />
          {errors.confirmPassword && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <AiOutlineWarning />
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <Button type="submit" title="Sign Up" priority="primary" />
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
