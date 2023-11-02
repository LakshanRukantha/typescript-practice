"use client";

import { ReactNode } from "react";
import Spinner from "./Spinner";

// Types for button props
type ButtonProps = {
  title: string;
  type?: "button" | "submit" | "reset";
  priority: "primary" | "secondary";
  hasAction?: boolean;
  icon?: ReactNode;
  taskFunc?: () => void;
  isLoading?: boolean;
  spinner?: boolean;
};

const Button = ({
  title,
  type,
  priority,
  icon,
  hasAction,
  taskFunc,
  isLoading,
  spinner,
}: ButtonProps) => {
  if (hasAction) {
    return (
      <button
        onClick={
          taskFunc
            ? () => {
                taskFunc();
              }
            : () => {}
        }
        className={`flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 py-2 h-fit transition-all font-semibold px-4 rounded-md border-2 border-transparent active:scale-[98%] hover:shadow-sm ${
          priority === "primary"
            ? isLoading
              ? "bg-violet-400 text-zinc-50 pointer-events-none"
              : "bg-violet-500 text-zinc-50 lg:hover:bg-violet-400"
            : "border-violet-500 dark:text-zinc-50 text-zinc-800 hover:bg-violet-500 hover:text-zinc-50"
        }`}
        type={type ? type : "button"}
        disabled={isLoading}
      >
        {icon && icon}
        {title}
      </button>
    );
  } else {
    return (
      <button
        className={`flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 py-2 h-fit transition-all font-semibold px-4 rounded-md border-2 border-transparent active:scale-[98%] hover:shadow-sm ${
          priority === "primary"
            ? isLoading
              ? "bg-violet-400 text-zinc-50 pointer-events-none"
              : "bg-violet-500 text-zinc-50 lg:hover:bg-violet-400"
            : "border-violet-500 dark:text-zinc-50 text-zinc-800 hover:bg-violet-500 hover:text-zinc-50"
        }`}
        type={type ? type : "button"}
        disabled={isLoading}
      >
        {isLoading && spinner && <Spinner />}
        {icon && icon}
        {title}
      </button>
    );
  }
};

export default Button;
