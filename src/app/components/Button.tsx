"use client";

type ButtonProps = {
  title: string;
  hasAction?: boolean;
  handleAuth?: () => void;
};

const Button = ({ title, hasAction, handleAuth }: ButtonProps) => {
  if (hasAction) {
    return (
      <button
        onClick={
          handleAuth
            ? () => {
                handleAuth();
              }
            : () => {}
        }
        className="py-2 font-semibold px-4 btn bg-violet-500 rounded text-white active:scale-95 lg:hover:bg-violet-400 hover:shadow-sm"
        type="button"
      >
        {title}
      </button>
    );
  } else {
    return (
      <button
        className="py-2 px-4 font-semibold btn bg-violet-500 rounded text-white active:scale-95 lg:hover:bg-violet-400 hover:shadow-sm"
        type="button"
      >
        {title}
      </button>
    );
  }
};

export default Button;
