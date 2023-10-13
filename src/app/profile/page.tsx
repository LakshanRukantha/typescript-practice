"use client";

import ProfileCard from "@/components/ProfileCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const session = useSession();
  const router = useRouter();

  if (!session || session.status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  return session.status === "authenticated" ? (
    <ProfileCard
      name={session.data.user?.name as string}
      email={session.data.user?.email as string}
      image={session.data.user?.image as string}
    />
  ) : (
    <>{/* Add loading state element here */}</>
  );
};

export default Profile;
