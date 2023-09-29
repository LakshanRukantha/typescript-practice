"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-violet-100 text-slate-800 py-3 m-auto text-center border-t-2 mt-4">
      <span className="max-w-5xl">
        Developed with ❤️ by{" "}
        <Link href={"https://lakshanrukantha.github.io"}>Lakshan Rukantha</Link>
      </span>
    </footer>
  );
};

export default Footer;
