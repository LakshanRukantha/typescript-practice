import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import AuthProvider from "./utils/AuthProvider";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "LR Blog | Lakshan Rukantha",
  description: "A blog about programming and web development.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <NavBar />
          <div className="flex flex-col max-w-5xl m-auto px-3 lg:px-0 min-h-screen pt-16">
            {children}
          </div>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
