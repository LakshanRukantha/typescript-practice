import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/utils/AuthProvider";
import { ThemeProvider } from "@/utils/ThemeProvider";
import Footer from "@/components/Footer";

// Metadata for SEO
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
      <html lang="en" suppressHydrationWarning>
        <body className="min-w-[350px]">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
          >
            <SkeletonTheme baseColor="#d3d3d3">
              <NavBar />
              <div className="flex flex-col pt-[60px] px-3 lg:px-0 max-w-5xl mx-auto min-h-container">
                {children}
              </div>
              <Footer />
            </SkeletonTheme>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
