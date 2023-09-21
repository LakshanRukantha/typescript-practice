"use client";
import Link from "next/link";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="bg-violet-100 shadow-md py-3 px-3 mb-5">
      <div className="max-w-5xl m-auto flex justify-between items-center">
        <Link href={"/"} className="font-bold text-3xl text-violet-800">
          LR_Blog
        </Link>
        <div>
          <Link href={"/new"}>
            <Button title={"New Post"} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
