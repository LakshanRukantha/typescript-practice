"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-5xl py-3 m-auto text-center border-t-2 mt-4">
      <span>
        Developed with ❤️ by{" "}
        <Link href={"https://lakshanrukantha.github.io"}>Lakshan Rukantha</Link>
      </span>
    </footer>
  );
};

export default Footer;
