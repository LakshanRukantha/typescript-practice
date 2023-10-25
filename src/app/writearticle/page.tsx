"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

const WriteArticle = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <LoadingScreen />;
  } else if (session.status === "unauthenticated") {
    router.push("/signin");
  }
  return session.status === "authenticated" && <div>New Article</div>;
};

export default WriteArticle;
