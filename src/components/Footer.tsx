import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:bg-zinc-800 bg-violet-200 dark:text-zinc-200 text-zinc-800 py-3 m-auto text-center border-t-2 min-w-[350px] w-full">
      <span className="max-w-5xl">
        Developed with ❤️ by{" "}
        <Link href={"https://lakshanrukantha.github.io"}>Lakshan Rukantha</Link>
      </span>
    </footer>
  );
};

export default Footer;
