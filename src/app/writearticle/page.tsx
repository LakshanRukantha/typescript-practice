"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

const WriteArticle = () => {
  const session = useSession();

  // If session is loading, show loading screen and if session is unauthenticated, redirect to sign in page
  if (session.status === "loading") {
    return <LoadingScreen />;
  } else if (session.status === "unauthenticated") {
    redirect("/signin");
  }
  return session.status === "authenticated" && <div>New Article</div>;
};

export default WriteArticle;
