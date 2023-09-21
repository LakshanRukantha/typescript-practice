import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LR Blog | Lakshan Rukantha",
  description: "A blog about programming and web development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="max-w-5xl m-auto px-3 lg:px-0">{children}</div>
      </body>
    </html>
  );
}
