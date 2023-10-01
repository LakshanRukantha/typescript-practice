"use client";

import { ReactNode } from "react";

type ButtonProps = {
  title: string;
  priority: "primary" | "secondary";
  hasAction?: boolean;
  icon?: ReactNode;
  taskFunc?: () => void;
};

const Button = ({
  title,
  priority,
  icon,
  hasAction,
  taskFunc,
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
        className={`flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 py-2 h-fit transition-all font-semibold px-4 rounded-md border-2 active:scale-95 hover:shadow-sm ${
          priority === "primary"
            ? "bg-violet-500 text-white lg:hover:bg-violet-400"
            : "border-violet-500 hover:bg-violet-500 hover:text-slate-50"
        }`}
        type="button"
      >
        {icon && icon}
        {title}
      </button>
    );
  } else {
    return (
      <button
        className={`flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 py-2 h-fit transition-all font-semibold px-4 rounded-md border-2 active:scale-95 hover:shadow-sm ${
          priority === "primary"
            ? "bg-violet-500 text-white lg:hover:bg-violet-400"
            : "border-violet-500 hover:bg-violet-500 hover:text-slate-50"
        }`}
        type="button"
      >
        {icon && icon}
        {title}
      </button>
    );
  }
};

export default Button;
