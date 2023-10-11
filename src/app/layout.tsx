// import "./globals.css";
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
    <AuthProvider>
      <html lang="en">
        <body>
          <NavBar />
          <div className="flex flex-col pt-16 px-3 lg:px-0 max-w-5xl mx-auto min-h-container">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
