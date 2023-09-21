"use client";

type ButtonProps = {
  title: string;
};

const Button = ({ title }: ButtonProps) => {
  return (
    <button
      className="py-2 px-4 btn bg-violet-500 rounded text-white active:scale-95 hover:bg-violet-400 hover:shadow-sm"
      type="button"
    >
      {title}
    </button>
  );
};

export default Button;
