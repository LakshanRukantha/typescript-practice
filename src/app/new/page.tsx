"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NewPost = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.push("/signin");
  }
  return session.status === "authenticated" ? (
    <div>New Post</div>
  ) : (
    <>Loading...</>
  );
};

export default NewPost;
